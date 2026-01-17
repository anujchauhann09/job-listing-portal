const AppException = require('../exceptions/app.exception');
const { ApiResponse } = require('../responses/api.response');
const logger = require('../config/logger');
const { formatErrorForLog } = require('../utils/log-format.util');
const { HTTP_STATUS } = require('../constants/http-status');
const { ERROR_MESSAGES } = require('../constants/error-messages');

const exceptionHandler = (err, req, res, next) => {
  let status = HTTP_STATUS.INTERNAL_SERVER_ERROR;
  let message = ERROR_MESSAGES.INTERNAL_SERVER_ERROR;
  let logLevel = 'error';

  if (err instanceof AppException) {
    status = err.status;
    message = err.message;
    logLevel = status >= HTTP_STATUS.INTERNAL_SERVER_ERROR ? 'error' : 'warn';
  }
  else if (err?.name === 'ZodError') {
    status = HTTP_STATUS.BAD_REQUEST;
    message = err?.issues?.map(i => i.message).join(', ') || ERROR_MESSAGES.BAD_REQUEST;
    logLevel = 'warn';
  }

  const logMessage = formatErrorForLog(err);

  logger[logLevel](
    `[${req.method}] ${req.originalUrl} → ${status} | ${logMessage}`
  );

  if (status >= HTTP_STATUS.INTERNAL_SERVER_ERROR) {
    logger.error(err.stack);
  }

  return new ApiResponse({
    status,
    message,
    data: null
  }).send(res, status);
};

module.exports = exceptionHandler;
