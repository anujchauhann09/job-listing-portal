'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { ApplicationList } from '@/components/applications';
import { useApplications } from '@/hooks';
import { ApplicationStatus } from '@/types/job';

export default function EmployerApplicationsPage() {
  const router = useRouter();
  const {
    applications,
    loading,
    error,
    updateApplicationStatus,
  } = useApplications();

  const handleStatusChange = async (applicationId: string, newStatus: ApplicationStatus) => {
    try {
      await updateApplicationStatus(applicationId, newStatus);
    } catch (err) {
      console.error('Failed to update application status:', err);
      alert('Failed to update application status. Please try again.');
    }
  };

  const handleViewApplication = (applicationId: string) => {
    router.push(`/dashboard/employer/applications/${applicationId}`);
  };

  if (error) {
    return (
      <Container className="py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100 mb-4">
            Applications
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
          Job Applications
        </h1>
        <p className="text-secondary-600 dark:text-secondary-400">
          Review and manage applications for your job postings
        </p>
      </div>

      <ApplicationList
        applications={applications}
        onStatusChange={handleStatusChange}
        onViewApplication={handleViewApplication}
        loading={loading}
      />
    </Container>
  );
}