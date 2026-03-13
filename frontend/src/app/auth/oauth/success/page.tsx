'use client';

import React, { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { ROUTES } from '@/lib/constants';
import { Loader2 } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default function OAuthSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { refreshUser } = useAuth();
  const [error, setError] = React.useState<string | null>(null);

  useEffect(() => {
    const handleOAuthSuccess = async () => {
      try {
        const token = searchParams.get('token');

        if (!token) {
          setError('No authentication token received');
          setTimeout(() => router.push(ROUTES.LOGIN), 3000);
          return;
        }

        await refreshUser();

        router.push(ROUTES.HOME);
      } catch (error) {
        console.error('OAuth success handling error:', error);
        setError('Failed to complete authentication');
        setTimeout(() => router.push(ROUTES.LOGIN), 3000);
      }
    };

    handleOAuthSuccess();
  }, [searchParams, router, refreshUser]);

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-secondary-50 dark:bg-secondary-900">
        <div className="text-center p-8 bg-white dark:bg-secondary-800 rounded-lg shadow-lg max-w-md">
          <div className="w-16 h-16 bg-error-100 dark:bg-error-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-error-600 dark:text-error-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h1 className="text-xl font-semibold text-secondary-900 dark:text-secondary-100 mb-2">
            Authentication Failed
          </h1>
          <p className="text-secondary-600 dark:text-secondary-400 mb-4">
            {error}
          </p>
          <p className="text-sm text-secondary-500 dark:text-secondary-500">
            Redirecting to login page...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-secondary-50 dark:bg-secondary-900">
      <div className="text-center p-8 bg-white dark:bg-secondary-800 rounded-lg shadow-lg max-w-md">
        <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
          <Loader2 className="w-8 h-8 text-primary-600 dark:text-primary-400 animate-spin" />
        </div>
        <h1 className="text-xl font-semibold text-secondary-900 dark:text-secondary-100 mb-2">
          Completing Authentication
        </h1>
        <p className="text-secondary-600 dark:text-secondary-400">
          Please wait while we complete your sign in...
        </p>
      </div>
    </div>
  );
}
