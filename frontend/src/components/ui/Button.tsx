import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  asChild?: boolean;
  children: React.ReactNode;
  loadingText?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = 'primary', 
    size = 'md', 
    loading = false, 
    disabled, 
    asChild = false, 
    children, 
    loadingText,
    type = 'button',
    onClick,
    onKeyDown,
    ...props 
  }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';
    
    const variants = {
      primary: 'bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800 focus-visible:ring-primary-500',
      secondary: 'bg-secondary-100 text-secondary-900 hover:bg-secondary-200 active:bg-secondary-300 dark:bg-secondary-800 dark:text-secondary-100 dark:hover:bg-secondary-700 focus-visible:ring-secondary-500',
      outline: 'border border-secondary-300 bg-transparent text-secondary-700 hover:bg-secondary-50 active:bg-secondary-100 dark:border-secondary-600 dark:text-secondary-300 dark:hover:bg-secondary-800 focus-visible:ring-secondary-500',
      ghost: 'bg-transparent text-secondary-700 hover:bg-secondary-100 active:bg-secondary-200 dark:text-secondary-300 dark:hover:bg-secondary-800 focus-visible:ring-secondary-500',
    };

    const sizes = {
      sm: 'h-9 px-3 text-sm min-w-[2.25rem]',
      md: 'h-10 px-4 text-base min-w-[2.5rem]',
      lg: 'h-12 px-6 text-lg min-w-[3rem]',
    };

    const classes = cn(
      baseStyles,
      variants[variant],
      sizes[size],
      className
    );

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
      return React.cloneElement(child, {
        className: cn(child.props?.className, classes),
        ref,
        'aria-disabled': isDisabled,
      });
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
        aria-describedby={loading ? `${props.id || 'button'}-loading` : undefined}
        {...props}
      >
        {loading && (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
            <span className="sr-only" id={`${props.id || 'button'}-loading`}>
              Loading
            </span>
          </>
        )}
        {loading && loadingText ? loadingText : children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };