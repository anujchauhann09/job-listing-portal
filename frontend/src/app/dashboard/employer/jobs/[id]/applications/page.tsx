'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { ApplicationList } from '@/components/applications';
import { useApplications } from '@/hooks';
import { ApplicationStatus } from '@/types/job';
import { ArrowLeft } from 'lucide-react';

interface JobApplicationsPageProps {
  params: Promise<{ id: string }>;
}

export default function JobApplicationsPage({ params }: JobApplicationsPageProps) {
  const { id } = React.use(params);
  const router = useRouter();
  const {
    applications,
    loading,
    error,
    updateApplicationStatus,
  } = useApplications({ jobId: id });

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

  const handleBack = () => {
    router.push('/dashboard/employer');
  };

  if (error) {
    return (
      <Container className="py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100 mb-4">
            Job Applications
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

  const jobTitle = applications.length > 0 ? applications[0].job?.title : 'Job';

  return (
    <Container className="py-8">
      <div className="mb-8">
        <div className="flex items-center space-x-4 mb-4">
          <Button variant="ghost" size="sm" onClick={handleBack}>
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Dashboard
          </Button>
        </div>
        
        <h1 className="text-3xl font-bold text-secondary-900 dark:text-secondary-100 mb-2">
          Applications for {jobTitle}
        </h1>
        <p className="text-secondary-600 dark:text-secondary-400">
          Review and manage applications for this job posting
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