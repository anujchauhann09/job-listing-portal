'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { AuthPage } from '@/components/auth/AuthPage';
import { ROUTES } from '@/lib/constants';

export const dynamic = 'force-dynamic';

export default function LoginPage() {
  const router = useRouter();
  const { user } = useAuth();

  React.useEffect(() => {
    if (user) {
      router.push(ROUTES.HOME);
    }
  }, [user, router]);

  const handleLoginSuccess = () => {
    router.push(ROUTES.HOME);
  };

  const handleModeChange = (mode: 'login' | 'register') => {
    if (mode === 'register') {
      router.push(ROUTES.REGISTER);
    }
  };

  if (user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return <AuthPage initialMode="login" onSuccess={handleLoginSuccess} onModeChange={handleModeChange} />;
}