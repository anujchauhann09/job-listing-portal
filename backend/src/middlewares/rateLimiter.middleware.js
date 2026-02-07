const rateLimit = require('express-rate-limit');
const { RedisStore } = require('rate-limit-redis');
const { ipKeyGenerator } = require('express-rate-limit');
const redis = require('@/config/redis');
const { HTTP_STATUS } = require('@/constants/http-status');
const { ERROR_MESSAGES } = require('@/constants/error-messages')
const { ApiResponse } = require("@/responses/api.response");

const createRateLimiter = ({
  windowMs,
  max,
  keyGenerator,
  message = ERROR_MESSAGES.TOO_MANY_REQUESTS,
}) => {
  return rateLimit({
    windowMs,
    max,
    standardHeaders: true,
    legacyHeaders: false,

    store: new RedisStore({
      sendCommand: (...args) => redis.call(...args),
    }),

    keyGenerator: keyGenerator
      ? keyGenerator
      : (req) => ipKeyGenerator(req),

    handler: (req, res) => {
      return new ApiResponse({
        success: false,
        message,
      }).send(res, HTTP_STATUS.TOO_MANY_REQUESTS);
    },
  });
};

module.exports = { createRateLimiter };
