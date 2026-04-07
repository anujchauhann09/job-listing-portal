import React from 'react';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: { value: number; label: string };
  className?: string;
}

export function StatsCard({ title, value, icon, trend, className }: StatsCardProps) {
  return (
    <div className={cn(
      'bg-white dark:bg-[#111827] rounded-xl border border-[#E2E8F0] dark:border-[#1F2937] p-5',
      className
    )}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-medium text-[#64748B] dark:text-[#9CA3AF] uppercase tracking-wide">{title}</p>
          <p className="text-2xl font-bold text-[#0F172A] dark:text-[#E5E7EB] mt-1 leading-none">{value}</p>
          {trend && (
            <p className={cn(
              'text-xs mt-1.5 font-medium',
              trend.value >= 0 ? 'text-[#16A34A] dark:text-[#4ADE80]' : 'text-[#DC2626] dark:text-[#F87171]'
            )}>
              {trend.value >= 0 ? '↑' : '↓'} {Math.abs(trend.value)}% {trend.label}
            </p>
          )}
        </div>
        {icon && (
          <div className="w-10 h-10 rounded-lg bg-[#EFF6FF] dark:bg-[#1E3A8A]/20 flex items-center justify-center shrink-0 text-[#2563EB] dark:text-[#60A5FA]">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
