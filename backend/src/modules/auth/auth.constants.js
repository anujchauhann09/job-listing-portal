const AUTH_STATUS = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  CONFLICT: 409
};


const AUTH_MESSAGES = {
  USER_CREATED: 'User registered successfully',
  EMAIL_EXISTS: 'Email already registered',
  INVALID_USER_TYPE: 'Invalid user type',

  INVALID_CREDENTIALS: 'Invalid email or password',
  ACCOUNT_INACTIVE: 'Account is inactive',

  INVALID_REFRESH_TOKEN: 'Invalid refresh token',
  TOKEN_EXPIRED: 'Token has expired',
  LOGOUT_SUCCESS: 'Logged out successfully'
};


const USER_TYPES = {
  JOB_SEEKER: 'JOB_SEEKER',
  EMPLOYER: 'EMPLOYER'
};


const ROLE_IDS = {
  JOB_SEEKER: 2,
  EMPLOYER: 3
};


const TOKEN_TYPES = {
  ACCESS: 'ACCESS',
  REFRESH: 'REFRESH'
};


module.exports = {
  AUTH_STATUS,
  AUTH_MESSAGES,
  USER_TYPES,
  ROLE_IDS,
  TOKEN_TYPES
};
