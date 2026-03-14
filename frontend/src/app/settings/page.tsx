'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { profileService, UserProfile } from '@/services/profile';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { Container } from '@/components/ui/Container';
import { authService } from '@/services/auth';
import { User, Mail, Phone, FileText, Trash2 } from 'lucide-react';

export default function SettingsPage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    profileService.getMyProfile().then((res) => {
      if (res.success && res.data) setProfile(res.data);
    });
  }, []);

  const handleDeleteAccount = async () => {
    setDeleting(true);
    try {
      await authService.deleteAccount();
      await logout();
      router.push('/');
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete account');
    } finally {
      setDeleting(false);
    }
  };

  const InfoRow = ({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value?: string | null }) => (
    <div className="flex items-center gap-4 py-4 border-b border-secondary-100 dark:border-secondary-700 last:border-0">
      <div className="w-8 h-8 rounded-full bg-secondary-100 dark:bg-secondary-700 flex items-center justify-center flex-shrink-0">
        <Icon className="h-4 w-4 text-secondary-500 dark:text-secondary-400" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-secondary-500 dark:text-secondary-400 mb-0.5">{label}</p>
        <p className="text-sm font-medium text-secondary-900 dark:text-secondary-100 truncate">
          {value || <span className="text-secondary-400 dark:text-secondary-500 font-normal">Not set</span>}
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900">
      <Container className="py-8 max-w-2xl">
        <h1 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100 mb-6">Account Settings</h1>

        {/* Account Info */}
        <div className="bg-white dark:bg-secondary-800 rounded-lg border border-secondary-200 dark:border-secondary-700 p-6 mb-6">
          <h2 className="text-base font-semibold text-secondary-900 dark:text-secondary-100 mb-4">Account Information</h2>
          <InfoRow icon={Mail} label="Email" value={user?.email} />
          <InfoRow icon={User} label="Name" value={profile?.name} />
          <InfoRow icon={Phone} label="Phone" value={profile?.phone} />
          <InfoRow icon={FileText} label="Bio" value={profile?.bio} />
          <InfoRow
            icon={User}
            label="Role"
            value={user?.role === 'job-seeker' ? 'Job Seeker' : user?.role === 'employer' ? 'Employer' : undefined}
          />
        </div>

        {/* Delete Account */}
        <div className="bg-white dark:bg-secondary-800 rounded-lg border border-error-200 dark:border-error-800 p-6">
          <div className="flex items-start gap-3 mb-4">
            <Trash2 className="h-5 w-5 text-error-600 dark:text-error-400 mt-0.5 flex-shrink-0" />
            <div>
              <h2 className="text-base font-semibold text-error-700 dark:text-error-400">Delete Account</h2>
              <p className="text-sm text-secondary-600 dark:text-secondary-400 mt-1">
                Permanently delete your account and all associated data. This action cannot be undone.
              </p>
            </div>
          </div>

          <div className="bg-error-50 dark:bg-error-900/20 rounded-md p-4 mb-4 text-sm text-error-700 dark:text-error-300">
            <p className="font-medium mb-2">What will be deleted:</p>
            <ul className="space-y-1 list-disc list-inside text-error-600 dark:text-error-400">
              <li>Your profile and personal information</li>
              <li>All job applications and their history</li>
              <li>Account settings and preferences</li>
            </ul>
          </div>

          <button
            onClick={() => setShowDeleteDialog(true)}
            className="px-4 py-2 text-sm font-medium text-white bg-error-600 hover:bg-error-700 dark:bg-error-700 dark:hover:bg-error-600 rounded-md transition-colors"
          >
            Delete My Account
          </button>
        </div>
      </Container>

      <ConfirmDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleDeleteAccount}
        title="Delete Account"
        message="Are you absolutely sure? This will permanently delete your account and all data. This cannot be undone."
        confirmText="Yes, Delete My Account"
        cancelText="Cancel"
        variant="danger"
        loading={deleting}
      />
    </div>
  );
}
