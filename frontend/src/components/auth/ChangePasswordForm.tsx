'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { changePasswordSchema, ChangePasswordFormData } from '@/validators/auth';
import { Lock, Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { usePasswordStrength } from '@/hooks/usePasswordStrength';

interface ChangePasswordFormProps {
  onSubmit: (data: ChangePasswordFormData) => Promise<void>;
  loading?: boolean;
  error?: string;
  className?: string;
}

export function ChangePasswordForm({ 
  onSubmit, 
  loading = false, 
  error, 
  className 
}: ChangePasswordFormProps) {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    reset,
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const newPassword = watch('newPassword');

  const passwordStrength = usePasswordStrength(newPassword || '');

  const onFormSubmit = async (data: ChangePasswordFormData) => {
    try {
      await onSubmit(data);
      reset(); 
    } catch (error) {
    }
  };

  return (
    <Card className={cn('w-full max-w-md mx-auto', className)}>
      <CardHeader className="text-center space-y-4">
        <div className="mx-auto w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center dark:bg-primary-900/20">
          <Lock className="w-6 h-6 text-primary-600 dark:text-primary-400" />
        </div>
        <div className="space-y-2">
          <CardTitle className="text-2xl font-bold">Change Password</CardTitle>
          <CardDescription>
            Enter your current password and choose a new secure password.
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
          <div className="relative">
            <Input
              type={showCurrentPassword ? 'text' : 'password'}
              label="Current Password"
              placeholder="Enter your current password"
              {...register('currentPassword')}
              error={errors.currentPassword?.message}
              required
            />
            <button
              type="button"
              className="absolute right-3 top-9 text-secondary-400 hover:text-secondary-600 dark:text-secondary-500 dark:hover:text-secondary-400"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
            >
              {showCurrentPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>

          <div className="space-y-2">
            <div className="relative">
              <Input
                type={showNewPassword ? 'text' : 'password'}
                label="New Password"
                placeholder="Enter your new password"
                {...register('newPassword')}
                error={errors.newPassword?.message}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-9 text-secondary-400 hover:text-secondary-600 dark:text-secondary-500 dark:hover:text-secondary-400"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            
            {newPassword && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-secondary-600 dark:text-secondary-400">
                    Password strength:
                  </span>
                  <span className={passwordStrength.color}>
                    {passwordStrength.label}
                  </span>
                </div>
                <div className="w-full bg-secondary-200 rounded-full h-2 dark:bg-secondary-700">
                  <div
                    className={cn(
                      'h-2 rounded-full transition-all duration-300',
                      passwordStrength.score <= 1 && 'bg-error-500',
                      passwordStrength.score === 2 && 'bg-warning-500',
                      passwordStrength.score === 3 && 'bg-primary-500',
                      passwordStrength.score >= 4 && 'bg-success-500'
                    )}
                    style={{ width: `${(passwordStrength.score / 4) * 100}%` }}
                  />
                </div>
                {passwordStrength.suggestions.length > 0 && (
                  <div className="text-xs text-secondary-600 dark:text-secondary-400">
                    <p>Suggestions:</p>
                    <ul className="list-disc list-inside space-y-1">
                      {passwordStrength.suggestions.map((suggestion, index) => (
                        <li key={index}>{suggestion}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="relative">
            <Input
              type={showConfirmPassword ? 'text' : 'password'}
              label="Confirm New Password"
              placeholder="Confirm your new password"
              {...register('confirmPassword')}
              error={errors.confirmPassword?.message}
              required
            />
            <button
              type="button"
              className="absolute right-3 top-9 text-secondary-400 hover:text-secondary-600 dark:text-secondary-500 dark:hover:text-secondary-400"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-error-50 border border-error-200 dark:bg-error-900/20 dark:border-error-800">
              <p className="text-sm text-error-600 dark:text-error-400">{error}</p>
            </div>
          )}

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full"
            loading={loading || isSubmitting}
            disabled={loading || isSubmitting}
          >
            Change Password
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}