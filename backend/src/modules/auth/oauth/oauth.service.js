const prisma = require("@/config/prisma");
const AppException = require("@/exceptions/app.exception");
const { generateAccessToken, generateRefreshToken } = require('@/utils/jwt.util');
const { getExpiryDate } = require("@/utils/time.util");
const { REFRESH_TOKEN_EXPIRES_IN } = require('@/config/jwt.config');

const { OAUTH_PROVIDERS, OAUTH_MESSAGES } = require("./oauth.constants");
const { HTTP_STATUS } = require("@/constants/http-status");
const {
  getGoogleUser,
  getGithubUser,
  getLinkedinUser,
} = require("./oauth.providers");

const { ROLE_IDS } = require("../auth.constants");

const getAuthorizationUrl = (provider, role) => {
  const state = Buffer.from(JSON.stringify({ role })).toString("base64");

  switch (provider) {
    case OAUTH_PROVIDERS.GOOGLE:
      return (
        process.env.GOOGLE_AUTH_URL +
        `client_id=${process.env.GOOGLE_CLIENT_ID}` +
        `&redirect_uri=${process.env.GOOGLE_REDIRECT_URI}` +
        `&response_type=code` +
        `&scope=openid%20email%20profile` +
        `&state=${state}`
      );

    case OAUTH_PROVIDERS.GITHUB:
      return (
        process.env.GITHUB_AUTH_URL +
        `client_id=${process.env.GITHUB_CLIENT_ID}` +
        `&redirect_uri=${process.env.GITHUB_REDIRECT_URI}` +
        `&scope=user:email` +
        `&state=${state}`
      );

    case OAUTH_PROVIDERS.LINKEDIN:
      return (
        process.env.LINKEDIN_AUTH_URL +
        `client_id=${process.env.LINKEDIN_CLIENT_ID}` +
        `&redirect_uri=${process.env.LINKEDIN_REDIRECT_URI}` +
        `&response_type=code` +
        `&scope=openid%20email%20profile` +
        `&state=${state}`
      );

    default:
      throw new AppException({
        status: HTTP_STATUS.BAD_REQUEST,
        message: OAUTH_MESSAGES.INVALID_PROVIDER,
      });
  }
};

const handleOAuthCallback = async (provider, query) => {
  if (!query.code || !query.state) {
    throw new AppException({
      status: HTTP_STATUS.BAD_REQUEST,
      message: OAUTH_MESSAGES.OAUTH_FAILED,
    });
  }

  const { role } = JSON.parse(Buffer.from(query.state, "base64").toString());

  const roleId = role === "EMPLOYER" ? ROLE_IDS.EMPLOYER : ROLE_IDS.JOB_SEEKER;

  let oauthUser;

  switch (provider) {
    case OAUTH_PROVIDERS.GOOGLE:
      oauthUser = await getGoogleUser(query.code);
      break;
    case OAUTH_PROVIDERS.GITHUB:
      oauthUser = await getGithubUser(query.code);
      break;
    case OAUTH_PROVIDERS.LINKEDIN:
      oauthUser = await getLinkedinUser(query.code);
      break;
    default:
      throw new AppException({
        status: HTTP_STATUS.BAD_REQUEST,
        message: OAUTH_MESSAGES.INVALID_PROVIDER,
      });
  }

  if (!oauthUser?.email || !oauthUser?.providerUserId) {
    throw new AppException({
      status: HTTP_STATUS.UNAUTHORIZED,
      message: OAUTH_MESSAGES.OAUTH_FAILED,
    });
  }

  const existingOAuthAccount = await prisma.oAuthAccount.findUnique({
    where: {
      provider_providerUserId: {
        provider: provider.toUpperCase(),
        providerUserId: oauthUser.providerUserId,
      },
    },
    include: {
      user: {
        include: {
          role: true,
          profile: true,
        },
      },
    },
  });

  let user;

  if (existingOAuthAccount) {
    user = existingOAuthAccount.user;
  } else {
    user = await prisma.$transaction(async (tx) => {
      let existingUser = await tx.user.findUnique({
        where: { email: oauthUser.email },
      });

      if (!existingUser) {
        existingUser = await tx.user.create({
          data: {
            email: oauthUser.email,
            password: null,
            roleId: roleId,
          },
        });

        await tx.userProfile.create({
          data: {
            userId: existingUser.id,
            name: oauthUser.name,
            avatarUrl: oauthUser.avatar,
          },
        });

        if (role === "JOB_SEEKER") {
          await tx.jobSeeker.create({
            data: { userId: existingUser.id },
          });
        } else if (role === "EMPLOYER") {
          await tx.employer.create({
            data: {
              userId: existingUser.id,
            },
          });
        }
      }

      await tx.oAuthAccount.create({
        data: {
          provider: provider.toUpperCase(),
          providerUserId: oauthUser.providerUserId,
          userId: existingUser.id,
          email: oauthUser.email,
          avatarUrl: oauthUser.avatar,
        },
      });

      return existingUser;
    });
  }

  const accessToken = generateAccessToken({
    sub: user.uuid,
    roleId: user.roleId
  });

  const refreshToken = generateRefreshToken({
    sub: user.uuid,
    roleId: user.roleId
  });

  await prisma.refreshToken.create({
    data: {
      token: refreshToken,
      userId: user.id,
      expiresAt: getExpiryDate(REFRESH_TOKEN_EXPIRES_IN)
    }
  });

  return {
    accessToken,
    refreshToken,
    user: {
      uuid: user.uuid,
      email: user.email,
      name: user.profile?.name || null,
      role: user.role.name,
    },
  };
};

module.exports = {
  getAuthorizationUrl,
  handleOAuthCallback,
};
