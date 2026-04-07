'use client';

import { useState, useEffect, useRef } from 'react';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { JobSearchFilters } from '@/components/jobs/JobSearchFilters';
import { JobSearchResults } from '@/components/jobs/JobSearchResults';
import { Job, JobSearchFilters as FiltersType } from '@/types/job';
import { jobService } from '@/services/jobs';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Loader2 } from 'lucide-react';

const DEFAULT_FILTERS: FiltersType = {
  page: 1,
  limit: 10,
  sortBy: 'createdAt',
  sortOrder: 'desc',
};

export default function JobsPage() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FiltersType>(DEFAULT_FILTERS);
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

  useEffect(() => { loadJobs(DEFAULT_FILTERS); }, []);

  const handleFiltersChange = (newFilters: FiltersType) => {
    filtersRef.current = newFilters;
    setFilters(newFilters);
  };

  const handleSearch = () => loadJobs(filtersRef.current);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] dark:bg-[#0B0F19]">
      <Header user={user} onLogout={logout} />

      <main className="flex-1">
        <div className="bg-white dark:bg-[#0F172A] border-b border-[#E2E8F0] dark:border-[#1F2937]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-2xl font-bold text-[#0F172A] dark:text-[#E5E7EB] mb-1">
              Find Your Next Opportunity
            </h1>
            <p className="text-sm text-[#64748B] dark:text-[#9CA3AF]">
              Browse job listings from top companies
            </p>
            <div className="mt-5">
              <JobSearchFilters
                filters={filters}
                onFiltersChange={handleFiltersChange}
                onSearch={handleSearch}
                loading={loading}
              />
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-7 h-7 animate-spin text-[#2563EB]" />
            </div>
          ) : error ? (
            <div className="bg-[#FEF2F2] border border-[#FECACA] rounded-xl p-4 dark:bg-[#7F1D1D]/20 dark:border-[#7F1D1D]">
              <p className="text-sm text-[#DC2626] dark:text-[#F87171]">{error}</p>
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
        </div>
      </main>

      <Footer />
    </div>
  );
}
