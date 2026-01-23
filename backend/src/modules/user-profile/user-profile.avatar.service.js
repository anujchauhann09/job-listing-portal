const fs = require('fs');
const path = require('path');

const userProfileRepository = require('./user-profile.repository');
const AppException = require('@/exceptions/app.exception');
const { HTTP_STATUS } = require('@/constants/http-status');
const { USER_PROFILE_MESSAGES, AVATAR_MESSAGES } = require('./user-profile.constants');

const uploadAvatar = async (userUuid, file) => {
  const user = await userProfileRepository.getUserByUuid(userUuid);
  const profile = await userProfileRepository.findByUserId(user.id);

  if (!profile || profile.isDeleted) {
    throw new AppException({
      status: HTTP_STATUS.NOT_FOUND,
      message: USER_PROFILE_MESSAGES.PROFILE_NOT_FOUND
    });
  }

  if (profile.avatarUrl) {
    const oldPath = path.join(process.cwd(), profile.avatarUrl);
    if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
  }

  const avatarUrl = `/uploads/avatars/${file.filename}`;
  await userProfileRepository.updateByUserId(
    user.id,
    { avatarUrl }
  );

  return { avatarUrl };
};

const getAvatar = async (userUuid) => {
  const user = await userProfileRepository.getUserByUuid(userUuid);
  const profile = await userProfileRepository.findByUserId(user.id);

  if (!profile || !profile.avatarUrl) {
    throw new AppException({
      status: HTTP_STATUS.NOT_FOUND,
      message: AVATAR_MESSAGES.AVATAR_NOT_FOUND
    });
  }

  return { avatarUrl: profile.avatarUrl };
};

const getAvatarFile = async (userUuid) => {
  const user = await userProfileRepository.getUserByUuid(userUuid);
  const profile = await userProfileRepository.findByUserId(user.id);

  if (!profile || !profile.avatarUrl) {
    throw new AppException({
      status: HTTP_STATUS.NOT_FOUND,
      message: AVATAR_MESSAGES.AVATAR_NOT_FOUND
    });
  }

  return {
    filePath: profile.avatarUrl,
    fileName: profile.avatarUrl.split('/').pop()
  };
};

const deleteAvatar = async (userUuid) => {
  const user = await userProfileRepository.getUserByUuid(userUuid);
  const profile = await userProfileRepository.findByUserId(user.id);

  if (!profile || !profile.avatarUrl) {
    throw new AppException({
      status: HTTP_STATUS.NOT_FOUND,
      message: AVATAR_MESSAGES.AVATAR_NOT_FOUND
    });
  }

  const filePath = path.join(process.cwd(), profile.avatarUrl);
  if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

  await userProfileRepository.updateByUserId(
    user.id,
    { avatarUrl: null }
  );
};

module.exports = {
  uploadAvatar,
  getAvatar,
  getAvatarFile,
  deleteAvatar
};
