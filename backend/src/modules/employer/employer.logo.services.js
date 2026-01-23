const fs = require('fs');
const path = require('path');

const employerRepository = require('./employer.repositories');
const AppException = require('@/exceptions/app.exception');
const { HTTP_STATUS } = require('@/constants/http-status');
const { EMPLOYER_MESSAGES } = require('./employer.constants');


const uploadLogo = async (userUuid, file) => {
  const user = await employerRepository.getUserByUuid(userUuid);
  const employer = await employerRepository.findByUserId(user.id);

  if (!employer || employer.isDeleted) {
    throw new AppException({
      status: HTTP_STATUS.NOT_FOUND,
      message: EMPLOYER_MESSAGES.PROFILE_NOT_FOUND
    });
  }

  if (employer.companyLogoUrl) {
    const oldPath = path.join(process.cwd(), employer.companyLogoUrl);
    if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
  }

  const logoUrl = `/uploads/logos/${file.filename}`;
  await employerRepository.updateLogo(user.id, logoUrl);

  return { companyLogoUrl: logoUrl };
};

const getLogo = async (userUuid) => {
  const user = await employerRepository.getUserByUuid(userUuid);
  const employer = await employerRepository.findByUserId(user.id);

  if (!employer || !employer.companyLogoUrl) {
    throw new AppException({
      status: HTTP_STATUS.NOT_FOUND,
      message: EMPLOYER_MESSAGES.LOGO_NOT_FOUND
    });
  }

  return { companyLogoUrl: employer.companyLogoUrl };
};

const getLogoFile = async (userUuid) => {
  const user = await employerRepository.getUserByUuid(userUuid);
  const employer = await employerRepository.findByUserId(user.id);

  if (!employer || !employer.companyLogoUrl) {
    throw new AppException({
      status: HTTP_STATUS.NOT_FOUND,
      message: EMPLOYER_MESSAGES.LOGO_NOT_FOUND
    });
  }

  return {
    filePath: employer.companyLogoUrl,
    fileName: employer.companyLogoUrl.split('/').pop()
  };
};

const deleteLogo = async (userUuid) => {
  const user = await employerRepository.getUserByUuid(userUuid);
  const employer = await employerRepository.findByUserId(user.id);

  if (!employer || !employer.companyLogoUrl) {
    throw new AppException({
      status: HTTP_STATUS.NOT_FOUND,
      message: EMPLOYER_MESSAGES.LOGO_NOT_FOUND
    });
  }

  const filePath = path.join(process.cwd(), employer.companyLogoUrl);
  if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

  await employerRepository.updateLogo(user.id, null);
};

module.exports = {
  uploadLogo,
  getLogo,
  getLogoFile,
  deleteLogo
};
