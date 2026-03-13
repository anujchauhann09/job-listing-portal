'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useSettings } from '@/hooks';
import { usePasswordStrength } from '@/hooks';
import { updatePasswordSchema, UpdatePasswordFormData } from '@/validators/settings';
import { Lock, Shield, CheckCircle, AlertCircle, Eye, EyeOff } from 'lucide-react';

export function SecuritySettings() {
  const { loading, error, updatePassword } = useSettings();
  const [showPasswords, setShowPasswords] = React.useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [updateStatus, setUpdateStatus] = React.useState<'idle' | 'success' | 'error'>('idle');
  const [updateMessage, setUpdateMessage] = React.useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch
  } = useForm<UpdatePasswordFormData>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    }
  });

  const newPassword = watch('newPassword');
  const { score, label, color, suggestions } = usePasswordStrength(newPassword);

  const togglePasswordVisibility = (field: keyof typeof showPasswords) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const onSubmit = async (data: UpdatePasswordFormData) => {
    try {
      setUpdateStatus('idle');
      setUpdateMessage('');
      
      await updatePassword(data);
      
      setUpdateStatus('success');
      setUpdateMessage('Password updated successfully. You will need to log in again on other devices.');
      
      reset();
    } catch (err) {
      setUpdateStatus('error');
      setUpdateMessage(err instanceof Error ? err.message : 'Failed to update password');
    }
  };

  const getStrengthColor = (strength: number) => {
    if (strength < 2) return 'bg-error-500';
    if (strength < 3) return 'bg-warning-500';
    if (strength < 4) return 'bg-primary-500';
    return 'bg-success-500';
  };

  const getStrengthLabel = (strength: number) => {
    if (strength < 2) return 'Weak';
    if (strength < 3) return 'Fair';
    if (strength < 4) return 'Good';
    return 'Strong';
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-secondary-900 dark:text-secondary-100 mb-2">
          Password & Security
        </h2>
        <p className="text-secondary-600 dark:text-secondary-400">
          Update your password and manage security settings
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
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Lock className="h-5 w-5 text-secondary-600 dark:text-secondary-400" />
            <h3 className="font-medium text-secondary-900 dark:text-secondary-100">
              Change Password
            </h3>
          </div>

          <div className="relative">
            <Input
              type={showPasswords.current ? 'text' : 'password'}
              label="Current Password"
              {...register('currentPassword')}
              error={errors.currentPassword?.message}
              placeholder="Enter your current password"
              required
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility('current')}
              className="absolute right-3 top-8 text-secondary-400 hover:text-secondary-600 dark:hover:text-secondary-300"
            >
              {showPasswords.current ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>

          <div className="relative">
            <Input
              type={showPasswords.new ? 'text' : 'password'}
              label="New Password"
              {...register('newPassword')}
              error={errors.newPassword?.message}
              placeholder="Enter your new password"
              required
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility('new')}
              className="absolute right-3 top-8 text-secondary-400 hover:text-secondary-600 dark:hover:text-secondary-300"
            >
              {showPasswords.new ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>

          {newPassword && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-secondary-600 dark:text-secondary-400">
                  Password strength:
                </span>
                <span className={`text-sm font-medium ${
                  score < 2 ? 'text-error-600 dark:text-error-400' :
                  score < 3 ? 'text-warning-600 dark:text-warning-400' :
                  score < 4 ? 'text-primary-600 dark:text-primary-400' :
                  'text-success-600 dark:text-success-400'
                }`}>
                  {getStrengthLabel(score)}
                </span>
              </div>
              <div className="w-full bg-secondary-200 dark:bg-secondary-700 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${getStrengthColor(score)}`}
                  style={{ width: `${(score / 4) * 100}%` }}
                />
              </div>
              {suggestions.length > 0 && (
                <ul className="text-xs text-secondary-600 dark:text-secondary-400 space-y-1">
                  {suggestions.map((item, index) => (
                    <li key={index}>• {item}</li>
                  ))}
                </ul>
              )}
            </div>
          )}

          <div className="relative">
            <Input
              type={showPasswords.confirm ? 'text' : 'password'}
              label="Confirm New Password"
              {...register('confirmPassword')}
              error={errors.confirmPassword?.message}
              placeholder="Confirm your new password"
              required
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility('confirm')}
              className="absolute right-3 top-8 text-secondary-400 hover:text-secondary-600 dark:hover:text-secondary-300"
            >
              {showPasswords.confirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>

          {updateStatus === 'success' && updateMessage && (
            <div className="p-4 bg-success-50 dark:bg-success-900/20 border border-success-200 dark:border-success-800 rounded-lg">
              <div className="flex items-start space-x-2">
                <CheckCircle className="h-5 w-5 text-success-600 dark:text-success-400 mt-0.5" />
                <p className="text-success-700 dark:text-success-300">{updateMessage}</p>
              </div>
            </div>
          )}

          {updateStatus === 'error' && updateMessage && (
            <div className="p-4 bg-error-50 dark:bg-error-900/20 border border-error-200 dark:border-error-800 rounded-lg">
              <div className="flex items-start space-x-2">
                <AlertCircle className="h-5 w-5 text-error-600 dark:text-error-400 mt-0.5" />
                <p className="text-error-700 dark:text-error-300">{updateMessage}</p>
              </div>
            </div>
          )}
        </div>

        <div className="bg-secondary-50 dark:bg-secondary-700/50 rounded-lg p-4">
          <div className="flex items-center space-x-3 mb-3">
            <Shield className="h-5 w-5 text-secondary-600 dark:text-secondary-400" />
            <h3 className="font-medium text-secondary-900 dark:text-secondary-100">
              Security Recommendations
            </h3>
          </div>
          <ul className="text-sm text-secondary-600 dark:text-secondary-400 space-y-2">
            <li>• Use a unique password that you don't use anywhere else</li>
            <li>• Include a mix of uppercase, lowercase, numbers, and special characters</li>
            <li>• Make it at least 8 characters long</li>
            <li>• Consider using a password manager to generate and store secure passwords</li>
            <li>• Change your password regularly, especially if you suspect it may be compromised</li>
          </ul>
        </div>

        <div className="flex justify-end pt-6 border-t border-secondary-200 dark:border-secondary-700">
          <Button
            type="submit"
            loading={isSubmitting}
            disabled={loading}
          >
            Update Password
          </Button>
        </div>
      </form>
    </div>
  );
}