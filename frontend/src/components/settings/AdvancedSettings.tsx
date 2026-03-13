'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { useAuth } from '@/context/AuthContext';
import { useSettings } from '@/hooks';
import { deleteAccountSchema, DeleteAccountFormData } from '@/validators/settings';
import { 
  Trash2, 
  AlertTriangle, 
  Shield, 
  Download, 
  CheckCircle, 
  AlertCircle,
  Info
} from 'lucide-react';

export function AdvancedSettings() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const { loading, error, deleteAccount } = useSettings();
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [deleteStatus, setDeleteStatus] = React.useState<'idle' | 'success' | 'error'>('idle');
  const [deleteMessage, setDeleteMessage] = React.useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch
  } = useForm<DeleteAccountFormData>({
    resolver: zodResolver(deleteAccountSchema),
    defaultValues: {
      password: '',
      confirmation: '',
    }
  });

  const confirmation = watch('confirmation');
  const isConfirmationValid = confirmation === 'DELETE';

  const handleDeleteAccount = async (data: DeleteAccountFormData) => {
    try {
      setDeleteStatus('idle');
      setDeleteMessage('');
      
      await deleteAccount(data.password);
      
      setDeleteStatus('success');
      setDeleteMessage('Your account has been successfully deleted. You will be redirected to the home page.');
      
      setTimeout(() => {
        logout();
        router.push('/');
      }, 3000);
    } catch (err) {
      setDeleteStatus('error');
      setDeleteMessage(err instanceof Error ? err.message : 'Failed to delete account');
    }
  };

  const handleExportData = () => {
    alert('Data export functionality would be implemented here. You would receive an email with your data.');
  };

  const openDeleteModal = () => {
    setShowDeleteModal(true);
    reset();
    setDeleteStatus('idle');
    setDeleteMessage('');
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    reset();
    setDeleteStatus('idle');
    setDeleteMessage('');
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-secondary-900 dark:text-secondary-100 mb-2">
          Advanced Settings
        </h2>
        <p className="text-secondary-600 dark:text-secondary-400">
          Advanced security options and account management
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

      <div className="space-y-6">
        <div className="bg-white dark:bg-secondary-800 border border-secondary-200 dark:border-secondary-700 rounded-lg p-6">
          <div className="flex items-start space-x-4">
            <div className="p-2 bg-primary-100 dark:bg-primary-900/20 rounded-lg">
              <Download className="h-5 w-5 text-primary-600 dark:text-primary-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-medium text-secondary-900 dark:text-secondary-100 mb-2">
                Export Your Data
              </h3>
              <p className="text-secondary-600 dark:text-secondary-400 mb-4">
                Download a copy of all your personal data, including your profile information, 
                job applications, and account activity. This may take a few minutes to prepare.
              </p>
              <Button
                variant="outline"
                onClick={handleExportData}
                disabled={loading}
              >
                <Download className="h-4 w-4 mr-2" />
                Request Data Export
              </Button>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-secondary-800 border border-secondary-200 dark:border-secondary-700 rounded-lg p-6">
          <div className="flex items-start space-x-4">
            <div className="p-2 bg-success-100 dark:bg-success-900/20 rounded-lg">
              <Shield className="h-5 w-5 text-success-600 dark:text-success-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-medium text-secondary-900 dark:text-secondary-100 mb-2">
                Account Security
              </h3>
              <div className="text-secondary-600 dark:text-secondary-400 space-y-2">
                <div className="flex items-center justify-between">
                  <span>Account created:</span>
                  <span className="font-medium">
                    {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Account type:</span>
                  <span className="font-medium capitalize">
                    {user?.role?.replace('-', ' ')}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Email verified:</span>
                  <span className="font-medium text-success-600 dark:text-success-400">
                    Yes
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-error-50 dark:bg-error-900/20 border border-error-200 dark:border-error-800 rounded-lg p-6">
          <div className="flex items-start space-x-4">
            <div className="p-2 bg-error-100 dark:bg-error-900/40 rounded-lg">
              <Trash2 className="h-5 w-5 text-error-600 dark:text-error-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-medium text-error-900 dark:text-error-100 mb-2">
                Delete Account
              </h3>
              <p className="text-error-700 dark:text-error-300 mb-4">
                Permanently delete your account and all associated data. This action cannot be undone.
              </p>
              
              <div className="bg-error-100 dark:bg-error-900/40 rounded-lg p-4 mb-4">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="h-5 w-5 text-error-600 dark:text-error-400 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-error-700 dark:text-error-300">
                    <p className="font-medium mb-1">What will be deleted:</p>
                    <ul className="space-y-1">
                      <li>• Your profile and personal information</li>
                      <li>• All job applications and their history</li>
                      <li>• Saved jobs and preferences</li>
                      <li>• Account settings and preferences</li>
                      <li>• All messages and communications</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <Button
                variant="outline"
                onClick={openDeleteModal}
                disabled={loading}
                className="border-error-300 text-error-700 hover:bg-error-100 dark:border-error-600 dark:text-error-300 dark:hover:bg-error-900/40"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete My Account
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={showDeleteModal}
        onClose={closeDeleteModal}
        title="Delete Account"
      >
        <div className="space-y-6">
          <div className="bg-error-50 dark:bg-error-900/20 border border-error-200 dark:border-error-800 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-6 w-6 text-error-600 dark:text-error-400 mt-0.5 flex-shrink-0" />
              <div className="text-error-700 dark:text-error-300">
                <p className="font-medium mb-2">This action is permanent and cannot be undone.</p>
                <p className="text-sm">
                  All your data will be permanently deleted from our servers. 
                  Make sure you have exported any data you want to keep.
                </p>
              </div>
            </div>
          </div>

          {deleteStatus === 'success' && deleteMessage && (
            <div className="p-4 bg-success-50 dark:bg-success-900/20 border border-success-200 dark:border-success-800 rounded-lg">
              <div className="flex items-start space-x-2">
                <CheckCircle className="h-5 w-5 text-success-600 dark:text-success-400 mt-0.5" />
                <p className="text-success-700 dark:text-success-300">{deleteMessage}</p>
              </div>
            </div>
          )}

          {deleteStatus === 'error' && deleteMessage && (
            <div className="p-4 bg-error-50 dark:bg-error-900/20 border border-error-200 dark:border-error-800 rounded-lg">
              <div className="flex items-start space-x-2">
                <AlertCircle className="h-5 w-5 text-error-600 dark:text-error-400 mt-0.5" />
                <p className="text-error-700 dark:text-error-300">{deleteMessage}</p>
              </div>
            </div>
          )}

          {deleteStatus !== 'success' && (
            <form onSubmit={handleSubmit(handleDeleteAccount)} className="space-y-4">
              <Input
                type="password"
                label="Current Password"
                {...register('password')}
                error={errors.password?.message}
                placeholder="Enter your current password"
                required
              />

              <div>
                <Input
                  type="text"
                  label='Type "DELETE" to confirm'
                  {...register('confirmation')}
                  error={errors.confirmation?.message}
                  placeholder="DELETE"
                  required
                />
                <div className="mt-1 text-xs text-secondary-500 dark:text-secondary-500">
                  Type DELETE in capital letters to confirm account deletion
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={closeDeleteModal}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  loading={isSubmitting}
                  disabled={!isConfirmationValid}
                  className="bg-error-600 hover:bg-error-700 text-white"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Account
                </Button>
              </div>
            </form>
          )}
        </div>
      </Modal>
    </div>
  );
}