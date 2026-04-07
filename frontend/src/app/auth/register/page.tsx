'use client';

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { AuthPage } from '@/components/auth/AuthPage';
import { ROUTES } from '@/lib/constants';

export const dynamic = 'force-dynamic';

function RegisterContent() {
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
      initialMode="register"
      initialRole={role}
      onSuccess={() => router.push(ROUTES.LOGIN)}
      onModeChange={(mode) => {
        if (mode === 'login') router.push(`${ROUTES.LOGIN}?role=${role}`);
      }}
    />
  );
}

export default function RegisterPage() {
  return (
    <Suspense>
      <RegisterContent />
    </Suspense>
  );
}
