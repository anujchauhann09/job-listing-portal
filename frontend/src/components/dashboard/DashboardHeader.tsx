import React from 'react';
import { User } from '@/types/auth';

interface DashboardHeaderProps {
  user: User;
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export function DashboardHeader({ title, subtitle, actions }: DashboardHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-4 mb-6">
      <div>
        <h1 className="text-xl font-bold text-[#0F172A] dark:text-[#E5E7EB] leading-tight">{title}</h1>
        {subtitle && (
          <p className="text-sm text-[#64748B] dark:text-[#9CA3AF] mt-0.5">{subtitle}</p>
        )}
      </div>
      {actions && <div className="shrink-0">{actions}</div>}
    </div>
  );
}
