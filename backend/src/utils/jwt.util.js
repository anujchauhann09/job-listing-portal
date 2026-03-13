const jwt = require("jsonwebtoken");
const AppException = require("@/exceptions/app.exception");
const { HTTP_STATUS } = require("@/constants/http-status");
const { ERROR_MESSAGES } = require("@/constants/error-messages");
const {
  JWT_SECRET,
  ACCESS_TOKEN_EXPIRES_IN,
  REFRESH_TOKEN_EXPIRES_IN,
  JWT_ALGORITHM,
} = require("@/config/jwt.config");

const generateAccessToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRES_IN,
    algorithm: JWT_ALGORITHM,
  });
};

const generateRefreshToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRES_IN,
    algorithm: JWT_ALGORITHM,
  });
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      throw new AppException({
        status: HTTP_STATUS.UNAUTHORIZED,
        message: ERROR_MESSAGES.TOKEN_EXPIRED,
      });
    } else if (error.name === 'JsonWebTokenError') {
      throw new AppException({
        status: HTTP_STATUS.UNAUTHORIZED,
        message: ERROR_MESSAGES.TOKEN_INVALID,
      });
    } else if (error.name === 'NotBeforeError') {
      throw new AppException({
        status: HTTP_STATUS.UNAUTHORIZED,
        message: ERROR_MESSAGES.TOKEN_INVALID,
      });
    } else {
      throw new AppException({
        status: HTTP_STATUS.UNAUTHORIZED,
        message: ERROR_MESSAGES.TOKEN_MALFORMED,
      });
    }
  }
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
};
