'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { loginSchema, registerSchema, LoginFormData, RegisterFormData } from '@/validators/auth';
import { Briefcase } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePasswordStrength } from '@/hooks/usePasswordStrength';
import { PasswordStrengthIndicator } from './PasswordStrengthIndicator';

interface AuthFormProps {
  mode: 'login' | 'register';
  initialRole?: 'job-seeker' | 'employer';
  onSubmit: (data: LoginFormData | RegisterFormData) => Promise<void>;
  onModeChange?: (mode: 'login' | 'register') => void;
  onRoleChange?: (role: 'job-seeker' | 'employer') => void;
  loading?: boolean;
  error?: string;
  className?: string;
}

function LoginForm({ onSubmit, onModeChange, loading, error, className }: Omit<AuthFormProps, 'mode'>) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  return (
    <div className={cn('w-full max-w-sm mx-auto', className)}>
      <div className="text-center mb-7">
        <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[#2563EB] mb-4">
          <Briefcase className="h-5 w-5 text-white" aria-hidden="true" />
        </div>
        <h1 className="text-xl font-bold text-[#0F172A] dark:text-[#E5E7EB]">Welcome back</h1>
        <p className="text-sm text-[#64748B] dark:text-[#9CA3AF] mt-1">Sign in to your account</p>
      </div>

      <form onSubmit={handleSubmit(async (data) => { try { await onSubmit(data); } catch {} })} className="space-y-4">
        <Input type="email" label="Email" {...register('email')} error={errors.email?.message} required />
        <Input type="password" label="Password" {...register('password')} error={errors.password?.message} required />

        {error && (
          <div className="p-3 rounded-lg bg-[#FEF2F2] border border-[#FECACA] dark:bg-[#7F1D1D]/20 dark:border-[#7F1D1D]">
            <p className="text-xs text-[#DC2626] dark:text-[#F87171]">{error}</p>
          </div>
        )}

        <Button type="submit" size="lg" className="w-full" loading={loading || isSubmitting}>
          Sign In
        </Button>
      </form>

      <p className="mt-5 text-center text-sm text-[#64748B] dark:text-[#9CA3AF]">
        Don't have an account?{' '}
        <button
          type="button"
          onClick={() => onModeChange?.('register')}
          className="text-[#2563EB] hover:text-[#1D4ED8] font-medium dark:text-[#60A5FA] transition-colors"
        >
          Sign up
        </button>
      </p>
    </div>
  );
}

function RegisterForm({ onSubmit, onModeChange, onRoleChange, loading, error, className, initialRole = 'job-seeker' }: Omit<AuthFormProps, 'mode'>) {
  const { register, handleSubmit, formState: { errors, isSubmitting }, watch, setValue } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: { email: '', password: '', confirmPassword: '', role: initialRole },
  });

  const password = watch('password');
  const passwordStrength = usePasswordStrength(password || '');

  return (
    <div className={cn('w-full max-w-sm mx-auto', className)}>
      <div className="text-center mb-7">
        <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[#2563EB] mb-4">
          <Briefcase className="h-5 w-5 text-white" aria-hidden="true" />
        </div>
        <h1 className="text-xl font-bold text-[#0F172A] dark:text-[#E5E7EB]">Create your account</h1>
        <p className="text-sm text-[#64748B] dark:text-[#9CA3AF] mt-1">
          {initialRole === 'employer' ? 'Joining as Employer' : 'Joining as Job Seeker'}
        </p>
      </div>

      <form onSubmit={handleSubmit(async (data) => { try { await onSubmit(data); } catch {} })} className="space-y-4">
        <Input type="email" label="Email" {...register('email')} error={errors.email?.message} required />

        <div className="space-y-1.5">
          <Input type="password" label="Password" {...register('password')} error={errors.password?.message} required />
          {password && <PasswordStrengthIndicator password={password} showDetails={true} />}
        </div>

        <Input type="password" label="Confirm Password" {...register('confirmPassword')} error={errors.confirmPassword?.message} required />

        {error && (
          <div className="p-3 rounded-lg bg-[#FEF2F2] border border-[#FECACA] dark:bg-[#7F1D1D]/20 dark:border-[#7F1D1D]">
            <p className="text-xs text-[#DC2626] dark:text-[#F87171]">{error}</p>
          </div>
        )}

        <Button type="submit" size="lg" className="w-full" loading={loading || isSubmitting}>
          Create Account
        </Button>
      </form>

      <p className="mt-5 text-center text-sm text-[#64748B] dark:text-[#9CA3AF]">
        Already have an account?{' '}
        <button
          type="button"
          onClick={() => onModeChange?.('login')}
          className="text-[#2563EB] hover:text-[#1D4ED8] font-medium dark:text-[#60A5FA] transition-colors"
        >
          Sign in
        </button>
      </p>
    </div>
  );
}

export function AuthForm(props: AuthFormProps) {
  if (props.mode === 'login') return <LoginForm {...props} />;
  return <RegisterForm {...props} />;
}
