const { verifyToken } = require("../utils/jwt.util");
const { AppException } = require("../exceptions/app.exception");
const { HTTP_STATUS } = require("../constants/http-status");
const { ERROR_MESSAGES } = require("../constants/error-messages");

const authenticate = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) throw new AppException({ status: HTTP_STATUS.UNAUTHORIZED, message: ERROR_MESSAGES.AUTHENTICATION_FAILED });

  const payload = verifyToken(token);
  req.user = payload;
  next();
};

module.exports = { authenticate };
