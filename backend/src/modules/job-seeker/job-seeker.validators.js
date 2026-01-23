const { z } = require('zod');


const skillsSchema = z
  .array(z.string().min(1).max(50))
  .min(1, 'At least one skill is required');

const experienceYearsSchema = z.number().int().min(0).max(50);
const noticePeriodSchema = z.number().int().min(0).max(365);

const createProfileSchema = z
  .object({
    experienceYears: experienceYearsSchema.optional(),
    currentTitle: z.string().min(2).max(100).optional(),
    currentLocation: z.string().min(2).max(100).optional(),
    expectedSalary: z.number().positive().optional(),
    noticePeriodDays: noticePeriodSchema.optional(),
    skills: skillsSchema.optional()
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field is required'
  });

const updateProfileSchema = createProfileSchema;

module.exports = {
  createProfileSchema,
  updateProfileSchema
};