const morgan = require('morgan');
const { v4: uuidv4 } = require('uuid');
const logger = require('@/config/logger');


const requestIdMiddleware = (req, res, next) => {
  req.requestId = uuidv4();
  res.setHeader('X-Request-Id', req.requestId);
  next();
};


const stream = {
  write: (message) => {
    logger.info(message.trim());
  }
};


const httpLogger = morgan(
  (tokens, req, res) => {
    return JSON.stringify({
      requestId: req.requestId,
      method: tokens.method(req, res),
      url: tokens.url(req, res),
      status: Number(tokens.status(req, res)),
      responseTime: `${tokens['response-time'](req, res)} ms`,
      ip: req.ip,
      userAgent: tokens['user-agent'](req, res)
    });
  },
  { stream }
);

module.exports = {
  requestIdMiddleware,
  httpLogger
};
