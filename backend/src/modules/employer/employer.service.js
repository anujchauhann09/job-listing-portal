const employerRepository = require('./employer.repository');

const AppException = require('@/exceptions/app.exception');
const { HTTP_STATUS } = require('@/constants/http-status');
const { EMPLOYER_MESSAGES } = require('./employer.constants');

const createProfile = async (userUuid, payload) => {
  const user = await employerRepository.getUserByUuid(userUuid);

  const existing =
    await employerRepository.findByUserId(user.id);

  if (existing && !existing.isDeleted) {
    throw new AppException({
      status: HTTP_STATUS.CONFLICT,
      message: EMPLOYER_MESSAGES.PROFILE_ALREADY_EXISTS
    });
  }

  return employerRepository.create({
    userId: user.id,
    ...payload
  });
};

const getProfile = async (userUuid) => {
  const user = await employerRepository.getUserByUuid(userUuid);

  const profile =
    await employerRepository.findByUserId(user.id);

  if (!profile || profile.isDeleted) {
    throw new AppException({
      status: HTTP_STATUS.NOT_FOUND,
      message: EMPLOYER_MESSAGES.PROFILE_NOT_FOUND
    });
  }

  return profile;
};

const updateProfile = async (userUuid, payload) => {
  const user = await employerRepository.getUserByUuid(userUuid);

  const profile =
    await employerRepository.findByUserId(user.id);

  if (!profile || profile.isDeleted) {
    throw new AppException({
      status: HTTP_STATUS.NOT_FOUND,
      message: EMPLOYER_MESSAGES.PROFILE_NOT_FOUND
    });
  }

  return employerRepository.updateByUserId(
    user.id,
    payload
  );
};

const getPublicProfile = async (companySlug) => {
  const profile =
    await employerRepository.findBySlug(companySlug);

  if (!profile || profile.isDeleted) {
    throw new AppException({
      status: HTTP_STATUS.NOT_FOUND,
      message: EMPLOYER_MESSAGES.PROFILE_NOT_FOUND
    });
  }

  return profile;
};

module.exports = {
  createProfile,
  getProfile,
  updateProfile,
  getPublicProfile
};
