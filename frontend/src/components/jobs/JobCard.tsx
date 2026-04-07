import React from 'react';
import { Badge } from '@/components/ui/Badge';
import { Job } from '@/types/job';
import { MapPin, Calendar, DollarSign, Building2, Briefcase, Wifi } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatJobType, formatExperienceLevel, formatRemoteType, formatSalary, formatPostedDate, getSkillNames } from '@/lib/jobUtils';

export interface JobCardProps {
  job: Job;
  actions?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  showEmployer?: boolean;
}

const JOB_TYPE_BADGE: Record<string, string> = {
  FULL_TIME:  'bg-[#EFF6FF] text-[#2563EB] dark:bg-[#1E3A8A]/30 dark:text-[#93C5FD]',
  PART_TIME:  'bg-[#FFFBEB] text-[#D97706] dark:bg-[#78350F]/30 dark:text-[#FCD34D]',
  CONTRACT:   'bg-[#F5F3FF] text-[#7C3AED] dark:bg-[#4C1D95]/30 dark:text-[#C4B5FD]',
  INTERNSHIP: 'bg-[#F0FDF4] text-[#16A34A] dark:bg-[#14532D]/30 dark:text-[#4ADE80]',
};

export const JobCard: React.FC<JobCardProps> = ({ job, actions, onClick, className, showEmployer = true }) => {
  const skills = getSkillNames(job);
  const badgeClass = JOB_TYPE_BADGE[job.jobType] || 'bg-[#F1F5F9] text-[#475569]';

  return (
    <div
      className={cn(
        'group relative bg-white dark:bg-[#111827] rounded-xl border border-[#E2E8F0] dark:border-[#1F2937]',
        'transition-all duration-200',
        'hover:border-[#BFDBFE] dark:hover:border-[#1E3A8A] hover:shadow-hover hover:-translate-y-0.5',
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); } } : undefined}
    >
      <div className="p-5">
        {/* Header row */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-[15px] font-semibold text-[#0F172A] dark:text-[#E5E7EB] leading-snug line-clamp-1 group-hover:text-[#2563EB] dark:group-hover:text-[#60A5FA] transition-colors">
              {job.title}
            </h3>
            {showEmployer && job.employer && (
              <div className="flex items-center gap-1.5 mt-1">
                <Building2 className="h-3.5 w-3.5 text-[#94A3B8] shrink-0" aria-hidden="true" />
                <span className="text-sm text-[#64748B] dark:text-[#9CA3AF] truncate">{job.employer.companyName}</span>
                {job.employer.industry && (
                  <span className="text-[#CBD5E1] dark:text-[#374151]">·</span>
                )}
                {job.employer.industry && (
                  <span className="text-xs text-[#94A3B8] dark:text-[#6B7280] truncate">{job.employer.industry}</span>
                )}
              </div>
            )}
          </div>
          <span className={cn('shrink-0 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium', badgeClass)}>
            {formatJobType(job.jobType)}
          </span>
        </div>

        <div className="flex flex-wrap gap-x-4 gap-y-1.5 mb-3">
          <span className="flex items-center gap-1 text-xs text-[#64748B] dark:text-[#9CA3AF]">
            <MapPin className="h-3.5 w-3.5 text-[#94A3B8]" aria-hidden="true" />
            {job.location}
          </span>
          <span className="flex items-center gap-1 text-xs text-[#64748B] dark:text-[#9CA3AF]">
            <Wifi className="h-3.5 w-3.5 text-[#94A3B8]" aria-hidden="true" />
            {formatRemoteType(job.remoteType)}
          </span>
          <span className="flex items-center gap-1 text-xs text-[#64748B] dark:text-[#9CA3AF]">
            <Briefcase className="h-3.5 w-3.5 text-[#94A3B8]" aria-hidden="true" />
            {formatExperienceLevel(job.experienceLevel)}
          </span>
          {(job.salaryMin || job.salaryMax) && (
            <span className="flex items-center gap-1 text-xs font-medium text-[#16A34A] dark:text-[#4ADE80]">
              <DollarSign className="h-3.5 w-3.5" aria-hidden="true" />
              {formatSalary(job.salaryMin, job.salaryMax, job.salaryCurrency, job.salaryPeriod)}
            </span>
          )}
          <span className="flex items-center gap-1 text-xs text-[#94A3B8] dark:text-[#6B7280] ml-auto">
            <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
            {formatPostedDate(job.createdAt)}
          </span>
        </div>

        {skills.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {skills.slice(0, 4).map((skill, i) => (
              <span key={i} className="inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium bg-[#F8FAFC] text-[#475569] border border-[#E2E8F0] dark:bg-[#1F2937] dark:text-[#9CA3AF] dark:border-[#374151]">
                {skill}
              </span>
            ))}
            {skills.length > 4 && (
              <span className="inline-flex items-center rounded-md px-2 py-0.5 text-xs text-[#94A3B8] dark:text-[#6B7280]">
                +{skills.length - 4}
              </span>
            )}
          </div>
        )}
      </div>

      {actions && (
        <div className="px-5 pb-4 pt-0 border-t border-[#F1F5F9] dark:border-[#1F2937] mt-0">
          <div className="pt-3">{actions}</div>
        </div>
      )}
    </div>
  );
};
