const path = require('path');
const fs = require('fs');
const { FILE_CONSTANTS } = require('@/modules/file/file.constants');

const RESUME_UPLOAD_DIR = path.join(
  process.cwd(),
  FILE_CONSTANTS.RESUME.UPLOAD_DIR
);

if (!fs.existsSync(RESUME_UPLOAD_DIR)) {
  fs.mkdirSync(RESUME_UPLOAD_DIR, { recursive: true });
}

module.exports = {
  RESUME_UPLOAD_DIR
};
