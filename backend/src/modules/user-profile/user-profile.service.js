const userProfileRepository = require('./user-profile.repository');
const AppException = require('@/exceptions/app.exception');
const { HTTP_STATUS } = require('@/constants/http-status');
const { USER_PROFILE_MESSAGES } = require('./user-profile.constants');

const getProfile = async (userUuid) => {
  const user = await userProfileRepository.getUserByUuid(userUuid);

  const profile =
    await userProfileRepository.findByUserId(user.id);

  if (!profile || profile.isDeleted) {
    throw new AppException({
      status: HTTP_STATUS.NOT_FOUND,
      message: USER_PROFILE_MESSAGES.PROFILE_NOT_FOUND
    });
  }

  return profile;
};

const updateProfile = async (userUuid, payload) => {
  const user = await userProfileRepository.getUserByUuid(userUuid);

  const existing =
    await userProfileRepository.findByUserId(user.id);

  if (existing.isDeleted) {
    throw new AppException({
      status: HTTP_STATUS.NOT_FOUND,
      message: USER_PROFILE_MESSAGES.PROFILE_NOT_FOUND
    });
  }

  return userProfileRepository.updateByUserId(
    user.id,
    payload
  );
};

module.exports = {
  getProfile,
  updateProfile
};
