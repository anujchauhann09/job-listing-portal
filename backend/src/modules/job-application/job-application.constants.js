const APPLICATION_STATUS = Object.freeze({
  APPLIED: 'APPLIED',
  SHORTLISTED: 'SHORTLISTED',
  REJECTED: 'REJECTED',
  HIRED: 'HIRED',
  WITHDRAWN: 'WITHDRAWN'
});


const APPLICATION_ACTIONS = Object.freeze({
  APPLY: 'APPLY',
  WITHDRAW: 'WITHDRAW',
  SHORTLIST: 'SHORTLIST',
  REJECT: 'REJECT',
  HIRE: 'HIRE'
});


const APPLICATION_ACTOR = Object.freeze({
  JOB_SEEKER: 'JOB_SEEKER',
  EMPLOYER: 'EMPLOYER'
});


const APPLICATION_STATUS_TRANSITIONS = Object.freeze({
  APPLIED: ['SHORTLISTED', 'REJECTED', 'WITHDRAWN'],
  SHORTLISTED: ['HIRED', 'REJECTED'],
  REJECTED: [],
  HIRED: [],
  WITHDRAWN: []
});


const JOB_APPLICATION_MESSAGES = {
  APPLIED: 'Job application submitted successfully',
  WITHDRAWN: 'Job application withdrawn successfully',
  STATUS_UPDATED: 'Application status updated successfully',
  FETCHED: 'Job applications fetched successfully',

  NOT_FOUND: 'Job application not found',
  JOB_NOT_FOUND: 'Job not found',
  JOB_CLOSED: 'This job is no longer accepting applications',

  ALREADY_APPLIED: 'You have already applied for this job',
  NOT_AUTHORIZED: 'You are not authorized to perform this action',
  INVALID_STATUS_TRANSITION: 'Invalid application status transition',

  RESUME_REQUIRED: 'Resume is required to apply for this job',
  RESUME_NOT_FOUND: 'Resume not found'
};

module.exports = {
  APPLICATION_STATUS,
  APPLICATION_ACTIONS,
  APPLICATION_ACTOR,
  APPLICATION_STATUS_TRANSITIONS,
  JOB_APPLICATION_MESSAGES
};
