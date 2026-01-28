const prisma = require('@/config/prisma');

class AuthRepository {
  async findUserByEmail(email) {
    return prisma.user.findUnique({
      where: { email },
      include: {
        role: true,
        profile: true,
      },
    });
  }

  async findUserByUuid(uuid) {
    return prisma.user.findUnique({
      where: { uuid },
      include: {
        role: true,
        profile: true,
      },
    });
  }

  async createUserWithProfile({ email, password, roleId, name, userType }) {
    return prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: { email, password, roleId },
      });

      await tx.userProfile.create({
        data: {
          userId: user.id,
          name: name.trim(),
        },
      });

      if (userType === 'JOB_SEEKER') {
        await tx.jobSeeker.create({
          data: { userId: user.id },
        });
      }

      if (userType === 'EMPLOYER') {
        await tx.employer.create({
          data: { userId: user.id },
        });
      }

      return user;
    });
  }

  async saveRefreshToken({ token, userId, expiresAt }) {
    return prisma.refreshToken.create({
      data: {
        token,
        userId,
        expiresAt,
      },
    });
  }

  async findRefreshToken(token) {
    return prisma.refreshToken.findUnique({
      where: { token },
      include: { user: true },
    });
  }

  async revokeRefreshToken(token) {
    return prisma.refreshToken.updateMany({
      where: { token },
      data: { isRevoked: true },
    });
  }
}

module.exports = AuthRepository;
