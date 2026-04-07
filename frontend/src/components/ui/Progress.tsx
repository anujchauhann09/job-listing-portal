import React from 'react';
import { cn } from '@/lib/utils';

interface ProgressProps {
  value: number;
  max?: number;
  className?: string;
  showLabel?: boolean;
  size?: 'sm' | 'md';
  color?: 'primary' | 'success' | 'warning';
}

export function Progress({ value, max = 100, className, showLabel = false, size = 'md', color = 'primary' }: ProgressProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));

  const colors = {
    primary: 'bg-[#2563EB]',
    success: 'bg-[#16A34A]',
    warning: 'bg-[#D97706]',
  };

  const heights = { sm: 'h-1', md: 'h-1.5' };

  return (
    <div className={cn('w-full', className)}>
      {showLabel && (
        <div className="flex justify-between mb-1">
          <span className="text-xs text-[#64748B] dark:text-[#9CA3AF]">Progress</span>
          <span className="text-xs font-medium text-[#0F172A] dark:text-[#E5E7EB]">{Math.round(pct)}%</span>
        </div>
      )}
      <div className={cn('w-full bg-[#F1F5F9] dark:bg-[#1F2937] rounded-full overflow-hidden', heights[size])}>
        <div
          className={cn('h-full rounded-full transition-all duration-500', colors[color])}
          style={{ width: `${pct}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        />
      </div>
    </div>
  );
}
