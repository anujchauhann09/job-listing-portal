'use client';

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { AuthPage } from '@/components/auth/AuthPage';
import { ROUTES } from '@/lib/constants';

export const dynamic = 'force-dynamic';

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();

  const role = (searchParams.get('role') as 'job-seeker' | 'employer') || 'job-seeker';

  useEffect(() => {
    if (user) router.push(ROUTES.HOME);
  }, [user, router]);

  if (user) return null;

  return (
    <AuthPage
      initialMode="login"
      initialRole={role}
      onSuccess={() => router.push(ROUTES.HOME)}
      onModeChange={(mode) => {
        if (mode === 'register') router.push(`${ROUTES.REGISTER}?role=${role}`);
      }}
    />
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginContent />
    </Suspense>
  );
}
