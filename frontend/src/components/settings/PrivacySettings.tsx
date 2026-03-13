'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/Button';
import { useSettings } from '@/hooks';
import { privacySettingsSchema, PrivacySettingsFormData } from '@/validators/settings';
import { Eye, EyeOff, Mail, Users, CheckCircle, AlertCircle, Info } from 'lucide-react';

export function PrivacySettings() {
  const { settings, loading, error, updatePrivacy } = useSettings();
  const [updateStatus, setUpdateStatus] = React.useState<'idle' | 'success' | 'error'>('idle');
  const [updateMessage, setUpdateMessage] = React.useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isDirty },
    reset,
    watch
  } = useForm<PrivacySettingsFormData>({
    resolver: zodResolver(privacySettingsSchema),
    defaultValues: {
      profileVisible: settings?.privacy.profileVisible ?? true,
      showEmail: settings?.privacy.showEmail ?? false,
    }
  });

  const watchedValues = watch();

  React.useEffect(() => {
    if (settings?.privacy) {
      reset({
        profileVisible: settings.privacy.profileVisible,
        showEmail: settings.privacy.showEmail,
      });
    }
  }, [settings?.privacy, reset]);

  const onSubmit = async (data: PrivacySettingsFormData) => {
    try {
      setUpdateStatus('idle');
      setUpdateMessage('');
      
      await updatePrivacy(data);
      
      setUpdateStatus('success');
      setUpdateMessage('Privacy settings updated successfully.');
    } catch (err) {
      setUpdateStatus('error');
      setUpdateMessage(err instanceof Error ? err.message : 'Failed to update privacy settings');
    }
  };

  if (loading && !settings) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-6 bg-secondary-200 dark:bg-secondary-700 rounded w-1/3"></div>
          <div className="space-y-4">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="h-20 bg-secondary-200 dark:bg-secondary-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-secondary-900 dark:text-secondary-100 mb-2">
          Privacy Settings
        </h2>
        <p className="text-secondary-600 dark:text-secondary-400">
          Control who can see your profile and personal information
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
            <Users className="h-5 w-5 text-secondary-600 dark:text-secondary-400" />
            <h3 className="font-medium text-secondary-900 dark:text-secondary-100">
              Profile Visibility
            </h3>
          </div>

          <div className="bg-secondary-50 dark:bg-secondary-700/50 rounded-lg p-4">
            <label className="flex items-start space-x-3 cursor-pointer">
              <input
                type="checkbox"
                {...register('profileVisible')}
                className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-secondary-300 dark:border-secondary-600 rounded"
              />
              <div className="flex-1">
                <div className="font-medium text-secondary-900 dark:text-secondary-100">
                  Make my profile visible to employers
                </div>
                <div className="text-sm text-secondary-600 dark:text-secondary-400 mt-1">
                  When enabled, employers can find and view your profile when searching for candidates. 
                  This increases your chances of being discovered for job opportunities.
                </div>
                {!watchedValues.profileVisible && (
                  <div className="mt-2 p-2 bg-warning-50 dark:bg-warning-900/20 border border-warning-200 dark:border-warning-800 rounded">
                    <div className="flex items-start space-x-2">
                      <Info className="h-4 w-4 text-warning-600 dark:text-warning-400 mt-0.5 flex-shrink-0" />
                      <p className="text-xs text-warning-700 dark:text-warning-300">
                        With a hidden profile, you can still apply to jobs, but employers won't be able to find you through searches.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </label>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Mail className="h-5 w-5 text-secondary-600 dark:text-secondary-400" />
            <h3 className="font-medium text-secondary-900 dark:text-secondary-100">
              Contact Information
            </h3>
          </div>

          <div className="bg-secondary-50 dark:bg-secondary-700/50 rounded-lg p-4">
            <label className="flex items-start space-x-3 cursor-pointer">
              <input
                type="checkbox"
                {...register('showEmail')}
                className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-secondary-300 dark:border-secondary-600 rounded"
              />
              <div className="flex-1">
                <div className="font-medium text-secondary-900 dark:text-secondary-100">
                  Show my email address on my profile
                </div>
                <div className="text-sm text-secondary-600 dark:text-secondary-400 mt-1">
                  When enabled, employers can see your email address on your profile. 
                  This allows them to contact you directly about job opportunities.
                </div>
                {watchedValues.showEmail && (
                  <div className="mt-2 p-2 bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 rounded">
                    <div className="flex items-start space-x-2">
                      <Info className="h-4 w-4 text-primary-600 dark:text-primary-400 mt-0.5 flex-shrink-0" />
                      <p className="text-xs text-primary-700 dark:text-primary-300">
                        Your email will be visible to employers when they view your profile. You can still receive messages through the platform.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </label>
          </div>
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

        <div className="bg-secondary-50 dark:bg-secondary-700/50 rounded-lg p-4">
          <div className="flex items-center space-x-3 mb-3">
            <Eye className="h-5 w-5 text-secondary-600 dark:text-secondary-400" />
            <h3 className="font-medium text-secondary-900 dark:text-secondary-100">
              Privacy Summary
            </h3>
          </div>
          <div className="text-sm text-secondary-600 dark:text-secondary-400 space-y-2">
            <div className="flex items-center justify-between">
              <span>Profile visibility:</span>
              <span className={`font-medium ${watchedValues.profileVisible ? 'text-success-600 dark:text-success-400' : 'text-warning-600 dark:text-warning-400'}`}>
                {watchedValues.profileVisible ? 'Public' : 'Hidden'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Email visibility:</span>
              <span className={`font-medium ${watchedValues.showEmail ? 'text-primary-600 dark:text-primary-400' : 'text-secondary-600 dark:text-secondary-400'}`}>
                {watchedValues.showEmail ? 'Visible' : 'Hidden'}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Info className="h-5 w-5 text-primary-600 dark:text-primary-400 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-primary-700 dark:text-primary-300">
              <p className="font-medium mb-1">Data Protection</p>
              <p>
                We respect your privacy and will never share your personal information with third parties 
                without your consent. Your data is encrypted and stored securely. You can request a copy 
                of your data or delete your account at any time.
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-6 border-t border-secondary-200 dark:border-secondary-700">
          <Button
            type="submit"
            loading={isSubmitting}
            disabled={!isDirty || loading}
          >
            {isDirty ? 'Save Changes' : 'No Changes'}
          </Button>
        </div>
      </form>
    </div>
  );
}