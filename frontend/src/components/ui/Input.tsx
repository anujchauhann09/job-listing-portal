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

    const baseStyles = 'flex h-10 w-full rounded-lg border border-secondary-300 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-secondary-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-secondary-600 dark:bg-secondary-900 dark:ring-offset-secondary-900 dark:placeholder:text-secondary-400 dark:focus-visible:ring-primary-400';
    
    const errorStyles = error ? 'border-error-500 focus-visible:ring-error-500 dark:border-error-400 dark:focus-visible:ring-error-400' : '';

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    return (
      <div className="space-y-2">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium leading-none text-secondary-900 dark:text-secondary-100 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {label}
            {required && (
              <span className="text-error-500 ml-1" aria-label="required">
                *
              </span>
            )}
          </label>
        )}
        <div className="relative">
          <input
            type={inputType}
            className={cn(
              baseStyles,
              errorStyles,
              isPassword && showPasswordToggle && 'pr-10',
              className
            )}
            ref={ref}
            id={inputId}
            required={required}
            aria-required={required ? 'true' : undefined}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={cn(
              error && errorId,
              helperText && helperTextId
            )}
            {...props}
          />
          {isPassword && showPasswordToggle && (
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-secondary-500 hover:text-secondary-700 dark:text-secondary-400 dark:hover:text-secondary-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-md"
              onClick={togglePasswordVisibility}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              tabIndex={0}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Eye className="h-4 w-4" aria-hidden="true" />
              )}
            </button>
          )}
          {error && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <AlertCircle className="h-4 w-4 text-error-500" aria-hidden="true" />
            </div>
          )}
        </div>
        {error && (
          <p 
            id={errorId}
            className="text-sm text-error-600 dark:text-error-400 flex items-center"
            role="alert"
            aria-live="polite"
          >
            <AlertCircle className="h-4 w-4 mr-1 flex-shrink-0" aria-hidden="true" />
            {error}
          </p>
        )}
        {helperText && !error && (
          <p 
            id={helperTextId}
            className="text-sm text-secondary-600 dark:text-secondary-400"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };