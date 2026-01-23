const path = require('path');

const avatarService = require('./user-profile.avatar.services');
const { ApiResponse } = require('@/responses/api.response');
const { HTTP_STATUS } = require('@/constants/http-status');
const AppException = require('@/exceptions/app.exception');
const { AVATAR_MESSAGES } = require('./user-profile.constants');

const uploadAvatar = async (req, res, next) => {
  try {
    if (!req.file) {
      throw new AppException({
        status: HTTP_STATUS.BAD_REQUEST,
        message: AVATAR_MESSAGES.AVATAR_FILE_REQUIRED
      });   
    }

    const result = await avatarService.uploadAvatar(
      req.user.sub,
      req.file
    );

    return new ApiResponse({
      success: true,
      message: AVATAR_MESSAGES.AVATAR_UPLOADED,
      data: result
    }).send(res, HTTP_STATUS.OK);
  } catch (err) {
    next(err);
  }
};

const getAvatar = async (req, res, next) => {
  try {
    const avatar = await avatarService.getAvatar(req.user.sub);

    return new ApiResponse({
      success: true,
      data: avatar
    }).send(res, HTTP_STATUS.OK);
  } catch (err) {
    next(err);
  }
};

const downloadAvatar = async (req, res, next) => {
  try {
    const { filePath, fileName } =
      await avatarService.getAvatarFile(req.user.sub);

    const absolutePath = path.join(process.cwd(), filePath);
    return res.download(absolutePath, fileName);
  } catch (err) {
    next(err);
  }
};

const deleteAvatar = async (req, res, next) => {
  try {
    await avatarService.deleteAvatar(req.user.sub);

    return new ApiResponse({
      success: true,
      message: AVATAR_MESSAGES.AVATAR_DELETED
    }).send(res, HTTP_STATUS.OK);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  uploadAvatar,
  getAvatar,
  downloadAvatar,
  deleteAvatar
};
