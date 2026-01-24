const { verifyToken } = require("@/utils/jwt.util");
const AppException = require('@/exceptions/app.exception');
const { HTTP_STATUS } = require("@/constants/http-status");
const { ERROR_MESSAGES } = require("@/constants/error-messages");
const { ROLES } = require('@/modules/auth/auth.constants');

const authenticate = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token)
    throw new AppException({
      status: HTTP_STATUS.UNAUTHORIZED,
      message: ERROR_MESSAGES.AUTHENTICATION_FAILED,
    });

  const payload = verifyToken(token);
  req.user = payload;
  next();
};

const authorize = (allowedRoles = []) => {
  return (req, res, next) => {
    const roleId = req.user?.roleId;
    const userRole = ROLES[roleId];

    if (!userRole || !allowedRoles.includes(userRole)) {
      throw new AppException({
        status: HTTP_STATUS.FORBIDDEN,
        message: "You are not authorized to access this resource",
      });
    }

    next();
  };
};

module.exports = { authenticate, authorize };
