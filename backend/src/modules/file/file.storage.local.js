const multer = require('multer');
const path = require('path');
const { UPLOAD_DIRS } = require('./file.config');

const createLocalStorage = (type) =>
  multer.diskStorage({
    destination: (_req, _file, cb) => {
      cb(null, UPLOAD_DIRS[type]);
    },

    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const filename = `${type.toLowerCase()}-${req.user.sub}-${Date.now()}${ext}`;
      cb(null, filename);
    }
  });

module.exports = {
  createLocalStorage
};
