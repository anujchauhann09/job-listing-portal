const JOB_TYPES = Object.freeze({
  FULL_TIME: 'FULL_TIME',
  PART_TIME: 'PART_TIME',
  INTERNSHIP: 'INTERNSHIP',
  CONTRACT: 'CONTRACT'
});

const EXPERIENCE_LEVELS = Object.freeze({
  FRESHER: 'FRESHER',
  JUNIOR: 'JUNIOR',
  MID: 'MID',
  SENIOR: 'SENIOR'
});

const REMOTE_TYPES = Object.freeze({
  ONSITE: 'ONSITE',
  REMOTE: 'REMOTE',
  HYBRID: 'HYBRID'
});

const SALARY_PERIODS = Object.freeze({
  MONTHLY: 'MONTHLY',
  YEARLY: 'YEARLY'
});

const JOB_STATUS = Object.freeze({
  DRAFT: 'DRAFT',
  OPEN: 'OPEN',
  CLOSED: 'CLOSED',
  ARCHIVED: 'ARCHIVED'
});

const SORT_ORDER = Object.freeze({
  ASC: 'asc',
  DESC: 'desc'
});


const JOB_MESSAGES = {
  CREATED: 'Job created successfully',
  UPDATED: 'Job updated successfully',
  DELETED: 'Job deleted successfully',

  FETCHED: 'Jobs fetched successfully',
  FETCHED_SINGLE: 'Job fetched successfully',

  NOT_FOUND: 'Job not found',
  NOT_AUTHORIZED: 'You are not authorized to perform this action',
  ALREADY_DELETED: 'Job is already deleted'
};

module.exports = {
  JOB_TYPES,
  EXPERIENCE_LEVELS,
  REMOTE_TYPES,
  SALARY_PERIODS,
  JOB_STATUS,
  SORT_ORDER,
  JOB_MESSAGES
};
