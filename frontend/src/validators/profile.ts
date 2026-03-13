import { z } from 'zod';

export const jobSeekerProfileSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(50, 'First name must be less than 50 characters'),
  lastName: z.string().min(1, 'Last name is required').max(50, 'Last name must be less than 50 characters'),
  phone: z.string().regex(/^\+?[\d\s\-\(\)]+$/, 'Please enter a valid phone number').optional(),
  location: z.string().min(1, 'Location is required').max(100, 'Location must be less than 100 characters'),
  bio: z.string().max(500, 'Bio must be less than 500 characters').optional(),
  skills: z.array(z.string().min(1, 'Skill cannot be empty')).max(20, 'Maximum 20 skills allowed'),
  experience: z.string().min(1, 'Experience is required').max(2000, 'Experience must be less than 2000 characters'),
  education: z.string().min(1, 'Education is required').max(1000, 'Education must be less than 1000 characters'),
  resumeUrl: z.string().url('Invalid resume URL').optional(),
});

export const employerProfileSchema = z.object({
  companyName: z.string().min(1, 'Company name is required').max(100, 'Company name must be less than 100 characters'),
  industry: z.string().min(1, 'Industry is required').max(50, 'Industry must be less than 50 characters'),
  companySize: z.enum(['1-10', '11-50', '51-200', '201-500', '501-1000', '1000+']),
  website: z.string().url('Please enter a valid website URL').optional(),
  description: z.string().min(50, 'Company description must be at least 50 characters').max(2000, 'Company description must be less than 2000 characters'),
  logoUrl: z.string().url('Invalid logo URL').optional(),
  contactPerson: z.string().min(1, 'Contact person is required').max(100, 'Contact person name must be less than 100 characters'),
});

export const fileUploadSchema = z.object({
  file: z.instanceof(File, { message: 'Please select a file' }),
  maxSize: z.number().default(5 * 1024 * 1024), // 5MB
  allowedTypes: z.array(z.string()).default(['application/pdf']),
}).refine((data) => data.file.size <= data.maxSize, {
  message: 'File size must be less than 5MB',
  path: ['file'],
}).refine((data) => data.allowedTypes.includes(data.file.type), {
  message: 'Invalid file type',
  path: ['file'],
});

export type JobSeekerProfileFormData = z.infer<typeof jobSeekerProfileSchema>;
export type EmployerProfileFormData = z.infer<typeof employerProfileSchema>;
export type FileUploadFormData = z.infer<typeof fileUploadSchema>;