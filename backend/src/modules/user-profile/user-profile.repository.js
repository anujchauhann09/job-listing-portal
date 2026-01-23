const prisma = require('@/config/prisma');
const AppException = require('@/exceptions/app.exception');
const { HTTP_STATUS } = require('@/constants/http-status');


const getUserByUuid = async (uuid) => {
  const user = await prisma.user.findUnique({
    where: { uuid },
    select: { id: true, isActive: true, isDeleted: true }
  });

  if (!user || !user.isActive || user.isDeleted) {
    throw new AppException({
      status: HTTP_STATUS.NOT_FOUND,
      message: 'User not found'
    });
  }

  return user;
};

const findByUserId = async (userId) => {
  return prisma.userProfile.findUnique({
    where: { userId }
  });
};

const updateByUserId = async (userId, data) => {
  return prisma.userProfile.update({
    where: { userId },
    data
  });
};


module.exports = {
  getUserByUuid,
  findByUserId,
  updateByUserId
};
