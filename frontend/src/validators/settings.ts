import { z } from 'zod';

// Password validation schema
export const passwordSchema = z.string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character');

// Update password schema
export const updatePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: passwordSchema,
  confirmPassword: z.string().min(1, 'Password confirmation is required'),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
}).refine((data) => data.currentPassword !== data.newPassword, {
  message: "New password must be different from current password",
  path: ["newPassword"],
});

// Update email schema
export const updateEmailSchema = z.object({
  newEmail: z.string().email('Please enter a valid email address'),
  currentPassword: z.string().min(1, 'Current password is required'),
});

// Email verification schema
export const emailVerificationSchema = z.object({
  verificationCode: z.string()
    .min(6, 'Verification code must be 6 characters')
    .max(6, 'Verification code must be 6 characters')
    .regex(/^[0-9]+$/, 'Verification code must contain only numbers'),
});

// Notification settings schema
export const notificationSettingsSchema = z.object({
  email: z.boolean(),
  push: z.boolean(),
  marketing: z.boolean(),
});

// Privacy settings schema
export const privacySettingsSchema = z.object({
  profileVisible: z.boolean(),
  showEmail: z.boolean(),
});

// Security settings schema
export const securitySettingsSchema = z.object({
  twoFactorEnabled: z.boolean(),
  sessionTimeout: z.number()
    .min(15, 'Session timeout must be at least 15 minutes')
    .max(1440, 'Session timeout cannot exceed 24 hours'),
});

// Delete account schema
export const deleteAccountSchema = z.object({
  password: z.string().min(1, 'Password is required'),
  confirmation: z.string().min(1, 'Please type "DELETE" to confirm'),
}).refine((data) => data.confirmation === 'DELETE', {
  message: 'Please type "DELETE" to confirm account deletion',
  path: ["confirmation"],
});

// Combined settings schema
export const settingsSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  notifications: notificationSettingsSchema,
  privacy: privacySettingsSchema,
});

export type UpdatePasswordFormData = z.infer<typeof updatePasswordSchema>;
export type UpdateEmailFormData = z.infer<typeof updateEmailSchema>;
export type EmailVerificationFormData = z.infer<typeof emailVerificationSchema>;
export type NotificationSettingsFormData = z.infer<typeof notificationSettingsSchema>;
export type PrivacySettingsFormData = z.infer<typeof privacySettingsSchema>;
export type SecuritySettingsFormData = z.infer<typeof securitySettingsSchema>;
export type DeleteAccountFormData = z.infer<typeof deleteAccountSchema>;
export type SettingsFormData = z.infer<typeof settingsSchema>;