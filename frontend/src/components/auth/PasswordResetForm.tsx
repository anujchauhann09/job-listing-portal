'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import { passwordResetSchema, PasswordResetFormData } from '@/validators/auth';
import { ArrowLeft, Mail, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PasswordResetFormProps {
  onSubmit: (data: PasswordResetFormData) => Promise<void>;
  onBack?: () => void;
  loading?: boolean;
  error?: string;
  className?: string;
}

export function PasswordResetForm({ 
  onSubmit, 
  onBack, 
  loading = false, 
  error, 
  className 
}: PasswordResetFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
  } = useForm<PasswordResetFormData>({
    resolver: zodResolver(passwordResetSchema),
    defaultValues: {
      email: '',
    },
  });

  const onFormSubmit = async (data: PasswordResetFormData) => {
    try {
      await onSubmit(data);
      setSubmittedEmail(data.email);
      setIsSubmitted(true);
    } catch (error) {
    }
  };

  if (isSubmitted) {
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
                {submittedEmail}
              </span>
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="text-center space-y-2">
            <p className="text-sm text-secondary-600 dark:text-secondary-400">
              Didn't receive the email? Check your spam folder or try again.
            </p>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col space-y-3">
          <Button
            type="button"
            variant="primary"
            size="lg"
            className="w-full"
            onClick={() => {
              setIsSubmitted(false);
              setSubmittedEmail('');
            }}
          >
            Try again
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
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className={cn('w-full max-w-md mx-auto', className)}>
      <CardHeader className="text-center space-y-4">
        <div className="mx-auto w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center dark:bg-primary-900/20">
          <Mail className="w-6 h-6 text-primary-600 dark:text-primary-400" />
        </div>
        <div className="space-y-2">
          <CardTitle className="text-2xl font-bold">Reset your password</CardTitle>
          <CardDescription>
            Enter your email address and we'll send you a link to reset your password.
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
          <Input
            type="email"
            label="Email Address"
            placeholder="Enter your email address"
            {...register('email')}
            error={errors.email?.message}
            required
          />

          {error && (
            <div className="p-3 rounded-lg bg-error-50 border border-error-200 dark:bg-error-900/20 dark:border-error-800">
              <p className="text-sm text-error-600 dark:text-error-400">{error}</p>
            </div>
          )}

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full"
            loading={loading || isSubmitting}
            disabled={loading || isSubmitting}
          >
            Send reset link
          </Button>
        </form>
      </CardContent>

      <CardFooter>
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
      </CardFooter>
    </Card>
  );
}