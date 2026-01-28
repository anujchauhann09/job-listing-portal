const prisma = require('@/config/prisma');

class UserProfileRepository {
  async getUserByUuid(uuid) {
    return prisma.user.findUnique({
      where: { uuid },
      select: { id: true }
    });
  }

  async findByUserId(userId) {
    return prisma.userProfile.findUnique({
      where: { userId },
      select: {
        uuid: true,
        name: true,
        bio: true,
        phone: true,
        avatarUrl: true
      }
    });
  }

  async updateByUserId(userId, data) {
    await prisma.userProfile.update({
      where: { userId },
      data
    });

    return this.findByUserId(userId);
  }
}

module.exports = UserProfileRepository;
