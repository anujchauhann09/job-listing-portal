const { z } = require('zod');
const {
  APPLICATION_STATUS,
  APPLICATION_STATUS_TRANSITIONS
} = require('./job-application.constants');


const applyJobValidator = z.object({
  resumeUrl: z.string().min(1),  
  coverLetter: z.string().optional()
});


const updateApplicationStatusValidator = z.object({
  status: z.enum(Object.values(APPLICATION_STATUS))
});


const getApplicationsValidator = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(50).default(10),

  status: z
    .enum(Object.values(APPLICATION_STATUS))
    .optional()
});


const isValidStatusTransition = (currentStatus, nextStatus) => {
  const allowedTransitions =
    APPLICATION_STATUS_TRANSITIONS[currentStatus] || [];

  return allowedTransitions.includes(nextStatus);
};

module.exports = {
  applyJobValidator,
  updateApplicationStatusValidator,
  getApplicationsValidator,
  isValidStatusTransition
};
