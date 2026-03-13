'use client';

import React, { useState } from 'react';
import { AuthForm } from './AuthForm';
import { PasswordResetForm } from './PasswordResetForm';
import { SocialLogin } from './SocialLogin';
import { useAuth } from '@/context/AuthContext';
import { LoginFormData, RegisterFormData, PasswordResetFormData } from '@/validators/auth';

type AuthMode = 'login' | 'register' | 'reset-password';

interface AuthPageProps {
  initialMode?: AuthMode;
  onSuccess?: () => void;
  onModeChange?: (mode: 'login' | 'register') => void;
  className?: string;
}

export function AuthPage({ initialMode = 'login', onSuccess, onModeChange, className }: AuthPageProps) {
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [selectedRole, setSelectedRole] = useState<'job-seeker' | 'employer'>('job-seeker');
  const { login, register, resetPassword, loading, error, clearError } = useAuth();

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
    } catch (error) {
    }
  };

  const handlePasswordReset = async (data: PasswordResetFormData) => {
    try {
      clearError();
      await resetPassword(data);
    } catch (error) {
    }
  };

  const handleRoleChange = (role: 'job-seeker' | 'employer') => {
    setSelectedRole(role);
  };

  const handleSocialLogin = async (provider: string) => {
    const backendRole = selectedRole === 'job-seeker' ? 'JOB_SEEKER' : 'EMPLOYER';
    
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';
    const oauthUrl = `${backendUrl}/auth/oauth/${provider}?role=${backendRole}`;
    
    window.location.href = oauthUrl;
  };

  const handleModeChangeInternal = (newMode: 'login' | 'register') => {
    clearError();
    if (onModeChange) {
      onModeChange(newMode);
    } else {
      setMode(newMode);
    }
  };

  const handleForgotPassword = () => {
    clearError();
    setMode('reset-password');
  };

  const handleBackToLogin = () => {
    clearError();
    if (onModeChange) {
      onModeChange('login');
    } else {
      setMode('login');
    }
  };

  if (mode === 'reset-password') {
    return (
      <div className={className}>
        <PasswordResetForm
          onSubmit={handlePasswordReset}
          onBack={handleBackToLogin}
          loading={loading}
          error={error || undefined}
        />
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="space-y-6">
        {registrationSuccess && (
          <div className="p-4 rounded-lg bg-success-50 border border-success-200 dark:bg-success-900/20 dark:border-success-800">
            <p className="text-sm text-success-600 dark:text-success-400 text-center">
              Registration successful! Redirecting to login...
            </p>
          </div>
        )}
        
        <AuthForm
          mode={mode as 'login' | 'register'}
          onSubmit={handleAuthSubmit}
          onForgotPassword={handleForgotPassword}
          onModeChange={handleModeChangeInternal}
          onRoleChange={handleRoleChange}
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
  );
}