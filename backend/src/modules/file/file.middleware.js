const multer = require('multer');
const { FILE_CONSTANTS } = require('./file.constants');
const AppException = require('@/exceptions/app.exception');
const { HTTP_STATUS } = require('@/constants/http-status');
const { createLocalStorage } = require('./file.storage.local');

const createUploadMiddleware = (type) => {
  const config = FILE_CONSTANTS[type];

  const upload = multer({
    storage: createLocalStorage(type),
    limits: {
      fileSize: config.MAX_SIZE_MB * 1024 * 1024
    },
    fileFilter: (_req, file, cb) => {
      if (!config.ALLOWED_MIME_TYPES.includes(file.mimetype)) {
        return cb(
          new AppException({
            status: HTTP_STATUS.BAD_REQUEST,
            message: `Invalid file type for ${type}. Allowed types: ${config.ALLOWED_MIME_TYPES.join(', ')}`
          }),
          false
        );
      }
      cb(null, true);
    }
  });

  return upload;
};

module.exports = {
  createUploadMiddleware
};
