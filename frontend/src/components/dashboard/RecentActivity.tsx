'use client';

import Link from 'next/link';
import { ApplicationStatus } from '@/types/job';
import { cn } from '@/lib/utils';
import { APPLICATION_STATUS_CONFIG } from '@/lib/constants';
import { EmptyState } from '@/components/ui/EmptyState';
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
        <EmptyState
          icon={Briefcase}
          title="No applications yet"
          description="Start applying to jobs to track them here"
          action={
            <Link href="/jobs" className="text-xs font-medium text-[#2563EB] hover:text-[#1D4ED8] dark:text-[#60A5FA] transition-colors">
              Browse Jobs
            </Link>
          }
        />
      ) : (
        <div className="divide-y divide-[#F1F5F9] dark:divide-[#1F2937]">
          {recent.map(app => {
            const status = APPLICATION_STATUS_CONFIG[app.status] || APPLICATION_STATUS_CONFIG.APPLIED;
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
                  <span className={cn('inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium', status.badgeClass)}>
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
