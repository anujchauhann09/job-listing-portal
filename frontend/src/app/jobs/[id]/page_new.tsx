'use client';

import React, { useState, useEffect } from 'react';
import { Container } from '@/components/ui/Container';
import { JobDetail } from '@/components/jobs';
import { JobApplicationForm } from '@/components/applications';
import { Job } from '@/types/job';
import { jobService } from '@/services/jobs';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Loader2 } from 'lucide-react';

interface JobDetailPageProps {
  params: {
    id: string;
  };
}

export default function JobDetailPage({ params }: JobDetailPageProps) {
  const router = useRouter();
  const { user } = useAuth();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);

  useEffect(() => {
    loadJob();
  }, [params.id]);

  const loadJob = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await jobService.getJobByUuid(params.id);
      
      if (response.success && response.data) {
        setJob(response.data);
      } else {
        setError('Job not found');
      }
    } catch (err: any) {
      console.error('Error loading job:', err);
      setError(err.message || 'Failed to load job');
    } finally {
      setLoading(false);
    }
  };

  const handleApply = () => {
    if (!user) {
      router.push('/auth/login');
      return;
    }
    setShowApplicationForm(true);
  };

  const handleApplicationSubmit = async (data: { coverLetter?: string; resumeFile?: File }) => {
    // This will be handled by the application service
    console.log('Application submitted:', data);
    setShowApplicationForm(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900">
        <Container className="py-12">
          <div className="bg-error-50 border border-error-200 rounded-lg p-6 dark:bg-error-900/20 dark:border-error-800">
            <h2 className="text-xl font-semibold text-error-900 dark:text-error-100 mb-2">
              Job Not Found
            </h2>
            <p className="text-error-600 dark:text-error-400 mb-4">
              {error || 'The job you are looking for does not exist or has been removed.'}
            </p>
            <button
              onClick={() => router.push('/jobs')}
              className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
            >
              ← Back to Jobs
            </button>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900">
      <Container className="py-8">
        <JobDetail
          job={job}
          onApply={handleApply}
          onBack={() => router.push('/jobs')}
        />

        {showApplicationForm && (
          <JobApplicationForm
            job={job}
            isOpen={showApplicationForm}
            onClose={() => setShowApplicationForm(false)}
            onSubmit={handleApplicationSubmit}
            loading={false}
            userResumeUrl={user?.role === 'job-seeker' && 'resumeUrl' in user.profile ? user.profile.resumeUrl : undefined}
          />
        )}
      </Container>
    </div>
  );
}
