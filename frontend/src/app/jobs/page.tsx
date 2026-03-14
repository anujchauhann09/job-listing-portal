'use client';

import { useState, useEffect, useRef } from 'react';
import { Container } from '@/components/ui/Container';
import { JobSearchFilters } from '@/components/jobs/JobSearchFilters';
import { JobSearchResults } from '@/components/jobs/JobSearchResults';
import { Job, JobSearchFilters as FiltersType } from '@/types/job';
import { jobService } from '@/services/jobs';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

const DEFAULT_FILTERS: FiltersType = {
  page: 1,
  limit: 10,
  sortBy: 'createdAt',
  sortOrder: 'desc',
};

export default function JobsPage() {
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FiltersType>(DEFAULT_FILTERS);

  // Always holds the latest filters — avoids stale closure in handleSearch
  const filtersRef = useRef<FiltersType>(DEFAULT_FILTERS);

  const loadJobs = async (activeFilters: FiltersType) => {
    try {
      setLoading(true);
      setError(null);
      const response = await jobService.getJobs(activeFilters);
      if (response.success && response.data) {
        setJobs(response.data);
      } else {
        setError('Failed to load jobs');
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to load jobs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJobs(DEFAULT_FILTERS);
  }, []);

  const handleFiltersChange = (newFilters: FiltersType) => {
    filtersRef.current = newFilters;
    setFilters(newFilters);
  };

  // Always reads from ref — never stale
  const handleSearch = () => loadJobs(filtersRef.current);

  return (
    <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900">
      <Container className="py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-secondary-900 dark:text-secondary-100 mb-1">
            Find Your Next Opportunity
          </h1>
          <p className="text-secondary-600 dark:text-secondary-400">
            Browse job listings from top companies
          </p>
        </div>

        <div className="mb-6">
          <JobSearchFilters
            filters={filters}
            onFiltersChange={handleFiltersChange}
            onSearch={handleSearch}
            loading={loading}
          />
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
          </div>
        ) : error ? (
          <div className="bg-error-50 border border-error-200 rounded-lg p-4 dark:bg-error-900/20 dark:border-error-800">
            <p className="text-error-600 dark:text-error-400">{error}</p>
          </div>
        ) : (
          <JobSearchResults
            results={{
              items: jobs,
              total: jobs.length,
              page: filters.page ?? 1,
              pageSize: filters.limit ?? 10,
              hasMore: jobs.length === (filters.limit ?? 10),
            }}
            onJobClick={(job) => router.push(`/jobs/${job.uuid}`)}
            loading={loading}
          />
        )}
      </Container>
    </div>
  );
}
