import React from 'react';
import { cn } from '@/lib/utils';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  showPasswordToggle?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, helperText, id, showPasswordToggle = true, required, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const generatedId = React.useId();
    const inputId = id || generatedId;
    const errorId = `${inputId}-error`;
    const helperTextId = `${inputId}-helper`;
    const isPassword = type === 'password';
    const inputType = isPassword && showPassword ? 'text' : type;

    return (
      <div className="space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-[#374151] dark:text-[#D1D5DB]"
          >
            {label}
            {required && <span className="text-[#DC2626] ml-1" aria-label="required">*</span>}
          </label>
        )}
        <div className="relative">
          <input
            type={inputType}
            className={cn(
              'flex h-10 w-full rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 text-sm text-[#0F172A] placeholder:text-[#94A3B8] transition-colors',
              'focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:ring-offset-0 focus:border-[#2563EB]',
              'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[#F8FAFC]',
              'dark:border-[#374151] dark:bg-[#111827] dark:text-[#E5E7EB] dark:placeholder:text-[#6B7280]',
              'dark:focus:ring-[#3B82F6] dark:focus:border-[#3B82F6]',
              error && 'border-[#DC2626] focus:ring-[#DC2626] focus:border-[#DC2626]',
              isPassword && showPasswordToggle && 'pr-10',
              className
            )}
            ref={ref}
            id={inputId}
            required={required}
            aria-required={required ? 'true' : undefined}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={cn(error && errorId, helperText && helperTextId) || undefined}
            {...props}
          />
          {isPassword && showPasswordToggle && (
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-[#94A3B8] hover:text-[#64748B] dark:hover:text-[#9CA3AF] focus:outline-none"
              onClick={() => setShowPassword(v => !v)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              tabIndex={0}
            >
              {showPassword ? <EyeOff className="h-4 w-4" aria-hidden="true" /> : <Eye className="h-4 w-4" aria-hidden="true" />}
            </button>
          )}
        </div>
        {error && (
          <p id={errorId} className="flex items-center gap-1 text-xs text-[#DC2626] dark:text-[#F87171]" role="alert" aria-live="polite">
            <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={helperTextId} className="text-xs text-[#64748B] dark:text-[#9CA3AF]">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
export { Input };
