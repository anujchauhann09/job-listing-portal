const path = require('path');
const fs = require('fs');
const { FILE_CONSTANTS } = require('./file.constants');

const LOGO_UPLOAD_DIR = path.join(
  process.cwd(),
  FILE_CONSTANTS.LOGO.UPLOAD_DIR
);

if (!fs.existsSync(LOGO_UPLOAD_DIR)) {
  fs.mkdirSync(LOGO_UPLOAD_DIR, { recursive: true });
}

module.exports = { LOGO_UPLOAD_DIR };
