const path = require('path');
const AppException = require('@/exceptions/app.exception');
const { HTTP_STATUS } = require('@/constants/http-status');
const { ApiResponse } = require('@/responses/api.response');

class FileUploadController {
  handleUpload(req, res, type) {
    if (!req.file) {
      throw new AppException(
        `${type} file is required`,
        HTTP_STATUS.BAD_REQUEST
      );
    }

    const filePath = `/${req.file.destination
      .split(path.sep)
      .slice(-2)
      .join('/')}/${req.file.filename}`;

    return new ApiResponse({
      success: true,
      message: `${type} uploaded successfully`,
      data: { filePath }
    }).send(res, HTTP_STATUS.OK);
  }

  uploadResume = (req, res) => {
    return this.handleUpload(req, res, 'Resume');
  };

  uploadAvatar = (req, res) => {
    return this.handleUpload(req, res, 'Avatar');
  };

  uploadLogo = (req, res) => {
    return this.handleUpload(req, res, 'Logo');
  };
}

module.exports = new FileUploadController();
