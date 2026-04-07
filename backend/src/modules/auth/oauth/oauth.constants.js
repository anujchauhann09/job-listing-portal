const OAUTH_PROVIDERS = {
  GOOGLE: 'google',
  GITHUB: 'github',
  LINKEDIN: 'linkedin'
};

const OAUTH_MESSAGES = {
  INVALID_PROVIDER: 'Unsupported OAuth provider',
  OAUTH_FAILED: 'OAuth authentication failed',
  ROLE_MISMATCH: 'This account is registered with a different role. Please sign in using the correct role.',
};

const USER_TYPES = {
  JOB_SEEKER: 'JOB_SEEKER',
  EMPLOYER: 'EMPLOYER'
};

module.exports = {
  OAUTH_PROVIDERS,
  OAUTH_MESSAGES,
  USER_TYPES
};
