const { z } = require('zod');
const {
  JOB_TYPES,
  EXPERIENCE_LEVELS,
  REMOTE_TYPES,
  SALARY_PERIODS,
  SORT_ORDER
} = require('./job.constants');


const createJobValidator = z.object({
  title: z.string().min(3).max(150),
  description: z.string().min(20),
  qualifications: z.string().optional(),
  responsibilities: z.string().optional(),

  location: z.string().min(2),

  jobType: z.enum(Object.values(JOB_TYPES)),
  experienceLevel: z.enum(Object.values(EXPERIENCE_LEVELS)),
  remoteType: z.enum(Object.values(REMOTE_TYPES)),

  salaryMin: z.number().positive().optional(),
  salaryMax: z.number().positive().optional(),
  salaryCurrency: z.string().length(3).optional(),
  salaryPeriod: z.enum(Object.values(SALARY_PERIODS)).optional(),

  skillIds: z.array(z.number().int().positive()).min(1)
}).refine(
  (data) =>
    !data.salaryMin ||
    !data.salaryMax ||
    data.salaryMin <= data.salaryMax,
  {
    message: 'salaryMin cannot be greater than salaryMax',
    path: ['salaryMin']
  }
);

const updateJobValidator = z.object({
  title: z.string().min(3).max(150).optional(),
  description: z.string().min(20).optional(),
  qualifications: z.string().optional(),
  responsibilities: z.string().optional(),

  location: z.string().min(2).optional(),

  jobType: z.enum(Object.values(JOB_TYPES)).optional(),
  experienceLevel: z.enum(Object.values(EXPERIENCE_LEVELS)).optional(),
  remoteType: z.enum(Object.values(REMOTE_TYPES)).optional(),

  salaryMin: z.number().positive().optional(),
  salaryMax: z.number().positive().optional(),
  salaryCurrency: z.string().length(3).optional(),
  salaryPeriod: z.enum(Object.values(SALARY_PERIODS)).optional(),

  skillIds: z.array(z.number().int().positive()).optional()
}).refine(
  (data) =>
    !data.salaryMin ||
    !data.salaryMax ||
    data.salaryMin <= data.salaryMax,
  {
    message: 'salaryMin cannot be greater than salaryMax',
    path: ['salaryMin']
  }
);

const getJobsValidator = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(50).default(10),

  location: z.string().optional(),
  jobType: z.enum(Object.values(JOB_TYPES)).optional(),

  salaryMin: z.coerce.number().positive().optional(),
  salaryMax: z.coerce.number().positive().optional(),

  sortBy: z.enum(['createdAt', 'salaryMin', 'salaryMax']).default('createdAt'),
  sortOrder: z.enum(Object.values(SORT_ORDER)).default('desc')
});

module.exports = {
  createJobValidator,
  updateJobValidator,
  getJobsValidator
};
