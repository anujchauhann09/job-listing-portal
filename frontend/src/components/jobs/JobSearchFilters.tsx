'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { JobSearchFilters as FiltersType } from '@/types/job';
import { MapPin, SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { JOB_TYPES, JOB_TYPE_LABELS } from '@/lib/constants';
import { cn } from '@/lib/utils';

export interface JobSearchFiltersProps {
  filters: FiltersType;
  onFiltersChange: (filters: FiltersType) => void;
  onSearch: () => void;
  loading?: boolean;
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'px-3 py-1.5 rounded-full text-xs font-medium border transition-all',
        active
          ? 'bg-[#2563EB] text-white border-[#2563EB]'
          : 'bg-white text-[#475569] border-[#E2E8F0] hover:border-[#93C5FD] hover:text-[#2563EB] dark:bg-[#111827] dark:text-[#9CA3AF] dark:border-[#374151] dark:hover:border-[#3B82F6]'
      )}
    >
      {children}
    </button>
  );
}

export const JobSearchFilters: React.FC<JobSearchFiltersProps> = ({
  filters, onFiltersChange, onSearch, loading = false,
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const update = <K extends keyof FiltersType>(key: K, value: FiltersType[K]) =>
    onFiltersChange({ ...filters, [key]: value });

  const clearAll = () =>
    onFiltersChange({ page: 1, limit: 10, sortBy: 'createdAt', sortOrder: 'desc' });

  const hasActiveFilters = Boolean(
    filters.location || filters.jobType || filters.salaryMin || filters.salaryMax
  );

  const activeCount = [filters.location, filters.jobType,
    (filters.salaryMin || filters.salaryMax) ? 'salary' : null].filter(Boolean).length;

  return (
    <div className="space-y-3">
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative sm:w-56">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#94A3B8] pointer-events-none" aria-hidden="true" />
          <input
            type="text"
            placeholder="Location"
            value={filters.location || ''}
            onChange={(e) => update('location', e.target.value || undefined)}
            onKeyDown={(e) => { if (e.key === 'Enter') { update('location', (e.target as HTMLInputElement).value || undefined); onSearch(); } }}
            className="w-full pl-9 pr-3 h-10 text-sm rounded-lg border border-[#E2E8F0] bg-white text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] dark:bg-[#111827] dark:border-[#374151] dark:text-[#E5E7EB] dark:placeholder:text-[#6B7280]"
          />
        </div>
        <Button onClick={onSearch} loading={loading} size="md" className="shrink-0 px-5">
          Search
        </Button>
        <button
          type="button"
          onClick={() => setShowAdvanced(v => !v)}
          className={cn(
            'shrink-0 flex items-center gap-1.5 px-3 h-9 rounded-lg text-sm font-medium border transition-colors',
            showAdvanced
              ? 'bg-[#EFF6FF] text-[#2563EB] border-[#BFDBFE] dark:bg-[#1E3A8A]/20 dark:text-[#60A5FA] dark:border-[#1E3A8A]'
              : 'bg-white text-[#475569] border-[#E2E8F0] hover:bg-[#F8FAFC] dark:bg-[#111827] dark:text-[#9CA3AF] dark:border-[#374151]'
          )}
        >
          <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
          <span className="hidden sm:inline">Filters</span>
          {activeCount > 0 && (
            <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-[#2563EB] text-white text-[10px] font-bold">
              {activeCount}
            </span>
          )}
          <ChevronDown className={cn('h-3.5 w-3.5 transition-transform', showAdvanced && 'rotate-180')} aria-hidden="true" />
        </button>
      </div>

      {showAdvanced && (
        <div className="bg-white dark:bg-[#111827] border border-[#E2E8F0] dark:border-[#1F2937] rounded-xl p-4 space-y-4 animate-slide-up">
          <div>
            <p className="text-xs font-semibold text-[#94A3B8] dark:text-[#6B7280] uppercase tracking-wider mb-2.5">Job Type</p>
            <div className="flex flex-wrap gap-2">
              {Object.entries(JOB_TYPES).map(([key, value]) => (
                <Chip
                  key={value}
                  active={filters.jobType === value}
                  onClick={() => update('jobType', filters.jobType === value ? undefined : (value as FiltersType['jobType']))}
                >
                  {JOB_TYPE_LABELS[key]}
                </Chip>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold text-[#94A3B8] dark:text-[#6B7280] uppercase tracking-wider mb-2.5">Salary Range</p>
            <div className="flex items-center gap-2">
              <input
                type="number"
                placeholder="Min"
                value={filters.salaryMin || ''}
                onChange={(e) => update('salaryMin', e.target.value ? Number(e.target.value) : undefined)}
                className="w-full h-9 px-3 text-sm rounded-lg border border-[#E2E8F0] bg-white text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#2563EB] dark:bg-[#111827] dark:border-[#374151] dark:text-[#E5E7EB]"
              />
              <span className="text-[#CBD5E1] dark:text-[#374151] shrink-0">—</span>
              <input
                type="number"
                placeholder="Max"
                value={filters.salaryMax || ''}
                onChange={(e) => update('salaryMax', e.target.value ? Number(e.target.value) : undefined)}
                className="w-full h-9 px-3 text-sm rounded-lg border border-[#E2E8F0] bg-white text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#2563EB] dark:bg-[#111827] dark:border-[#374151] dark:text-[#E5E7EB]"
              />
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold text-[#94A3B8] dark:text-[#6B7280] uppercase tracking-wider mb-2.5">Sort By</p>
            <div className="flex gap-2">
              {(['createdAt', 'salaryMin', 'salaryMax'] as const).map((field) => (
                <Chip key={field} active={filters.sortBy === field} onClick={() => update('sortBy', field)}>
                  {field === 'createdAt' ? 'Newest' : field === 'salaryMin' ? 'Salary ↑' : 'Salary ↓'}
                </Chip>
              ))}
            </div>
          </div>
        </div>
      )}

      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-1.5">
          {filters.location && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs bg-[#EFF6FF] text-[#2563EB] dark:bg-[#1E3A8A]/20 dark:text-[#93C5FD]">
              <MapPin className="h-3 w-3" />{filters.location}
              <button onClick={() => update('location', undefined)} className="hover:text-[#1D4ED8]"><X className="h-3 w-3" /></button>
            </span>
          )}
          {filters.jobType && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs bg-[#EFF6FF] text-[#2563EB] dark:bg-[#1E3A8A]/20 dark:text-[#93C5FD]">
              {JOB_TYPE_LABELS[filters.jobType]}
              <button onClick={() => update('jobType', undefined)} className="hover:text-[#1D4ED8]"><X className="h-3 w-3" /></button>
            </span>
          )}
          {(filters.salaryMin || filters.salaryMax) && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs bg-[#EFF6FF] text-[#2563EB] dark:bg-[#1E3A8A]/20 dark:text-[#93C5FD]">
              ${filters.salaryMin?.toLocaleString() ?? '0'} – ${filters.salaryMax?.toLocaleString() ?? '∞'}
              <button onClick={() => { update('salaryMin', undefined); update('salaryMax', undefined); }} className="hover:text-[#1D4ED8]"><X className="h-3 w-3" /></button>
            </span>
          )}
          <button onClick={clearAll} className="text-xs text-[#94A3B8] hover:text-[#64748B] dark:hover:text-[#9CA3AF] underline underline-offset-2">
            Clear all
          </button>
        </div>
      )}
    </div>
  );
};
