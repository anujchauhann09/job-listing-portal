'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { ApplicationDetail } from '@/components/applications';
import { applicationService } from '@/services/applications';
import { JobApplication, ApplicationStatus } from '@/types/job';

interface ApplicationDetailPageProps {
  params: {
    id: string;
  };
}

export default function ApplicationDetailPage({ params }: ApplicationDetailPageProps) {
  const router = useRouter();
  const [application, setApplication] = React.useState<JobApplication | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [updating, setUpdating] = React.useState(false);

  React.useEffect(() => {
    const loadApplication = async () => {
      try {
        const response = await applicationService.getApplication(params.id);
        
        if (response.success) {
          setApplication(response.data);
        } else {
          setError(response.message || 'Failed to load application');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load application');
      } finally {
        setLoading(false);
      }
    };

    loadApplication();
  }, [params.id]);

  const handleStatusChange = async (applicationId: string, newStatus: ApplicationStatus) => {
    setUpdating(true);
    
    try {
      const response = await applicationService.updateApplicationStatus({
        applicationId,
        status: newStatus
      });
      
      if (response.success) {
        setApplication(prev => prev ? { ...prev, status: newStatus } : null);
      } else {
        throw new Error(response.message || 'Failed to update status');
      }
    } catch (err) {
      console.error('Failed to update application status:', err);
      alert('Failed to update application status. Please try again.');
    } finally {
      setUpdating(false);
    }
  };

  const handleBack = () => {
    router.push('/dashboard/employer/applications');
  };

  if (loading) {
    return (
      <Container className="py-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-secondary-200 dark:bg-secondary-700 rounded w-1/3"></div>
          <div className="h-64 bg-secondary-200 dark:bg-secondary-700 rounded"></div>
          <div className="h-32 bg-secondary-200 dark:bg-secondary-700 rounded"></div>
        </div>
      </Container>
    );
  }

  if (error || !application) {
    return (
      <Container className="py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100 mb-4">
            Application Not Found
          </h1>
          <div className="bg-error-50 dark:bg-error-900/20 border border-error-200 dark:border-error-800 rounded-lg p-4 mb-6">
            <p className="text-error-700 dark:text-error-300">
              {error || 'The requested application could not be found.'}
            </p>
          </div>
          <button
            onClick={handleBack}
            className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
          >
            ← Back to Applications
          </button>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-8">
      <ApplicationDetail
        application={application}
        onStatusChange={handleStatusChange}
        onBack={handleBack}
        isEmployerView={true}
        loading={updating}
      />
    </Container>
  );
}