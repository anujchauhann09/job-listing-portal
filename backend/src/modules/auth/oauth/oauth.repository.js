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
      include: {
        profile: true,
        jobSeeker: true,
        employer: true,
      },
    });
  }

  async ensureUserProfiles(userId, roleId, name, avatar) {
    return prisma.$transaction(async (tx) => {
      // Check if UserProfile exists
      const userProfile = await tx.userProfile.findUnique({
        where: { userId },
      });

      if (!userProfile) {
        await tx.userProfile.create({
          data: {
            userId,
            name,
            avatarUrl: avatar,
          },
        });
      }

      // Check if JobSeeker profile exists for JOB_SEEKER role
      if (roleId === 2) {
        const jobSeeker = await tx.jobSeeker.findUnique({
          where: { userId },
        });

        if (!jobSeeker) {
          await tx.jobSeeker.create({
            data: { userId },
          });
        }
      }

      // Check if Employer profile exists for EMPLOYER role
      if (roleId === 3) {
        const employer = await tx.employer.findUnique({
          where: { userId },
        });

        if (!employer) {
          await tx.employer.create({
            data: { userId },
          });
        }
      }
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
