import { z } from 'zod';

// Backend enum values
export const JOB_TYPES = {
  FULL_TIME: 'FULL_TIME',
  PART_TIME: 'PART_TIME',
  INTERNSHIP: 'INTERNSHIP',
  CONTRACT: 'CONTRACT',
} as const;

export const EXPERIENCE_LEVELS = {
  FRESHER: 'FRESHER',
  JUNIOR: 'JUNIOR',
  MID: 'MID',
  SENIOR: 'SENIOR',
} as const;

export const REMOTE_TYPES = {
  ONSITE: 'ONSITE',
  REMOTE: 'REMOTE',
  HYBRID: 'HYBRID',
} as const;

export const SALARY_PERIODS = {
  MONTHLY: 'MONTHLY',
  YEARLY: 'YEARLY',
} as const;

export const JOB_STATUS = {
  DRAFT: 'DRAFT',
  OPEN: 'OPEN',
  CLOSED: 'CLOSED',
  ARCHIVED: 'ARCHIVED',
} as const;

export const jobPostingSchema = z.object({
  title: z.string().min(3, 'Job title must be at least 3 characters').max(150, 'Job title must be less than 150 characters'),
  description: z.string().min(20, 'Job description must be at least 20 characters'),
  qualifications: z.string().optional(),
  responsibilities: z.string().optional(),
  location: z.string().min(2, 'Location is required'),
  jobType: z.enum(['FULL_TIME', 'PART_TIME', 'INTERNSHIP', 'CONTRACT']),
  experienceLevel: z.enum(['FRESHER', 'JUNIOR', 'MID', 'SENIOR']),
  remoteType: z.enum(['ONSITE', 'REMOTE', 'HYBRID']),
  salaryMin: z.number().positive().optional(),
  salaryMax: z.number().positive().optional(),
  salaryCurrency: z.string().length(3).optional(),
  salaryPeriod: z.enum(['MONTHLY', 'YEARLY']).optional(),
  status: z.enum(['DRAFT', 'OPEN', 'CLOSED', 'ARCHIVED']).optional(),
  skills: z.array(z.string().min(1)).min(1, 'At least one skill is required'),
}).refine(
  (data) => !data.salaryMin || !data.salaryMax || data.salaryMin <= data.salaryMax,
  {
    message: 'Minimum salary cannot be greater than maximum salary',
    path: ['salaryMin'],
  }
);

export const jobSearchSchema = z.object({
  query: z.string().optional(),
  location: z.string().optional(),
  jobType: z.enum(['FULL_TIME', 'PART_TIME', 'INTERNSHIP', 'CONTRACT']).optional(),
  salaryMin: z.number().positive().optional(),
  salaryMax: z.number().positive().optional(),
  sortBy: z.enum(['createdAt', 'salaryMin', 'salaryMax']).default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(50).default(10),
});

export const jobApplicationSchema = z.object({
  jobId: z.string().min(1, 'Job ID is required'),
  coverLetter: z.string().max(2000, 'Cover letter must be less than 2000 characters').optional(),
});

export type JobPostingFormData = z.infer<typeof jobPostingSchema>;
export type JobSearchFormData = z.infer<typeof jobSearchSchema>;
export type JobApplicationFormData = z.infer<typeof jobApplicationSchema>;