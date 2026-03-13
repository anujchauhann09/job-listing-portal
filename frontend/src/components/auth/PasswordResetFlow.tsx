'use client';

import React, { useState } from 'react';
import { PasswordResetForm } from './PasswordResetForm';
import { ChangePasswordForm } from './ChangePasswordForm';
import { useAuth } from '@/context/AuthContext';
import { PasswordResetFormData, ChangePasswordFormData } from '@/validators/auth';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { CheckCircle, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

type FlowStep = 'request' | 'success' | 'reset' | 'complete';

interface PasswordResetFlowProps {
  onBack?: () => void;
  onComplete?: () => void;
  className?: string;
  resetToken?: string;
}

export function PasswordResetFlow({ 
  onBack, 
  onComplete, 
  className,
  resetToken 
}: PasswordResetFlowProps) {
  const [step, setStep] = useState<FlowStep>(resetToken ? 'reset' : 'request');
  const [email, setEmail] = useState('');
  const { resetPassword, changePassword, loading, error } = useAuth();

  const handlePasswordResetRequest = async (data: PasswordResetFormData) => {
    try {
      await resetPassword(data);
      setEmail(data.email);
      setStep('success');
    } catch (error) {
    }
  };

  const handlePasswordChange = async (data: ChangePasswordFormData) => {
    try {
      await changePassword(data);
      setStep('complete');
    } catch (error) {
    }
  };

  const handleBackToRequest = () => {
    setStep('request');
    setEmail('');
  };

  const handleTryAgain = () => {
    setStep('request');
  };

  const handleComplete = () => {
    onComplete?.();
  };

  if (step === 'request') {
    return (
      <div className={className}>
        <PasswordResetForm
          onSubmit={handlePasswordResetRequest}
          onBack={onBack}
          loading={loading}
          error={error || undefined}
        />
      </div>
    );
  }

  if (step === 'success') {
    return (
      <Card className={cn('w-full max-w-md mx-auto', className)}>
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-12 h-12 bg-success-100 rounded-full flex items-center justify-center dark:bg-success-900/20">
            <CheckCircle className="w-6 h-6 text-success-600 dark:text-success-400" />
          </div>
          <div className="space-y-2">
            <CardTitle className="text-2xl font-bold">Check your email</CardTitle>
            <CardDescription>
              We've sent a password reset link to{' '}
              <span className="font-medium text-secondary-900 dark:text-secondary-100">
                {email}
              </span>
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="text-center space-y-2">
            <p className="text-sm text-secondary-600 dark:text-secondary-400">
              Click the link in the email to reset your password. The link will expire in 24 hours.
            </p>
            <p className="text-sm text-secondary-600 dark:text-secondary-400">
              Didn't receive the email? Check your spam folder or try again.
            </p>
          </div>

          <div className="flex flex-col space-y-3">
            <Button
              type="button"
              variant="primary"
              size="lg"
              className="w-full"
              onClick={handleTryAgain}
            >
              Send another email
            </Button>
            
            {onBack && (
              <Button
                type="button"
                variant="ghost"
                size="md"
                className="w-full"
                onClick={onBack}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to sign in
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (step === 'reset') {
    return (
      <div className={className}>
        <ChangePasswordForm
          onSubmit={handlePasswordChange}
          loading={loading}
          error={error || undefined}
        />
        
        <div className="mt-4 text-center">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleBackToRequest}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Request new reset link
          </Button>
        </div>
      </div>
    );
  }

  if (step === 'complete') {
    return (
      <Card className={cn('w-full max-w-md mx-auto', className)}>
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-12 h-12 bg-success-100 rounded-full flex items-center justify-center dark:bg-success-900/20">
            <CheckCircle className="w-6 h-6 text-success-600 dark:text-success-400" />
          </div>
          <div className="space-y-2">
            <CardTitle className="text-2xl font-bold">Password updated!</CardTitle>
            <CardDescription>
              Your password has been successfully updated. You can now sign in with your new password.
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <Button
            type="button"
            variant="primary"
            size="lg"
            className="w-full"
            onClick={handleComplete}
          >
            Continue to sign in
          </Button>
        </CardContent>
      </Card>
    );
  }

  return null;
}