const { z } = require('zod');

const updateUserProfileSchema = z
  .object({
    name: z.string().min(2).max(100).optional(),
    bio: z.string().max(500).optional().nullable(),
    phone: z.string().min(7).max(20).optional().nullable()
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field must be provided'
  });

module.exports = {
  updateUserProfileSchema
};
