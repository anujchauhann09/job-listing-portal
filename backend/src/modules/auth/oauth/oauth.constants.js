const OAUTH_PROVIDERS = {
  GOOGLE: 'google',
  GITHUB: 'github',
  LINKEDIN: 'linkedin'
};

const OAUTH_MESSAGES = {
  INVALID_PROVIDER: 'Unsupported OAuth provider',
  OAUTH_FAILED: 'OAuth authentication failed'
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
