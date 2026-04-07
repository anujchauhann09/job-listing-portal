import React from 'react';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
  icon: React.ElementType;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({ icon: Icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-16 text-center px-5', className)}>
      <div className="w-12 h-12 rounded-full bg-[#F1F5F9] dark:bg-[#1F2937] flex items-center justify-center mb-4">
        <Icon className="h-6 w-6 text-[#94A3B8]" aria-hidden="true" />
      </div>
      <p className="text-sm font-semibold text-[#0F172A] dark:text-[#E5E7EB] mb-1">{title}</p>
      {description && (
        <p className="text-xs text-[#64748B] dark:text-[#9CA3AF] max-w-xs">{description}</p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
