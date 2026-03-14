'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { JobPostingForm } from '@/components/jobs';
import { JobPostingFormData } from '@/validators/job';
import { jobService } from '@/services/jobs';
import { useAuth } from '@/context/AuthContext';

export default function NewJobPostingPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Redirect if not employer
  React.useEffect(() => {
    if (user && user.role !== 'employer') {
      router.push('/dashboard/job-seeker');
    }
  }, [user, router]);

  const handleSubmit = async (data: JobPostingFormData) => {
    try {
      setLoading(true);
      setError(null);

      const response = await jobService.createJob(data);

      if (response.success) {
        router.push('/dashboard/employer');
      } else {
        setError('Failed to create job posting');
      }
    } catch (err: any) {
      console.error('Error creating job:', err);
      setError(err.message || 'Failed to create job posting');
    } finally {
      setLoading(false);
    }
  };

  if (!user || user.role !== 'employer') {
    return null;
  }

  return (
    <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900">
      <Container className="py-8">
        {error && (
          <div className="mb-6 p-4 rounded-lg bg-error-50 border border-error-200 dark:bg-error-900/20 dark:border-error-800">
            <p className="text-error-600 dark:text-error-400">{error}</p>
          </div>
        )}

        <JobPostingForm
          onSubmit={handleSubmit}
          loading={loading}
          mode="create"
        />
      </Container>
    </div>
  );
}