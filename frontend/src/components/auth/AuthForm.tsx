'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { loginSchema, registerSchema, LoginFormData, RegisterFormData } from '@/validators/auth';
import { User, Building2, Briefcase } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePasswordStrength } from '@/hooks/usePasswordStrength';
import { PasswordStrengthIndicator } from './PasswordStrengthIndicator';

interface AuthFormProps {
  mode: 'login' | 'register';
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

function RegisterForm({ onSubmit, onModeChange, onRoleChange, loading, error, className }: Omit<AuthFormProps, 'mode'>) {
  const [userType, setUserType] = useState<'job-seeker' | 'employer'>('job-seeker');

  const { register, handleSubmit, formState: { errors, isSubmitting }, watch, setValue } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: { email: '', password: '', confirmPassword: '', role: 'job-seeker' },
  });

  const password = watch('password');
  const passwordStrength = usePasswordStrength(password || '');

  const handleRoleChange = (role: 'job-seeker' | 'employer') => {
    setUserType(role);
    setValue('role', role);
    onRoleChange?.(role);
  };

  return (
    <div className={cn('w-full max-w-sm mx-auto', className)}>
      <div className="text-center mb-7">
        <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[#2563EB] mb-4">
          <Briefcase className="h-5 w-5 text-white" aria-hidden="true" />
        </div>
        <h1 className="text-xl font-bold text-[#0F172A] dark:text-[#E5E7EB]">Create your account</h1>
        <p className="text-sm text-[#64748B] dark:text-[#9CA3AF] mt-1">Join thousands of professionals</p>
      </div>

      {/* Role selector */}
      <div className="mb-5">
        <p className="text-xs font-medium text-[#374151] dark:text-[#D1D5DB] mb-2">I am a</p>
        <div className="grid grid-cols-2 gap-2">
          {([
            { role: 'job-seeker' as const, label: 'Job Seeker', icon: User },
            { role: 'employer' as const, label: 'Employer', icon: Building2 },
          ]).map(({ role, label, icon: Icon }) => (
            <button
              key={role}
              type="button"
              onClick={() => handleRoleChange(role)}
              className={cn(
                'flex items-center justify-center gap-2 p-3 rounded-lg border-2 text-sm font-medium transition-all',
                userType === role
                  ? 'border-[#2563EB] bg-[#EFF6FF] text-[#2563EB] dark:bg-[#1E3A8A]/20 dark:text-[#60A5FA] dark:border-[#3B82F6]'
                  : 'border-[#E2E8F0] text-[#475569] hover:border-[#CBD5E1] dark:border-[#374151] dark:text-[#9CA3AF] dark:hover:border-[#4B5563]'
              )}
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
              {label}
            </button>
          ))}
        </div>
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
