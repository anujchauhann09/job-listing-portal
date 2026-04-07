'use client';

import React from 'react';
import Link from 'next/link';
import { ApplicationStatus } from '@/types/job';
import { cn } from '@/lib/utils';
import { Briefcase, Building2, MapPin, ArrowRight } from 'lucide-react';

interface ActivityItem {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  appliedDate: Date;
  status: ApplicationStatus;
  jobId: string;
}

interface RecentActivityProps {
  applications: ActivityItem[];
}

const STATUS_CONFIG: Record<ApplicationStatus, { label: string; className: string }> = {
  APPLIED:     { label: 'Applied',     className: 'bg-[#EFF6FF] text-[#2563EB] dark:bg-[#1E3A8A]/20 dark:text-[#93C5FD]' },
  SHORTLISTED: { label: 'Shortlisted', className: 'bg-[#F0FDF4] text-[#16A34A] dark:bg-[#14532D]/20 dark:text-[#4ADE80]' },
  REJECTED:    { label: 'Rejected',    className: 'bg-[#FEF2F2] text-[#DC2626] dark:bg-[#7F1D1D]/20 dark:text-[#F87171]' },
  HIRED:       { label: 'Hired',       className: 'bg-[#F0FDF4] text-[#16A34A] dark:bg-[#14532D]/20 dark:text-[#4ADE80]' },
  WITHDRAWN:   { label: 'Withdrawn',   className: 'bg-[#F1F5F9] text-[#64748B] dark:bg-[#1F2937] dark:text-[#9CA3AF]' },
};

export function RecentActivity({ applications }: RecentActivityProps) {
  const recent = applications.slice(0, 5);

  return (
    <div className="bg-white dark:bg-[#111827] rounded-xl border border-[#E2E8F0] dark:border-[#1F2937]">
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#F1F5F9] dark:border-[#1F2937]">
        <h2 className="text-sm font-semibold text-[#0F172A] dark:text-[#E5E7EB]">Recent Applications</h2>
        <Link
          href="/dashboard/applications"
          className="flex items-center gap-1 text-xs text-[#2563EB] hover:text-[#1D4ED8] dark:text-[#60A5FA] transition-colors"
        >
          View all <ArrowRight className="h-3 w-3" aria-hidden="true" />
        </Link>
      </div>

      {recent.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center px-5">
          <div className="w-10 h-10 rounded-full bg-[#F1F5F9] dark:bg-[#1F2937] flex items-center justify-center mb-3">
            <Briefcase className="h-5 w-5 text-[#94A3B8]" aria-hidden="true" />
          </div>
          <p className="text-sm font-medium text-[#374151] dark:text-[#D1D5DB]">No applications yet</p>
          <p className="text-xs text-[#94A3B8] dark:text-[#6B7280] mt-1">Start applying to jobs to track them here</p>
          <Link
            href="/jobs"
            className="mt-4 text-xs font-medium text-[#2563EB] hover:text-[#1D4ED8] dark:text-[#60A5FA] transition-colors"
          >
            Browse Jobs →
          </Link>
        </div>
      ) : (
        <div className="divide-y divide-[#F1F5F9] dark:divide-[#1F2937]">
          {recent.map(app => {
            const status = STATUS_CONFIG[app.status] || STATUS_CONFIG.APPLIED;
            return (
              <div key={app.id} className="flex items-center gap-4 px-5 py-3.5 hover:bg-[#F8FAFC] dark:hover:bg-[#1F2937]/50 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-[#EFF6FF] dark:bg-[#1E3A8A]/20 flex items-center justify-center shrink-0">
                  <Briefcase className="h-4 w-4 text-[#2563EB] dark:text-[#60A5FA]" aria-hidden="true" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#0F172A] dark:text-[#E5E7EB] truncate">{app.jobTitle}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="flex items-center gap-1 text-xs text-[#64748B] dark:text-[#9CA3AF]">
                      <Building2 className="h-3 w-3" aria-hidden="true" />{app.company}
                    </span>
                    {app.location && (
                      <>
                        <span className="text-[#CBD5E1] dark:text-[#374151]">·</span>
                        <span className="flex items-center gap-1 text-xs text-[#94A3B8] dark:text-[#6B7280]">
                          <MapPin className="h-3 w-3" aria-hidden="true" />{app.location}
                        </span>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1 shrink-0">
                  <span className={cn('inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium', status.className)}>
                    {status.label}
                  </span>
                  <span className="text-xs text-[#94A3B8] dark:text-[#6B7280]">
                    {new Date(app.appliedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
