const { verifyToken } = require("@/utils/jwt.util");
const AppException = require('@/exceptions/app.exception');
const { HTTP_STATUS } = require("@/constants/http-status");
const { ERROR_MESSAGES } = require("@/constants/error-messages");
const { ROLES } = require('@/modules/auth/auth.constants');

const authenticate = (req, res, next) => {
  try {
    const token = req.cookies.accessToken;
    
    if (!token) {
      throw new AppException({
        status: HTTP_STATUS.UNAUTHORIZED,
        message: ERROR_MESSAGES.AUTHENTICATION_FAILED,
      });
    }

    // verifyToken will throw AppException if token is invalid/expired
    const payload = verifyToken(token);
    req.user = payload;
    next();
  } catch (error) {
    // If it's already an AppException, pass it to error handler
    // Otherwise, wrap it in AppException
    if (error instanceof AppException) {
      next(error);
    } else {
      next(new AppException({
        status: HTTP_STATUS.UNAUTHORIZED,
        message: ERROR_MESSAGES.AUTHENTICATION_FAILED,
      }));
    }
  }
};

const authorize = (allowedRoles = []) => {
  return (req, res, next) => {
    const roleId = req.user?.roleId;
    const userRole = ROLES[roleId];

    if (!userRole || !allowedRoles.includes(userRole)) {
      throw new AppException({
        status: HTTP_STATUS.FORBIDDEN,
        message: ERROR_MESSAGES.AUTHORIZATION_FAILED,
      });
    }

    next();
  };
};

module.exports = { authenticate, authorize };
