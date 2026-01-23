const path = require('path');

const resumeService = require('./job-seeker.resume.services');
const { ApiResponse } = require('@/responses/api.response');
const { HTTP_STATUS } = require('@/constants/http-status');
const { RESUME_MESSAGES } = require('./job-seeker.constants');
const AppException = require('../../exceptions/app.exception');


const uploadResume = async (req, res, next) => {
  try {
    if (!req.file) {
      new AppException(
        RESUME_MESSAGES.RESUME_FILE_REQUIRED,
        HTTP_STATUS.BAD_REQUEST
      );
    }

    const result = await resumeService.uploadResume(
      req.user.sub,
      req.file
    );

    return new ApiResponse({
      success: true,
      message: RESUME_MESSAGES.RESUME_UPLOADED,
      data: result
    }).send(res, HTTP_STATUS.OK);
  } catch (error) {
    next(error);
  }
};

const getResume = async (req, res, next) => {
  try {
    const resume = await resumeService.getResume(req.user.sub);

    return new ApiResponse({
      success: true,
      message: RESUME_MESSAGES.RESUME_FETCHED,
      data: resume
    }).send(res, HTTP_STATUS.OK);
  } catch (error) {
    next(error);
  }
};

const deleteResume = async (req, res, next) => {
  try {
    await resumeService.deleteResume(req.user.sub);

    return new ApiResponse({
      success: true,
      message: RESUME_MESSAGES.RESUME_DELETED
    }).send(res, HTTP_STATUS.OK);
  } catch (error) {
    next(error);
  }
};

const downloadResume = async (req, res, next) => {
  try {
    const result = await resumeService.getResumeFile(
      req.user.sub
    );

    const absolutePath = path.join(
      process.cwd(),
      result.filePath
    );

    return res.download(
      absolutePath,
      result.fileName
    );
  } catch (error) {
    next(error);
  }
};

module.exports = {
  uploadResume,
  getResume,
  deleteResume,
  downloadResume
};
