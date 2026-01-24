const path = require('path');

const employerLogoService = require('./employer.logo.service');
const AppException = require('@/exceptions/app.exception');
const { ApiResponse } = require('@/responses/api.response');
const { HTTP_STATUS } = require('@/constants/http-status');
const { LOGO_MESSAGES } = require('./employer.constants');

const uploadLogo = async (req, res, next) => {
  try {
    if (!req.file) {
      throw new AppException({
        status: HTTP_STATUS.BAD_REQUEST,
        message: LOGO_MESSAGES.LOGO_REQUIRED
      });
    }

    const result = await employerLogoService.uploadLogo(
      req.user.sub,
      req.file
    );

    return new ApiResponse({
      success: true,
      message: LOGO_MESSAGES.LOGO_UPLOADED,
      data: result
    }).send(res, HTTP_STATUS.OK);
  } catch (err) {
    next(err);
  }
};

const getLogo = async (req, res, next) => {
  try {
    const logo = await employerLogoService.getLogo(req.user.sub);

    return new ApiResponse({
      success: true,
      data: logo
    }).send(res, HTTP_STATUS.OK);
  } catch (err) {
    next(err);
  }
};

const downloadLogo = async (req, res, next) => {
  try {
    const { filePath, fileName } =
      await employerLogoService.getLogoFile(req.user.sub);

    const absolutePath = path.join(process.cwd(), filePath);
    return res.download(absolutePath, fileName);
  } catch (err) {
    next(err);
  }
};

const deleteLogo = async (req, res, next) => {
  try {
    await employerLogoService.deleteLogo(req.user.sub);

    return new ApiResponse({
      success: true,
      message: LOGO_MESSAGES.LOGO_DELETED
    }).send(res, HTTP_STATUS.OK);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  uploadLogo,
  getLogo,
  downloadLogo,
  deleteLogo
};
