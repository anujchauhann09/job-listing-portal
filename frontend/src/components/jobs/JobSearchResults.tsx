import React from 'react';
import { JobCard } from './JobCard';
import { Button } from '@/components/ui/Button';
import { Job, SearchResults } from '@/types/job';
import { Loader2, Search, Briefcase } from 'lucide-react';

export interface JobSearchResultsProps {
  results: SearchResults<Job>;
  loading?: boolean;
  onJobClick: (job: Job) => void;
  onLoadMore?: () => void;
  onApplyToJob?: (jobId: string) => void;
  showApplyButton?: boolean;
}

export const JobSearchResults: React.FC<JobSearchResultsProps> = ({
  results, loading = false, onJobClick, onLoadMore, onApplyToJob, showApplyButton = false,
}) => {
  if (loading && results.items.length === 0) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-7 w-7 animate-spin text-[#2563EB]" aria-hidden="true" />
      </div>
    );
  }

  if (!loading && results.items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-14 h-14 rounded-full bg-[#F1F5F9] dark:bg-[#1F2937] flex items-center justify-center mb-4">
          <Search className="h-7 w-7 text-[#94A3B8]" aria-hidden="true" />
        </div>
        <h3 className="text-base font-semibold text-[#0F172A] dark:text-[#E5E7EB] mb-1">No jobs found</h3>
        <p className="text-sm text-[#64748B] dark:text-[#9CA3AF] max-w-sm">
          Try adjusting your search terms or removing some filters.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-sm text-[#64748B] dark:text-[#9CA3AF]">
          <Briefcase className="h-4 w-4" aria-hidden="true" />
          <span className="font-medium text-[#0F172A] dark:text-[#E5E7EB]">{results.total.toLocaleString()}</span>
          job{results.total !== 1 ? 's' : ''} found
        </div>
        {results.total > 0 && (
          <span className="text-xs text-[#94A3B8] dark:text-[#6B7280]">
            Showing {results.items.length} of {results.total}
          </span>
        )}
      </div>

      <div className="space-y-3">
        {results.items.map(job => (
          <JobCard
            key={job.uuid}
            job={job}
            onClick={() => onJobClick(job)}
            actions={showApplyButton && onApplyToJob ? (
              <Button size="sm" onClick={e => { e.stopPropagation(); onApplyToJob(job.uuid); }}>
                Apply Now
              </Button>
            ) : undefined}
          />
        ))}
      </div>

      {results.hasMore && onLoadMore && (
        <div className="flex justify-center pt-4">
          <Button variant="outline" onClick={onLoadMore} loading={loading} disabled={loading}>
            {loading ? 'Loading...' : 'Load More Jobs'}
          </Button>
        </div>
      )}
    </div>
  );
};
