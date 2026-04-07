const resumeAnalyzerService = require('./resume-analyzer.service');
const { ApiResponse } = require('@/responses/api.response');
const { HTTP_STATUS } = require('@/constants/http-status');
const { RESUME_ANALYZER_MESSAGES } = require('./resume-analyzer.constants');
const AppException = require('@/exceptions/app.exception');

const analyzeResume = async (req, res, next) => {
  try {
    if (!req.file) {
      throw new AppException({
        status: HTTP_STATUS.BAD_REQUEST,
        message: RESUME_ANALYZER_MESSAGES.FILE_REQUIRED,
      });
    }

    const analysis = await resumeAnalyzerService.analyze(req.file);

    return new ApiResponse({
      success: true,
      message: RESUME_ANALYZER_MESSAGES.ANALYSIS_SUCCESS,
      data: analysis,
    }).send(res, HTTP_STATUS.OK);
  } catch (error) {
    next(error);
  }
};

module.exports = { analyzeResume };
