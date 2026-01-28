const OAuthRepository = require("./oauth.repository");

const AppException = require("@/exceptions/app.exception");
const { HTTP_STATUS } = require("@/constants/http-status");

const {
  OAUTH_PROVIDERS,
  OAUTH_MESSAGES,
} = require("./oauth.constants");

const {
  getGoogleUser,
  getGithubUser,
  getLinkedinUser,
} = require("./oauth.providers");

const { ROLE_IDS } = require("../auth.constants");

const { generateAccessToken, generateRefreshToken } = require("@/utils/jwt.util");
const { getExpiryDate } = require("@/utils/time.util");
const { REFRESH_TOKEN_EXPIRES_IN } = require("@/config/jwt.config");

class OAuthService {
  constructor() {
    this.repo = new OAuthRepository();
  }

  getAuthorizationUrl(provider, role) {
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
  }

  async handleOAuthCallback(provider, query) {
    if (!query.code || !query.state) {
      throw new AppException({
        status: HTTP_STATUS.BAD_REQUEST,
        message: OAUTH_MESSAGES.OAUTH_FAILED,
      });
    }

    const { role } = JSON.parse(
      Buffer.from(query.state, "base64").toString()
    );

    const roleId =
      role === "EMPLOYER" ? ROLE_IDS.EMPLOYER : ROLE_IDS.JOB_SEEKER;

    const oauthUser = await this.fetchOAuthUser(provider, query.code);

    if (!oauthUser?.email || !oauthUser?.providerUserId) {
      throw new AppException({
        status: HTTP_STATUS.UNAUTHORIZED,
        message: OAUTH_MESSAGES.OAUTH_FAILED,
      });
    }

    let user = await this.resolveUser({
      provider,
      oauthUser,
      role,
      roleId,
    });

    const accessToken = generateAccessToken({
      sub: user.uuid,
      roleId: user.roleId,
    });

    const refreshToken = generateRefreshToken({
      sub: user.uuid,
      roleId: user.roleId,
    });

    await this.repo.saveRefreshToken({
      token: refreshToken,
      userId: user.id,
      expiresAt: getExpiryDate(REFRESH_TOKEN_EXPIRES_IN),
    });

    return { accessToken, refreshToken };
  }

  async fetchOAuthUser(provider, code) {
    switch (provider) {
      case OAUTH_PROVIDERS.GOOGLE:
        return getGoogleUser(code);
      case OAUTH_PROVIDERS.GITHUB:
        return getGithubUser(code);
      case OAUTH_PROVIDERS.LINKEDIN:
        return getLinkedinUser(code);
      default:
        throw new AppException({
          status: HTTP_STATUS.BAD_REQUEST,
          message: OAUTH_MESSAGES.INVALID_PROVIDER,
        });
    }
  }

  async resolveUser({ provider, oauthUser, role, roleId }) {
    const providerKey = provider.toUpperCase();

    const existingOAuth = await this.repo.findOAuthAccount(
      providerKey,
      oauthUser.providerUserId
    );

    if (existingOAuth) {
      return existingOAuth.user;
    }

    let user = await this.repo.findUserByEmail(oauthUser.email);

    if (!user) {
      user = await this.repo.createUserWithProfileAndRole({
        email: oauthUser.email,
        roleId,
        name: oauthUser.name,
        avatar: oauthUser.avatar,
        role,
      });
    }

    await this.repo.createOAuthAccount({
      provider: providerKey,
      providerUserId: oauthUser.providerUserId,
      userId: user.id,
      email: oauthUser.email,
      avatar: oauthUser.avatar,
    });

    return user;
  }
}

module.exports = new OAuthService();
