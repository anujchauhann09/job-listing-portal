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
  return prisma.employer.findUnique({
    where: { userId }
  });
};

const create = async (data) => {
  return prisma.employer.create({ data });
};

const updateByUserId = async (userId, data) => {
  return prisma.employer.update({
    where: { userId },
    data
  });
};

const findBySlug = async (slug) => {
  return prisma.employer.findFirst({
    where: {
      OR: [
        { website: { contains: slug, mode: 'insensitive' } },
        { industry: { contains: slug, mode: 'insensitive' } }
      ]
    },
    select: {
      companyDescription: true,
      industry: true,
      website: true,
      companySize: true,
      headquartersCity: true,
      headquartersCountry: true,
      companyLogoUrl: true
    }
  });
};

const updateLogo = async (userId, companyLogoUrl) => {
  return prisma.employer.update({
    where: { userId },
    data: { companyLogoUrl }
  });
};


module.exports = {
  getUserByUuid,
  findByUserId,
  create,
  updateByUserId,
  findBySlug,
  updateLogo
};
