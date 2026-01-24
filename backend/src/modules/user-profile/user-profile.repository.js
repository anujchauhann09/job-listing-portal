const prisma = require('@/config/prisma');
const AppException = require('@/exceptions/app.exception');
const { HTTP_STATUS } = require('@/constants/http-status');
const { USER_PROFILE_MESSAGES } = require('./user-profile.constants');


const getUserByUuid = async (uuid) => {
  const user = await prisma.user.findUnique({
    where: { uuid },
    select: { id: true }
  });

  if (!user) {
    throw new AppException({
      status: HTTP_STATUS.NOT_FOUND,
      message: USER_PROFILE_MESSAGES.PROFILE_NOT_FOUND
    });
  }

  return user; 
};


const findByUserId = async (userId) => {
  const profile = await prisma.userProfile.findUnique({
    where: { userId },
    select: {
      uuid: true,
      name: true,
      bio: true,
      phone: true,
      avatarUrl: true
    }
  });

  if (!profile) {
    throw new AppException({
      status: HTTP_STATUS.NOT_FOUND,
      message: USER_PROFILE_MESSAGES.PROFILE_NOT_FOUND
    });
  }

  return profile;
};


const updateByUserId = async (userId, data) => {
  await prisma.userProfile.update({
    where: { userId },
    data
  });

  return findByUserId(userId);
};

module.exports = {
  getUserByUuid,
  findByUserId,
  updateByUserId
};
