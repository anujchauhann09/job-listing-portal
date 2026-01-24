const AUTH_MESSAGES = {
  USER_CREATED: 'User registered successfully',
  LOGIN_SUCCESS: 'Logged in successfully',
  EMAIL_EXISTS: 'Email already registered',
  INVALID_USER_TYPE: 'Invalid user type',

  INVALID_CREDENTIALS: 'Invalid email or password',
  ACCOUNT_INACTIVE: 'Account is inactive',

  TOKEN_REFRESHED: 'Token refreshed successfully',

  INVALID_REFRESH_TOKEN: 'Invalid refresh token',
  TOKEN_EXPIRED: 'Token has expired',
  LOGOUT_SUCCESS: 'Logged out successfully',

  ME_FETCHED: 'User information fetched successfully'
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

const ROLES = {
  1: 'ADMIN',
  2: 'JOB_SEEKER',
  3: 'EMPLOYER'
}

module.exports = {
  AUTH_MESSAGES,
  USER_TYPES,
  ROLE_IDS,
  TOKEN_TYPES,
  ROLES
};
