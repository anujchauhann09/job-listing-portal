const multer = require('multer');

const { FILE_CONSTANTS } = require('./file.constants');
const AppException = require('@/exceptions/app.exception');
const { HTTP_STATUS } = require('@/constants/http-status');
const { localStorage } = require('./file.storage.local');

const fileFilter = (_req, file, cb) => {
  if (!FILE_CONSTANTS.RESUME.ALLOWED_MIME_TYPES.includes(file.mimetype)) {
    return cb(
      new AppException({
        status: HTTP_STATUS.BAD_REQUEST,
        message: 'Only PDF, DOC, DOCX files are allowed'
      }),
      false
    );
  }

  cb(null, true);
};

const uploadResume = multer({
  storage: localStorage,
  fileFilter,
  limits: {
    fileSize: FILE_CONSTANTS.RESUME.MAX_SIZE_MB * 1024 * 1024
  }
});


module.exports = {
  uploadResume
};
