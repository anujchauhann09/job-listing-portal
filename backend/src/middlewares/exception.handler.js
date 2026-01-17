const AppException = require('../exceptions/app.exception');
const { ApiResponse } = require('../responses/api.response');
const logger = require('../config/logger');
const { formatErrorForLog } = require('../utils/log-format.util');

const exceptionHandler = (err, req, res, next) => {
  let status = 500;
  let message = 'Internal Server Error';
  let logLevel = 'error';

  if (err instanceof AppException) {
    status = err.status;
    message = err.message;
    logLevel = status >= 500 ? 'error' : 'warn';
  }
  else if (err?.name === 'ZodError') {
    status = 400;
    message = err?.issues?.map(i => i.message).join(', ') || 'Invalid request data';
    logLevel = 'warn';
  }

  const logMessage = formatErrorForLog(err);

  logger[logLevel](
    `[${req.method}] ${req.originalUrl} → ${status} | ${logMessage}`
  );

  if (status >= 500) {
    logger.error(err.stack);
  }

  return new ApiResponse({
    status,
    message,
    data: null
  }).send(res, status);
};

module.exports = exceptionHandler;
