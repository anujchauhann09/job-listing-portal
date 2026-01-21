const { z } = require('zod');

const nameSchema = z
  .string()
  .min(2, 'Name must be at least 2 characters')
  .max(50, 'Name must be at most 50 characters')
  .regex(/^[A-Za-z]+(?: [A-Za-z]+)*$/, 'Name can contain only letters and single spaces')
  .refine((val) => val.trim() === val, {
    message: 'Name cannot start or end with spaces',
  });

const emailSchema = z
  .string()
  .email('Invalid email format')
  .min(5)
  .max(255);

const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .max(72, 'Password too long')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character');

const registerSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
  userType: z.enum(['JOB_SEEKER', 'EMPLOYER'])
});

const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required')
});

module.exports = {
  registerSchema,
  loginSchema
};
