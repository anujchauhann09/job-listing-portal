const prisma = require('@/config/prisma');
const AppException = require('@/exceptions/app.exception');
const { HTTP_STATUS } = require('@/constants/http-status');
const { EMPLOYER_MESSAGES } = require('./employer.constants');


const getUserByUuid = async (uuid) => {
  const user = await prisma.user.findUnique({
    where: { uuid },
    select: { id: true }
  });

  if (!user) {
    throw new AppException({
      status: HTTP_STATUS.NOT_FOUND,
      message: EMPLOYER_MESSAGES.PROFILE_NOT_FOUND
    });
  }

  return user; 
};


const findByUserId = async (userId) => {
  const employer = await prisma.employer.findUnique({
    where: { userId },
    select: {
      uuid: true,
      companyDescription: true,
      companySize: true,
      industry: true,
      website: true,
      headquartersCity: true,
      headquartersCountry: true,
      companyLogoUrl: true
    }
  });

  if (!employer) {
    throw new AppException({
      status: HTTP_STATUS.NOT_FOUND,
      message: EMPLOYER_MESSAGES.PROFILE_NOT_FOUND
    });
  }

  return employer;
};


const updateByUserId = async (userId, data) => {
  await prisma.employer.update({
    where: { userId },
    data
  });

  return findByUserId(userId);
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
  await prisma.employer.update({
    where: { userId },
    data: { companyLogoUrl }
  });

  return { companyLogoUrl };
};


module.exports = {
  getUserByUuid,
  findByUserId,
  updateByUserId,
  findBySlug,
  updateLogo
};
