'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/Button';
import { useSettings } from '@/hooks';
import { notificationSettingsSchema, NotificationSettingsFormData } from '@/validators/settings';
import { Bell, Mail, Smartphone, Megaphone, CheckCircle, AlertCircle } from 'lucide-react';

export function NotificationSettings() {
  const { settings, loading, error, updateNotifications } = useSettings();
  const [updateStatus, setUpdateStatus] = React.useState<'idle' | 'success' | 'error'>('idle');
  const [updateMessage, setUpdateMessage] = React.useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isDirty },
    reset,
    watch
  } = useForm<NotificationSettingsFormData>({
    resolver: zodResolver(notificationSettingsSchema),
    defaultValues: {
      email: settings?.notifications.email ?? true,
      push: settings?.notifications.push ?? false,
      marketing: settings?.notifications.marketing ?? false,
    }
  });

  const watchedValues = watch();

  React.useEffect(() => {
    if (settings?.notifications) {
      reset({
        email: settings.notifications.email,
        push: settings.notifications.push,
        marketing: settings.notifications.marketing,
      });
    }
  }, [settings?.notifications, reset]);

  const onSubmit = async (data: NotificationSettingsFormData) => {
    try {
      setUpdateStatus('idle');
      setUpdateMessage('');
      
      await updateNotifications(data);
      
      setUpdateStatus('success');
      setUpdateMessage('Notification preferences updated successfully.');
    } catch (err) {
      setUpdateStatus('error');
      setUpdateMessage(err instanceof Error ? err.message : 'Failed to update notification preferences');
    }
  };

  if (loading && !settings) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-6 bg-secondary-200 dark:bg-secondary-700 rounded w-1/3"></div>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-16 bg-secondary-200 dark:bg-secondary-700 rounded"></div>
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
          Notification Preferences
        </h2>
        <p className="text-secondary-600 dark:text-secondary-400">
          Choose how you want to be notified about important updates
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
            <Mail className="h-5 w-5 text-secondary-600 dark:text-secondary-400" />
            <h3 className="font-medium text-secondary-900 dark:text-secondary-100">
              Email Notifications
            </h3>
          </div>

          <div className="bg-secondary-50 dark:bg-secondary-700/50 rounded-lg p-4">
            <label className="flex items-start space-x-3 cursor-pointer">
              <input
                type="checkbox"
                {...register('email')}
                className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-secondary-300 dark:border-secondary-600 rounded"
              />
              <div className="flex-1">
                <div className="font-medium text-secondary-900 dark:text-secondary-100">
                  Email notifications
                </div>
                <div className="text-sm text-secondary-600 dark:text-secondary-400 mt-1">
                  Receive email notifications for job applications, messages, and important account updates. 
                  This includes application status changes, new job matches, and security alerts.
                </div>
              </div>
            </label>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Smartphone className="h-5 w-5 text-secondary-600 dark:text-secondary-400" />
            <h3 className="font-medium text-secondary-900 dark:text-secondary-100">
              Push Notifications
            </h3>
          </div>

          <div className="bg-secondary-50 dark:bg-secondary-700/50 rounded-lg p-4">
            <label className="flex items-start space-x-3 cursor-pointer">
              <input
                type="checkbox"
                {...register('push')}
                className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-secondary-300 dark:border-secondary-600 rounded"
              />
              <div className="flex-1">
                <div className="font-medium text-secondary-900 dark:text-secondary-100">
                  Browser push notifications
                </div>
                <div className="text-sm text-secondary-600 dark:text-secondary-400 mt-1">
                  Get instant notifications in your browser for time-sensitive updates like new messages, 
                  application responses, and urgent account notifications.
                </div>
              </div>
            </label>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Megaphone className="h-5 w-5 text-secondary-600 dark:text-secondary-400" />
            <h3 className="font-medium text-secondary-900 dark:text-secondary-100">
              Marketing Communications
            </h3>
          </div>

          <div className="bg-secondary-50 dark:bg-secondary-700/50 rounded-lg p-4">
            <label className="flex items-start space-x-3 cursor-pointer">
              <input
                type="checkbox"
                {...register('marketing')}
                className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-secondary-300 dark:border-secondary-600 rounded"
              />
              <div className="flex-1">
                <div className="font-medium text-secondary-900 dark:text-secondary-100">
                  Marketing emails and updates
                </div>
                <div className="text-sm text-secondary-600 dark:text-secondary-400 mt-1">
                  Receive newsletters, job market insights, career tips, and promotional offers. 
                  You can unsubscribe at any time.
                </div>
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

        <div className="bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 rounded-lg p-4">
          <div className="flex items-center space-x-3 mb-3">
            <Bell className="h-5 w-5 text-primary-600 dark:text-primary-400" />
            <h3 className="font-medium text-primary-900 dark:text-primary-100">
              Current Settings
            </h3>
          </div>
          <div className="text-sm text-primary-700 dark:text-primary-300 space-y-1">
            <div>Email notifications: {watchedValues.email ? 'Enabled' : 'Disabled'}</div>
            <div>Push notifications: {watchedValues.push ? 'Enabled' : 'Disabled'}</div>
            <div>Marketing communications: {watchedValues.marketing ? 'Enabled' : 'Disabled'}</div>
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