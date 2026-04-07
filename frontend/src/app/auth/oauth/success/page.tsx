'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { ROUTES } from '@/lib/constants';
import { Loader2, XCircle } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

function OAuthSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { loginWithSession } = useAuth();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const errorParam = searchParams.get('error');
    if (errorParam) {
      setError(decodeURIComponent(errorParam));
      return;
    }

    const handleOAuthSuccess = async () => {
      try {
        const token = searchParams.get('token');

        if (!token) {
          setError('No authentication token received.');
          return;
        }

        await loginWithSession(token);
        router.push(ROUTES.HOME);
      } catch {
        setError('Failed to complete authentication. Please try again.');
      }
    };

    handleOAuthSuccess();
  }, [searchParams, router, loginWithSession]);

  if (error) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0B0F19] flex items-center justify-center px-4">
        <div className="w-full max-w-sm bg-white dark:bg-[#111827] rounded-2xl border border-[#E2E8F0] dark:border-[#1F2937] p-8 text-center">
          <div className="w-12 h-12 rounded-full bg-[#FEF2F2] dark:bg-[#7F1D1D]/20 flex items-center justify-center mx-auto mb-4">
            <XCircle className="h-6 w-6 text-[#DC2626] dark:text-[#F87171]" aria-hidden="true" />
          </div>
          <h1 className="text-base font-semibold text-[#0F172A] dark:text-[#E5E7EB] mb-2">
            Sign in failed
          </h1>
          <p className="text-sm text-[#64748B] dark:text-[#9CA3AF] mb-6 leading-relaxed">
            {error}
          </p>
          <Link
            href="/auth"
            className="inline-flex items-center justify-center w-full h-10 px-4 rounded-lg bg-[#2563EB] text-white text-sm font-medium hover:bg-[#1D4ED8] transition-colors"
          >
            Back to sign in
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0B0F19] flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-white dark:bg-[#111827] rounded-2xl border border-[#E2E8F0] dark:border-[#1F2937] p-8 text-center">
        <div className="w-12 h-12 rounded-full bg-[#EFF6FF] dark:bg-[#1E3A8A]/20 flex items-center justify-center mx-auto mb-4">
          <Loader2 className="h-6 w-6 text-[#2563EB] dark:text-[#60A5FA] animate-spin" aria-hidden="true" />
        </div>
        <h1 className="text-base font-semibold text-[#0F172A] dark:text-[#E5E7EB] mb-1">
          Completing sign in
        </h1>
        <p className="text-sm text-[#64748B] dark:text-[#9CA3AF]">
          Please wait...
        </p>
      </div>
    </div>
  );
}

export default function OAuthSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0B0F19] flex items-center justify-center">
        <Loader2 className="h-7 w-7 text-[#2563EB] animate-spin" />
      </div>
    }>
      <OAuthSuccessContent />
    </Suspense>
  );
}
