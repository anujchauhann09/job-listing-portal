'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { notFound } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { JobDetail } from '@/components/jobs/JobDetail';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { Job } from '@/types/job';
import { jobService } from '@/services/jobs';
import { ArrowLeft, Edit, Trash2 } from 'lucide-react';

interface EmployerJobViewPageProps {
  params: Promise<{ id: string }>;
}

export default function EmployerJobViewPage({ params }: EmployerJobViewPageProps) {
  const { id } = React.use(params);
  const router = useRouter();
  const [job, setJob] = React.useState<Job | null>(null);
  const [pageLoading, setPageLoading] = React.useState(true);
  const [notFoundFlag, setNotFoundFlag] = React.useState(false);
  const [deleting, setDeleting] = React.useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = React.useState(false);

  React.useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await jobService.getEmployerJobByUuid(id);
        if (response.success && response.data) {
          setJob(response.data);
        } else {
          setNotFoundFlag(true);
        }
      } catch {
        setNotFoundFlag(true);
      } finally {
        setPageLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const response = await jobService.deleteJob(id);
      if (response.success) {
        router.push('/dashboard/employer');
      } else {
        alert('Failed to delete job. Please try again.');
      }
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to delete job');
    } finally {
      setDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  if (pageLoading) {
    return (
      <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-4" />
          <p className="text-secondary-600 dark:text-secondary-400">Loading job...</p>
        </div>
      </div>
    );
  }

  if (notFoundFlag || !job) notFound();

  return (
    <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900">
      <Container className="py-8">
        {/* Top action bar */}
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={() => router.push('/dashboard/employer')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => router.push(`/dashboard/employer/jobs/${id}/edit`)}
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowDeleteConfirm(true)}
              className="text-error-600 border-error-300 hover:bg-error-50 dark:text-error-400 dark:border-error-700 dark:hover:bg-error-900/20"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </div>
        </div>

        <JobDetail
          job={job!}
          showApplyButton={false}
          showManageButtons={false}
        />

        <ConfirmDialog
          isOpen={showDeleteConfirm}
          onClose={() => setShowDeleteConfirm(false)}
          onConfirm={handleDelete}
          title="Delete Job Posting"
          message={`Are you sure you want to delete "${job!.title}"? This action cannot be undone and will remove all associated data.`}
          confirmText="Delete Job"
          cancelText="Cancel"
          variant="danger"
          loading={deleting}
        />
      </Container>
    </div>
  );
}
