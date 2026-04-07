import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  asChild?: boolean;
  children: React.ReactNode;
  loadingText?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading = false, disabled,
     asChild = false, children, loadingText, type = 'button', onClick, onKeyDown, ...props }, ref) => {

    const base = 'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none';

    const variants = {
      primary:   'bg-[#2563EB] text-white hover:bg-[#1D4ED8] active:bg-[#1E40AF] shadow-sm',
      secondary: 'bg-[#F1F5F9] text-[#0F172A] hover:bg-[#E2E8F0] active:bg-[#CBD5E1] dark:bg-[#1F2937] dark:text-[#E5E7EB] dark:hover:bg-[#374151]',
      outline:   'border border-[#E2E8F0] bg-transparent text-[#374151] hover:bg-[#F8FAFC] hover:border-[#CBD5E1] dark:border-[#374151] dark:text-[#D1D5DB] dark:hover:bg-[#1F2937]',
      ghost:     'bg-transparent text-[#475569] hover:bg-[#F1F5F9] hover:text-[#0F172A] dark:text-[#9CA3AF] dark:hover:bg-[#1F2937] dark:hover:text-[#E5E7EB]',
      danger:    'bg-[#DC2626] text-white hover:bg-[#B91C1C] active:bg-[#991B1B] shadow-sm',
    };

    const sizes = {
      sm: 'h-8 px-3 text-sm gap-1.5',
      md: 'h-9 px-4 text-sm gap-2',
      lg: 'h-11 px-5 text-base gap-2',
    };

    const classes = cn(base, variants[variant], sizes[size], className);
    const isDisabled = disabled || loading;

    const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if ((event.key === 'Enter' || event.key === ' ') && !isDisabled) {
        event.preventDefault();
        onClick?.(event as any);
      }
      onKeyDown?.(event);
    };

    if (asChild) {
      const child = children as React.ReactElement<any>;
      return React.cloneElement(child, { className: cn(child.props?.className, classes), ref, 'aria-disabled': isDisabled });
    }

    return (
      <button
        className={classes}
        ref={ref}
        disabled={isDisabled}
        type={type}
        onClick={onClick}
        onKeyDown={handleKeyDown}
        aria-disabled={isDisabled}
        {...props}
      >
        {loading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
        {loading && loadingText ? loadingText : children}
      </button>
    );
  }
);

Button.displayName = 'Button';
export { Button };
