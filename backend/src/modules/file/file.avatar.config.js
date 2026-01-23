const path = require('path');
const fs = require('fs');
const { FILE_CONSTANTS } = require('./file.constants');

const AVATAR_UPLOAD_DIR = path.join(
  process.cwd(),
  FILE_CONSTANTS.AVATAR.UPLOAD_DIR
);

if (!fs.existsSync(AVATAR_UPLOAD_DIR)) {
  fs.mkdirSync(AVATAR_UPLOAD_DIR, { recursive: true });
}

module.exports = { AVATAR_UPLOAD_DIR };
