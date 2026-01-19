export const APP_NAME = 'JobConnect';

export const USER_ROLE = {
  JOB_SEEKER: 'jobseeker',
  EMPLOYER: 'employer',
};

export const API_ENDPOINTS = {
  LOGIN: 'api/v1/auth/login',
  LOGOUT: 'api/v1/auth/logout',
  REFRESH: 'api/v1/auth/refresh',
  REGISTER: 'api/v1/auth/register',
  PROFILE: 'api/v1/profile',
  JOBS: 'api/v1/jobs',
  APPLICATIONS: 'api/v1/applications',
};

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

export const MESSAGES = {
  LOGIN_SUCCESS: 'Login successful! Redirecting...',
  LOGIN_ERROR: 'Login failed. Please check your credentials.',
  VALIDATION_ERROR: 'Please fix the errors below.',
  NETWORK_ERROR: 'Network error. Please try again.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  SESSION_EXPIRED: 'Your session has expired. Please login again.',
};

export const VALIDATION_RULES = {
  MIN_PASSWORD_LENGTH: 6,
  MIN_PASSWORD_STRENGTH: 'fair',
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
};

export const LOCAL_STORAGE_KEYS = {
  AUTH_TOKEN: 'authToken',
  REFRESH_TOKEN: 'refreshToken',
  USER_ROLE: 'userRole',
  USER_DATA: 'userData',
};
