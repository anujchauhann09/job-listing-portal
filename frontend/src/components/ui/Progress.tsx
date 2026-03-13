'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface ProgressProps {
  value: number;
  max?: number;
  variant?: 'primary' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export type { ProgressProps };

const variantStyles = {
  primary: 'bg-primary-600',
  success: 'bg-success-600',
  warning: 'bg-warning-500',
  error: 'bg-error-600',
};

const sizeStyles = {
  sm: 'h-1',
  md: 'h-2',
  lg: 'h-3',
};

export function Progress({ 
  value, 
  max = 100, 
  variant = 'primary', 
  size = 'md',
  className 
}: ProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className={cn(
      'w-full bg-secondary-200 dark:bg-secondary-700 rounded-full overflow-hidden',
      sizeStyles[size],
      className
    )}>
      <div
        className={cn(
          'h-full transition-all duration-300 ease-in-out rounded-full',
          variantStyles[variant]
        )}
        style={{ width: `${percentage}%` }}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
      />
    </div>
  );
}