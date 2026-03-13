import { z } from 'zod';
import { JOB_TYPES } from '@/lib/constants';

export const jobPostingSchema = z.object({
  title: z.string().min(1, 'Job title is required').max(100, 'Job title must be less than 100 characters'),
  description: z.string().min(50, 'Job description must be at least 50 characters').max(5000, 'Job description must be less than 5000 characters'),
  requirements: z.array(z.string().min(1, 'Requirement cannot be empty')).min(1, 'At least one requirement is needed'),
  location: z.string().min(1, 'Location is required'),
  type: z.enum([JOB_TYPES.FULL_TIME, JOB_TYPES.PART_TIME, JOB_TYPES.CONTRACT, JOB_TYPES.REMOTE]),
  salaryRange: z.object({
    min: z.number().min(0, 'Minimum salary must be positive'),
    max: z.number().min(0, 'Maximum salary must be positive'),
    currency: z.string().optional(),
  }).refine((data) => data.max >= data.min, {
    message: 'Maximum salary must be greater than or equal to minimum salary',
    path: ['max'],
  }).optional(),
});

export const jobSearchSchema = z.object({
  query: z.string().optional(),
  location: z.string().optional(),
  type: z.array(z.enum([JOB_TYPES.FULL_TIME, JOB_TYPES.PART_TIME, JOB_TYPES.CONTRACT, JOB_TYPES.REMOTE])).optional(),
  salaryRange: z.object({
    min: z.number().min(0).optional(),
    max: z.number().min(0).optional(),
  }).optional(),
  datePosted: z.enum(['today', 'week', 'month', 'all']).optional(),
  page: z.number().min(1).default(1),
  pageSize: z.number().min(1).max(50).default(20),
});

export const jobApplicationSchema = z.object({
  jobId: z.string().min(1, 'Job ID is required'),
  coverLetter: z.string().max(2000, 'Cover letter must be less than 2000 characters').optional(),
});

export type JobPostingFormData = z.infer<typeof jobPostingSchema>;
export type JobSearchFormData = z.infer<typeof jobSearchSchema>;
export type JobApplicationFormData = z.infer<typeof jobApplicationSchema>;