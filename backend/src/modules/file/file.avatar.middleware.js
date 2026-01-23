const multer = require('multer');
const path = require('path');

const { FILE_CONSTANTS } = require('@/modules/file/file.constants');
const AppException = require('@/exceptions/app.exception');
const { HTTP_STATUS } = require('@/constants/http-status');
const { AVATAR_UPLOAD_DIR } = require('./file.avatar.config');

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, AVATAR_UPLOAD_DIR),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `avatar-${req.user.sub}-${Date.now()}${ext}`);
  }
});

const fileFilter = (_req, file, cb) => {
  if (!FILE_CONSTANTS.AVATAR.ALLOWED_MIME_TYPES.includes(file.mimetype)) {
    return cb(
      new AppException({
        status: HTTP_STATUS.BAD_REQUEST,
        message: 'Only PNG, JPG, JPEG, WEBP images are allowed'
      }),
      false
    );
  }
  cb(null, true);
};

const uploadAvatar = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: FILE_CONSTANTS.AVATAR.MAX_SIZE_MB * 1024 * 1024
  }
});

module.exports = { uploadAvatar };
