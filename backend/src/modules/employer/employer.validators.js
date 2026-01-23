const { z } = require('zod');

const createEmployerProfileSchema = z
  .object({
    companyDescription: z.string().min(10).max(1000).optional(),
    companySize: z.number().int().positive().optional(),
    industry: z.string().min(2).max(100).optional(),
    website: z.string().url().optional(),
    headquartersCity: z.string().min(2).max(100).optional(),
    headquartersCountry: z.string().min(2).max(100).optional()
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field is required'
  });

const updateEmployerProfileSchema = createEmployerProfileSchema;

module.exports = {
  createEmployerProfileSchema,
  updateEmployerProfileSchema
};
