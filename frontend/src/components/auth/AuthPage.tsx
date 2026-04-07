'use client';

import React, { useState } from 'react';
import { AuthForm } from './AuthForm';
import { SocialLogin } from './SocialLogin';
import { useAuth } from '@/context/AuthContext';
import { LoginFormData, RegisterFormData } from '@/validators/auth';
import { cn } from '@/lib/utils';

type AuthMode = 'login' | 'register';

interface AuthPageProps {
  initialMode?: AuthMode;
  initialRole?: 'job-seeker' | 'employer';
  onSuccess?: () => void;
  onModeChange?: (mode: 'login' | 'register') => void;
  className?: string;
}

export function AuthPage({ initialMode = 'login', initialRole = 'job-seeker', onSuccess, onModeChange, className }: AuthPageProps) {
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [selectedRole, setSelectedRole] = useState<'job-seeker' | 'employer'>(initialRole);
  const { login, register, loading, error, clearError } = useAuth();

  const handleAuthSubmit = async (data: LoginFormData | RegisterFormData) => {
    try {
      clearError();
      if (mode === 'login') {
        await login(data as LoginFormData);
        onSuccess?.();
      } else if (mode === 'register') {
        await register(data as RegisterFormData);
        setRegistrationSuccess(true);
        setTimeout(() => {
          setRegistrationSuccess(false);
          onSuccess?.();
        }, 2000);
      }
    } catch (error) {}
  };

  const handleSocialLogin = async (provider: string) => {
    const backendRole = selectedRole === 'job-seeker' ? 'JOB_SEEKER' : 'EMPLOYER';
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';
    window.location.href = `${backendUrl}/auth/oauth/${provider}?role=${backendRole}`;
  };

  const handleModeChangeInternal = (newMode: 'login' | 'register') => {
    clearError();
    if (onModeChange) {
      onModeChange(newMode);
    } else {
      setMode(newMode);
    }
  };

  return (
    <div className={cn(
      'min-h-screen flex items-center justify-center bg-[#F8FAFC] dark:bg-[#0B0F19] px-4 py-12',
      className
    )}>
      <div className="w-full max-w-sm">
        <div className="bg-white dark:bg-[#111827] rounded-2xl border border-[#E2E8F0] dark:border-[#1F2937] shadow-card p-7">
          <div className="space-y-5">
            {registrationSuccess && (
              <div className="p-3 rounded-lg bg-[#F0FDF4] border border-[#BBF7D0] dark:bg-[#14532D]/20 dark:border-[#14532D]">
                <p className="text-xs text-[#16A34A] dark:text-[#4ADE80] text-center">
                  Registration successful! Redirecting to login...
                </p>
              </div>
            )}

            <AuthForm
              mode={mode}
              initialRole={selectedRole}
              onSubmit={handleAuthSubmit}
              onModeChange={handleModeChangeInternal}
              loading={loading}
              error={error || undefined}
            />

            <SocialLogin
              providers={['google', 'linkedin', 'github']}
              onProviderClick={handleSocialLogin}
              disabled={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
