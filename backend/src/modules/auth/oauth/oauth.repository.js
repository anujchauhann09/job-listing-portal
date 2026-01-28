const prisma = require("@/config/prisma");
const USER_TYPES = require('./oauth.constants');

class OAuthRepository {
  findOAuthAccount(provider, providerUserId) {
    return prisma.oAuthAccount.findUnique({
      where: {
        provider_providerUserId: {
          provider,
          providerUserId,
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
  }

  findUserByEmail(email) {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  async createUserWithProfileAndRole({
    email,
    roleId,
    name,
    avatar,
    role,
  }) {
    return prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email,
          password: null,
          roleId,
        },
      });

      await tx.userProfile.create({
        data: {
          userId: user.id,
          name,
          avatarUrl: avatar,
        },
      });

      if (role === USER_TYPES.JOB_SEEKER) {
        await tx.jobSeeker.create({ data: { userId: user.id } });
      }

      if (role === USER_TYPES.EMPLOYER) {
        await tx.employer.create({ data: { userId: user.id } });
      }

      return user;
    });
  }

  createOAuthAccount({
    provider,
    providerUserId,
    userId,
    email,
    avatar,
  }) {
    return prisma.oAuthAccount.create({
      data: {
        provider,
        providerUserId,
        userId,
        email,
        avatarUrl: avatar,
      },
    });
  }

  saveRefreshToken({ token, userId, expiresAt }) {
    return prisma.refreshToken.create({
      data: {
        token,
        userId,
        expiresAt,
      },
    });
  }
}

module.exports = OAuthRepository;
