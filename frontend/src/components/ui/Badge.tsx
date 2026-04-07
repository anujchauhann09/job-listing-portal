import React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'outline';
  size?: 'sm' | 'md';
  children: React.ReactNode;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', size = 'sm', children, ...props }, ref) => {
    const base = 'inline-flex items-center rounded-full font-medium leading-none';

    const variants = {
      default:   'bg-[#F1F5F9] text-[#475569] dark:bg-[#1F2937] dark:text-[#9CA3AF]',
      primary:   'bg-[#EFF6FF] text-[#2563EB] dark:bg-[#1E3A8A]/30 dark:text-[#93C5FD]',
      secondary: 'bg-[#F1F5F9] text-[#475569] dark:bg-[#1F2937] dark:text-[#9CA3AF]',
      success:   'bg-[#F0FDF4] text-[#16A34A] dark:bg-[#14532D]/30 dark:text-[#4ADE80]',
      warning:   'bg-[#FFFBEB] text-[#D97706] dark:bg-[#78350F]/30 dark:text-[#FCD34D]',
      error:     'bg-[#FEF2F2] text-[#DC2626] dark:bg-[#7F1D1D]/30 dark:text-[#F87171]',
      outline:   'border border-[#E2E8F0] text-[#475569] dark:border-[#374151] dark:text-[#9CA3AF]',
    };

    const sizes = {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-2.5 py-1 text-sm',
    };

    return (
      <span ref={ref} className={cn(base, variants[variant], sizes[size], className)} {...props}>
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';
export { Badge };
