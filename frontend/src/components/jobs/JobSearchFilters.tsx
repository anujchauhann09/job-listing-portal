'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { JobSearchFilters as FiltersType } from '@/types/job';
import { Search, MapPin, SlidersHorizontal, X } from 'lucide-react';
import { JOB_TYPES } from '@/lib/constants';
import { cn } from '@/lib/utils';

export interface JobSearchFiltersProps {
  filters: FiltersType;
  onFiltersChange: (filters: FiltersType) => void;
  onSearch: () => void;
  loading?: boolean;
}

const JOB_TYPE_LABELS: Record<string, string> = {
  FULL_TIME: 'Full Time',
  PART_TIME: 'Part Time',
  INTERNSHIP: 'Internship',
  CONTRACT: 'Contract',
};

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'px-3 py-2 rounded-full text-xs font-medium border transition-all min-h-[36px]',
        active
          ? 'bg-primary-600 text-white border-primary-600'
          : 'bg-white text-secondary-600 border-secondary-300 hover:border-primary-400 dark:bg-secondary-800 dark:text-secondary-300 dark:border-secondary-600'
      )}
    >
      {children}
    </button>
  );
}

export const JobSearchFilters: React.FC<JobSearchFiltersProps> = ({
  filters,
  onFiltersChange,
  onSearch,
  loading = false,
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const update = <K extends keyof FiltersType>(key: K, value: FiltersType[K]) =>
    onFiltersChange({ ...filters, [key]: value });

  const clearAll = () =>
    onFiltersChange({ page: 1, limit: 10, sortBy: 'createdAt', sortOrder: 'desc' });

  const hasActiveFilters = Boolean(
    filters.query || filters.location || filters.jobType || filters.salaryMin || filters.salaryMax
  );

  return (
    <div className="space-y-3">
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-secondary-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Job title or keyword..."
            value={filters.query || ''}
            onChange={(e) => update('query', e.target.value || undefined)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                update('query', (e.target as HTMLInputElement).value || undefined);
                onSearch();
              }
            }}
            className="w-full pl-9 pr-3 py-2.5 text-base rounded-lg border border-secondary-300 bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-secondary-800 dark:border-secondary-600 dark:text-secondary-100 dark:placeholder:text-secondary-500"
          />
        </div>
        <div className="relative sm:w-44">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-secondary-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Location"
            value={filters.location || ''}
            onChange={(e) => update('location', e.target.value || undefined)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                update('location', (e.target as HTMLInputElement).value || undefined);
                onSearch();
              }
            }}
            className="w-full pl-9 pr-3 py-2.5 text-base rounded-lg border border-secondary-300 bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-secondary-800 dark:border-secondary-600 dark:text-secondary-100 dark:placeholder:text-secondary-500"
          />
        </div>
        <Button onClick={onSearch} loading={loading} size="sm" className="shrink-0">
          Search
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="shrink-0"
          onClick={() => setShowAdvanced((v) => !v)}
        >
          <SlidersHorizontal className="h-4 w-4" />
        </Button>
      </div>

      {showAdvanced && (
        <div className="bg-white dark:bg-secondary-800 border border-secondary-200 dark:border-secondary-700 rounded-lg p-4 space-y-4">
          <div>
            <p className="text-xs font-semibold text-secondary-500 dark:text-secondary-400 uppercase tracking-wide mb-2">
              Job Type
            </p>
            <div className="flex flex-wrap gap-2">
              {Object.entries(JOB_TYPES).map(([key, value]) => (
                <FilterChip
                  key={value}
                  active={filters.jobType === value}
                  onClick={() => update('jobType', filters.jobType === value ? undefined : (value as FiltersType['jobType']))}
                >
                  {JOB_TYPE_LABELS[key]}
                </FilterChip>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold text-secondary-500 dark:text-secondary-400 uppercase tracking-wide mb-2">
              Salary Range
            </p>
            <div className="flex items-center gap-2">
              <input
                type="number"
                placeholder="Min"
                value={filters.salaryMin || ''}
                onChange={(e) => update('salaryMin', e.target.value ? Number(e.target.value) : undefined)}
                className="w-full px-3 py-2.5 text-base rounded-lg border border-secondary-300 bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-secondary-800 dark:border-secondary-600 dark:text-secondary-100"
              />
              <span className="text-secondary-400 text-sm shrink-0">–</span>
              <input
                type="number"
                placeholder="Max"
                value={filters.salaryMax || ''}
                onChange={(e) => update('salaryMax', e.target.value ? Number(e.target.value) : undefined)}
                className="w-full px-3 py-2.5 text-base rounded-lg border border-secondary-300 bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-secondary-800 dark:border-secondary-600 dark:text-secondary-100"
              />
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold text-secondary-500 dark:text-secondary-400 uppercase tracking-wide mb-2">
              Sort By
            </p>
            <div className="flex gap-2">
              {(['createdAt', 'salaryMin', 'salaryMax'] as const).map((field) => (
                <FilterChip
                  key={field}
                  active={filters.sortBy === field}
                  onClick={() => update('sortBy', field)}
                >
                  {field === 'createdAt' ? 'Newest' : field === 'salaryMin' ? 'Salary ↑' : 'Salary ↓'}
                </FilterChip>
              ))}
            </div>
          </div>
        </div>
      )}

      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2">
          {filters.query && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300">
              "{filters.query}"
              <button onClick={() => update('query', undefined)}><X className="h-3 w-3" /></button>
            </span>
          )}
          {filters.location && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300">
              📍 {filters.location}
              <button onClick={() => update('location', undefined)}><X className="h-3 w-3" /></button>
            </span>
          )}
          {filters.jobType && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300">
              {JOB_TYPE_LABELS[filters.jobType]}
              <button onClick={() => update('jobType', undefined)}><X className="h-3 w-3" /></button>
            </span>
          )}
          {(filters.salaryMin || filters.salaryMax) && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300">
              ${filters.salaryMin?.toLocaleString() ?? '0'} – ${filters.salaryMax?.toLocaleString() ?? '∞'}
              <button onClick={() => { update('salaryMin', undefined); update('salaryMax', undefined); }}><X className="h-3 w-3" /></button>
            </span>
          )}
          <button
            onClick={clearAll}
            className="text-xs text-secondary-500 hover:text-secondary-700 dark:hover:text-secondary-300 underline"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
};
