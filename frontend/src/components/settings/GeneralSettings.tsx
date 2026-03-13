'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuth } from '@/context/AuthContext';
import { useSettings } from '@/hooks';
import { updateEmailSchema, UpdateEmailFormData } from '@/validators/settings';
import { Mail, User, CheckCircle, AlertCircle } from 'lucide-react';

export function GeneralSettings() {
  const { user } = useAuth();
  const { settings, loading, error, updateEmail } = useSettings();
  const [emailUpdateStatus, setEmailUpdateStatus] = React.useState<'idle' | 'pending' | 'success' | 'error'>('idle');
  const [emailUpdateMessage, setEmailUpdateMessage] = React.useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch
  } = useForm<UpdateEmailFormData>({
    resolver: zodResolver(updateEmailSchema),
    defaultValues: {
      newEmail: user?.email || '',
      currentPassword: '',
    }
  });

  const newEmail = watch('newEmail');
  const hasEmailChanged = newEmail !== user?.email;

  React.useEffect(() => {
    if (user?.email) {
      reset({
        newEmail: user.email,
        currentPassword: '',
      });
    }
  }, [user?.email, reset]);

  const onSubmit = async (data: UpdateEmailFormData) => {
    if (!hasEmailChanged) {
      return;
    }

    try {
      setEmailUpdateStatus('pending');
      setEmailUpdateMessage('');
      
      const result = await updateEmail(data);
      
      if (result.verificationRequired) {
        setEmailUpdateStatus('success');
        setEmailUpdateMessage('A verification email has been sent to your new email address. Please check your inbox and click the verification link to complete the change.');
      } else {
        setEmailUpdateStatus('success');
        setEmailUpdateMessage('Email address updated successfully.');
      }
      
      reset({
        newEmail: data.newEmail,
        currentPassword: '',
      });
    } catch (err) {
      setEmailUpdateStatus('error');
      setEmailUpdateMessage(err instanceof Error ? err.message : 'Failed to update email');
    }
  };

  if (loading && !settings) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-6 bg-secondary-200 dark:bg-secondary-700 rounded w-1/3"></div>
          <div className="space-y-4">
            <div className="h-10 bg-secondary-200 dark:bg-secondary-700 rounded"></div>
            <div className="h-10 bg-secondary-200 dark:bg-secondary-700 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-secondary-900 dark:text-secondary-100 mb-2">
          General Settings
        </h2>
        <p className="text-secondary-600 dark:text-secondary-400">
          Update your personal information and email address
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-error-50 dark:bg-error-900/20 border border-error-200 dark:border-error-800 rounded-lg">
          <div className="flex items-center space-x-2">
            <AlertCircle className="h-5 w-5 text-error-600 dark:text-error-400" />
            <p className="text-error-700 dark:text-error-300">{error}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-secondary-50 dark:bg-secondary-700/50 rounded-lg p-4">
          <div className="flex items-center space-x-3 mb-3">
            <User className="h-5 w-5 text-secondary-600 dark:text-secondary-400" />
            <h3 className="font-medium text-secondary-900 dark:text-secondary-100">
              Account Information
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-secondary-600 dark:text-secondary-400">Role:</span>
              <span className="ml-2 text-secondary-900 dark:text-secondary-100 capitalize">
                {user?.role?.replace('-', ' ')}
              </span>
            </div>
            <div>
              <span className="text-secondary-600 dark:text-secondary-400">Member since:</span>
              <span className="ml-2 text-secondary-900 dark:text-secondary-100">
                {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Mail className="h-5 w-5 text-secondary-600 dark:text-secondary-400" />
            <h3 className="font-medium text-secondary-900 dark:text-secondary-100">
              Email Address
            </h3>
          </div>

          <Input
            type="email"
            label="Email Address"
            {...register('newEmail')}
            error={errors.newEmail?.message}
            placeholder="Enter your email address"
            required
          />

          {hasEmailChanged && (
            <Input
              type="password"
              label="Current Password"
              {...register('currentPassword')}
              error={errors.currentPassword?.message}
              placeholder="Enter your current password to confirm changes"
              required
            />
          )}

          {emailUpdateStatus === 'success' && emailUpdateMessage && (
            <div className="p-4 bg-success-50 dark:bg-success-900/20 border border-success-200 dark:border-success-800 rounded-lg">
              <div className="flex items-start space-x-2">
                <CheckCircle className="h-5 w-5 text-success-600 dark:text-success-400 mt-0.5" />
                <p className="text-success-700 dark:text-success-300">{emailUpdateMessage}</p>
              </div>
            </div>
          )}

          {emailUpdateStatus === 'error' && emailUpdateMessage && (
            <div className="p-4 bg-error-50 dark:bg-error-900/20 border border-error-200 dark:border-error-800 rounded-lg">
              <div className="flex items-start space-x-2">
                <AlertCircle className="h-5 w-5 text-error-600 dark:text-error-400 mt-0.5" />
                <p className="text-error-700 dark:text-error-300">{emailUpdateMessage}</p>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end pt-6 border-t border-secondary-200 dark:border-secondary-700">
          <Button
            type="submit"
            loading={isSubmitting || emailUpdateStatus === 'pending'}
            disabled={!hasEmailChanged}
          >
            {hasEmailChanged ? 'Update Email' : 'No Changes'}
          </Button>
        </div>
      </form>
    </div>
  );
}