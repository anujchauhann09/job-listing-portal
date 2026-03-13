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
  results,
  loading = false,
  onJobClick,
  onLoadMore,
  onApplyToJob,
  showApplyButton = false,
}) => {
  if (loading && results.items.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary-600" />
          <p className="text-secondary-600 dark:text-secondary-400">Searching for jobs...</p>
        </div>
      </div>
    );
  }

  if (!loading && results.items.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center max-w-md">
          <Search className="h-12 w-12 mx-auto mb-4 text-secondary-400" />
          <h3 className="text-lg font-semibold text-secondary-900 dark:text-secondary-100 mb-2">
            No jobs found
          </h3>
          <p className="text-secondary-600 dark:text-secondary-400 mb-4">
            We couldn't find any jobs matching your search criteria. Try adjusting your filters or search terms.
          </p>
          <div className="space-y-2 text-sm text-secondary-500 dark:text-secondary-500">
            <p>• Try broader search terms</p>
            <p>• Remove some filters</p>
            <p>• Check your spelling</p>
            <p>• Try searching in different locations</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center text-secondary-600 dark:text-secondary-400">
          <Briefcase className="h-5 w-5 mr-2" />
          <span>
            {results.total.toLocaleString()} job{results.total !== 1 ? 's' : ''} found
          </span>
        </div>
        
        {results.total > 0 && (
          <div className="text-sm text-secondary-500 dark:text-secondary-500">
            Showing {results.items.length} of {results.total} jobs
          </div>
        )}
      </div>

      <div className="space-y-4">
        {results.items.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            onClick={() => onJobClick(job)}
            actions={showApplyButton && onApplyToJob ? (
              <Button
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onApplyToJob(job.id);
                }}
              >
                Apply Now
              </Button>
            ) : undefined}
          />
        ))}
      </div>

      {results.hasMore && onLoadMore && (
        <div className="flex justify-center pt-6">
          <Button
            variant="outline"
            onClick={onLoadMore}
            loading={loading}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Loading more jobs...
              </>
            ) : (
              'Load More Jobs'
            )}
          </Button>
        </div>
      )}

      {loading && results.items.length > 0 && (
        <div className="flex justify-center py-4">
          <div className="flex items-center text-secondary-600 dark:text-secondary-400">
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            <span>Loading more jobs...</span>
          </div>
        </div>
      )}
    </div>
  );
};