const { verifyToken } = require('../utils/jwt.util');
const { ApiResponse } = require('../responses/api.response');
const { HTTP_STATUS } = require('../constants/http-status');

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined');
}

const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new ApiResponse({
        success: false,
        message: 'Authentication token missing or invalid'
      }).send(res, HTTP_STATUS.UNAUTHORIZED);
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);

    req.user = {
      uuid: decoded.sub,
      roleId: decoded.roleId
    };

    next();
  } catch (error) {
    return new ApiResponse({
      success : false,
      message: 'Invalid or expired token'
    }).send(res, HTTP_STATUS.UNAUTHORIZED);
  }     
};

module.exports = {
  authenticate
};
