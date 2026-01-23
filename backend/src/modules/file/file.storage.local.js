const multer = require('multer');
const path = require('path');

const { RESUME_UPLOAD_DIR } = require('./file.config');

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, RESUME_UPLOAD_DIR);
  },

  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = `${req.user.sub}-${Date.now()}${ext}`;
    cb(null, filename);
  }
});

module.exports = {
  localStorage: storage
};
