'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { MyApplications } from '@/components/applications';
import { useApplications } from '@/hooks';

export default function JobSeekerApplicationsPage() {
  const router = useRouter();
  const {
    applications,
    loading,
    error,
    withdrawApplication,
  } = useApplications();

  const handleWithdrawApplication = async (applicationId: string) => {
    if (window.confirm('Are you sure you want to withdraw this application? This action cannot be undone.')) {
      try {
        await withdrawApplication(applicationId);
      } catch (err) {
        console.error('Failed to withdraw application:', err);
        alert('Failed to withdraw application. Please try again.');
      }
    }
  };

  const handleViewJob = (jobId: string) => {
    router.push(`/jobs/${jobId}`);
  };

  if (error) {
    return (
      <Container className="py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100 mb-4">
            My Applications
          </h1>
          <div className="bg-error-50 dark:bg-error-900/20 border border-error-200 dark:border-error-800 rounded-lg p-4">
            <p className="text-error-700 dark:text-error-300">
              {error}
            </p>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-secondary-900 dark:text-secondary-100 mb-2">
          My Applications
        </h1>
        <p className="text-secondary-600 dark:text-secondary-400">
          Track the status of your job applications
        </p>
      </div>

      <MyApplications
        applications={applications}
        onWithdraw={handleWithdrawApplication}
        onViewJob={handleViewJob}
        loading={loading}
      />
    </Container>
  );
}