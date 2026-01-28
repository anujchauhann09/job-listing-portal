const path = require('path');
const fs = require('fs');
const { FILE_CONSTANTS } = require('./file.constants');

const ensureDir = (dir) => {
  const fullPath = path.join(process.cwd(), dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
  }
  return fullPath;
};

const UPLOAD_DIRS = {
  RESUME: ensureDir(FILE_CONSTANTS.RESUME.UPLOAD_DIR),
  LOGO: ensureDir(FILE_CONSTANTS.LOGO.UPLOAD_DIR),
  AVATAR: ensureDir(FILE_CONSTANTS.AVATAR.UPLOAD_DIR)
};

module.exports = {
  UPLOAD_DIRS
};
