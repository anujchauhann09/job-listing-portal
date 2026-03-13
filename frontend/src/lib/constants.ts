export const APP_NAME = 'Employrix';

export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  HELP: '/help',
  CONTACT: '/contact',
  CAREER_ADVICE: '/career-advice',
  SALARY_GUIDE: '/salary-guide',
  RESUME_ANALYZER: '/resume-analyzer',
  HIRING_SOLUTIONS: '/hiring-solutions',
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  DASHBOARD_JOB_SEEKER: '/dashboard/job-seeker',
  DASHBOARD_EMPLOYER: '/dashboard/employer',
  PROFILE: '/profile',
  SETTINGS: '/settings',
  JOBS: '/jobs',
  JOB_DETAIL: '/jobs/[id]',
  PRIVACY: '/privacy',
  TERMS: '/terms',
  COOKIES: '/cookies',
} as const;

export const USER_ROLES = {
  JOB_SEEKER: 'job-seeker',
  EMPLOYER: 'employer',
} as const;

export const JOB_TYPES = {
  FULL_TIME: 'full-time',
  PART_TIME: 'part-time',
  CONTRACT: 'contract',
  REMOTE: 'remote',
} as const;

export const APPLICATION_STATUS = {
  PENDING: 'pending',
  REVIEWED: 'reviewed',
  SHORTLISTED: 'shortlisted',
  REJECTED: 'rejected',
  HIRED: 'hired',
} as const;

export const THEME_MODES = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system',
} as const;

export const FILE_UPLOAD = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_RESUME_TYPES: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
} as const;

export const VALIDATION_MESSAGES = {
  REQUIRED: 'This field is required',
  INVALID_EMAIL: 'Please enter a valid email address',
  PASSWORD_TOO_SHORT: 'Password must be at least 8 characters long',
  PASSWORDS_DONT_MATCH: 'Passwords do not match',
  FILE_TOO_LARGE: 'File size must be less than 5MB',
  INVALID_FILE_TYPE: 'Invalid file type',
} as const;

export const JOB_SEEKER_PROFILE_FIELDS = [
  'firstName',
  'lastName',
  'location',
  'bio',
  'skills',
  'experience',
  'education',
] as const;

export const EMPLOYER_PROFILE_FIELDS = [
  'companyName',
  'industry',
  'companySize',
  'description',
  'contactPerson',
] as const;