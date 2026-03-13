'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import { loginSchema, registerSchema, LoginFormData, RegisterFormData } from '@/validators/auth';
import { UserRole } from '@/types/auth';
import { User, Building2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePasswordStrength } from '@/hooks/usePasswordStrength';
import { PasswordStrengthIndicator } from './PasswordStrengthIndicator';

interface AuthFormProps {
  mode: 'login' | 'register';
  onSubmit: (data: LoginFormData | RegisterFormData) => Promise<void>;
  onForgotPassword?: () => void;
  onModeChange?: (mode: 'login' | 'register') => void;
  onRoleChange?: (role: 'job-seeker' | 'employer') => void;
  loading?: boolean;
  error?: string;
  className?: string;
}

function LoginForm({ onSubmit, onForgotPassword, onModeChange, loading, error, className }: Omit<AuthFormProps, 'mode'>) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onFormSubmit = async (data: LoginFormData) => {
    try {
      await onSubmit(data);
    } catch (error) {
    }
  };

  return (
    <Card className={cn('w-full max-w-md mx-auto', className)}>
      <CardHeader className="space-y-1 px-4 sm:px-6">
        <CardTitle className="text-xl sm:text-2xl font-bold text-center">
          Welcome back
        </CardTitle>
        <CardDescription className="text-center text-sm sm:text-base">
          Sign in to your account to continue
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4 px-4 sm:px-6">
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
          <Input
            type="email"
            label="Email Address"
            {...register('email')}
            error={errors.email?.message}
            required
          />

          <Input
            type="password"
            label="Password"
            {...register('password')}
            error={errors.password?.message}
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
            Sign In
          </Button>
        </form>

        <div className="text-center">
          <button
            type="button"
            onClick={onForgotPassword}
            className="text-sm text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
          >
            Forgot your password?
          </button>
        </div>
      </CardContent>

      <CardFooter className="px-4 sm:px-6">
        <div className="text-center text-sm text-secondary-600 dark:text-secondary-400">
          Don't have an account?{' '}
          <button
            type="button"
            onClick={() => onModeChange?.('register')}
            className="text-primary-600 hover:text-primary-500 font-medium dark:text-primary-400 dark:hover:text-primary-300"
          >
            Sign up
          </button>
        </div>
      </CardFooter>
    </Card>
  );
}

function RegisterForm({ onSubmit, onModeChange, onRoleChange, loading, error, className }: Omit<AuthFormProps, 'mode' | 'onForgotPassword'>) {
  const [userType, setUserType] = useState<UserRole>('job-seeker');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      role: userType,
    },
  });

  const password = watch('password');

  const passwordStrength = usePasswordStrength(password || '');

  const handleRoleChange = (role: UserRole) => {
    setUserType(role);
    setValue('role', role);
    onRoleChange?.(role);
  };

  const onFormSubmit = async (data: RegisterFormData) => {
    try {
      await onSubmit(data);
    } catch (error) {
    }
  };

  return (
    <Card className={cn('w-full max-w-md mx-auto', className)}>
      <CardHeader className="space-y-1 px-4 sm:px-6">
        <CardTitle className="text-xl sm:text-2xl font-bold text-center">
          Create your account
        </CardTitle>
        <CardDescription className="text-center text-sm sm:text-base">
          Join thousands of professionals finding their dream jobs
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4 px-4 sm:px-6">
        <div className="space-y-3">
          <label className="text-sm font-medium text-secondary-900 dark:text-secondary-100">
            I am a
          </label>
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => handleRoleChange('job-seeker')}
              className={cn(
                'flex items-center justify-center p-3 rounded-lg border-2 transition-all',
                userType === 'job-seeker'
                  ? 'border-primary-500 bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400'
                  : 'border-secondary-200 hover:border-secondary-300 dark:border-secondary-700 dark:hover:border-secondary-600'
              )}
            >
              <User className="w-5 h-5 mr-2" />
              <span className="font-medium">Job Seeker</span>
            </button>
            <button
              type="button"
              onClick={() => handleRoleChange('employer')}
              className={cn(
                'flex items-center justify-center p-3 rounded-lg border-2 transition-all',
                userType === 'employer'
                  ? 'border-primary-500 bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400'
                  : 'border-secondary-200 hover:border-secondary-300 dark:border-secondary-700 dark:hover:border-secondary-600'
              )}
            >
              <Building2 className="w-5 h-5 mr-2" />
              <span className="font-medium">Employer</span>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
          <Input
            type="email"
            label="Email Address"
            {...register('email')}
            error={errors.email?.message}
            required
          />

          <div className="space-y-2">
            <Input
              type="password"
              label="Password"
              {...register('password')}
              error={errors.password?.message}
              required
            />
            {passwordStrength && password && (
              <PasswordStrengthIndicator 
                password={password}
                showDetails={true}
              />
            )}
          </div>

          <Input
            type="password"
            label="Confirm Password"
            {...register('confirmPassword')}
            error={errors.confirmPassword?.message}
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
            Create Account
          </Button>
        </form>
      </CardContent>

      <CardFooter className="px-4 sm:px-6">
        <div className="text-center text-sm text-secondary-600 dark:text-secondary-400">
          Already have an account?{' '}
          <button
            type="button"
            onClick={() => onModeChange?.('login')}
            className="text-primary-600 hover:text-primary-500 font-medium dark:text-primary-400 dark:hover:text-primary-300"
          >
            Sign in
          </button>
        </div>
      </CardFooter>
    </Card>
  );
}

export function AuthForm(props: AuthFormProps) {
  if (props.mode === 'login') {
    return <LoginForm {...props} />;
  }
  return <RegisterForm {...props} />;
}