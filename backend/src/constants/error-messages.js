const ERROR_MESSAGES = {
  INTERNAL_SERVER_ERROR: 'Internal server error',
  BAD_REQUEST: 'Invalid request',
  UNAUTHORIZED: 'Unauthorized',
  FORBIDDEN: 'Forbidden',
  NOT_FOUND: 'Resource not found',
  VALIDATION_FAILED: 'Validation failed',
  AUTHENTICATION_FAILED: 'Authentication token is missing or invalid',
  AUTHORIZATION_FAILED: 'You are not authorized to access this resource',
  TOO_MANY_REQUESTS: 'Too many requests, please try again later',
  TOKEN_EXPIRED: 'Authentication token has expired',
  TOKEN_INVALID: 'Authentication token is invalid',
  TOKEN_MALFORMED: 'Authentication token is malformed'
};

module.exports = { ERROR_MESSAGES };