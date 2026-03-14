'use client';

import React from 'react';
import { Container } from '@/components/ui/Container';
import { JobPostingForm } from '@/components/jobs';
import { JobPostingFormData } from '@/validators/job';
import { Job } from '@/types/job';
import { useRouter } from 'next/navigation';
import { notFound } from 'next/navigation';
import { jobService } from '@/services/jobs';
import { Button } from '@/components/ui/Button';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { ArrowLeft, Trash2 } from 'lucide-react';

interface EditJobPageProps {
  params: Promise<{ id: string }>;
}

export default function EditJobPage({ params }: EditJobPageProps) {
  const { id } = React.use(params);
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [deleting, setDeleting] = React.useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = React.useState(false);
  const [job, setJob] = React.useState<Job | null>(null);
  const [pageLoading, setPageLoading] = React.useState(true);
  const [notFoundFlag, setNotFoundFlag] = React.useState(false);

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

  const handleSubmit = async (data: JobPostingFormData) => {
    setLoading(true);
    try {
      const response = await jobService.updateJob(id, {
        title: data.title,
        description: data.description,
        qualifications: data.qualifications,
        responsibilities: data.responsibilities,
        location: data.location,
        jobType: data.jobType,
        experienceLevel: data.experienceLevel,
        remoteType: data.remoteType,
        salaryMin: data.salaryMin,
        salaryMax: data.salaryMax,
        salaryCurrency: data.salaryCurrency,
        salaryPeriod: data.salaryPeriod,
        status: data.status,
        skills: data.skills,
      });

      if (response.success) {
        router.push('/dashboard/employer');
      } else {
        alert('Failed to update job. Please try again.');
      }
    } catch (error) {
      console.error('Error updating job:', error);
      alert(error instanceof Error ? error.message : 'Failed to update job');
    } finally {
      setLoading(false);
    }
  };

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
          <p className="text-secondary-600 dark:text-secondary-400">Loading job details...</p>
        </div>
      </div>
    );
  }

  if (notFoundFlag || !job) {
    notFound();
  }

  const initialData: Partial<JobPostingFormData> = {
    title: job!.title,
    description: job!.description,
    qualifications: job!.qualifications,
    responsibilities: job!.responsibilities,
    location: job!.location,
    jobType: job!.jobType,
    experienceLevel: job!.experienceLevel,
    remoteType: job!.remoteType,
    salaryMin: job!.salaryMin,
    salaryMax: job!.salaryMax,
    salaryCurrency: job!.salaryCurrency,
    salaryPeriod: job!.salaryPeriod,
    status: job!.status,
    skills: job!.skills?.map((s) => s.skill.name) ?? [],
  };

  return (
    <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900">
      <Container className="py-8">
        <div className="mb-6 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => router.push(`/dashboard/employer/jobs/${id}`)}>
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100">
                Edit Job Posting
              </h1>
              <p className="text-secondary-600 dark:text-secondary-400 mt-1">
                Update your job posting details. Changes will preserve existing applications.
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={() => setShowDeleteConfirm(true)}
            loading={deleting}
            className="text-error-600 border-error-300 hover:bg-error-50 dark:text-error-400 dark:border-error-700 dark:hover:bg-error-900/20"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Job
          </Button>
        </div>

        <JobPostingForm
          initialData={initialData}
          onSubmit={handleSubmit}
          loading={loading}
          mode="edit"
        />

        <ConfirmDialog
          isOpen={showDeleteConfirm}
          onClose={() => setShowDeleteConfirm(false)}
          onConfirm={handleDelete}
          title="Delete Job Posting"
          message={`Are you sure you want to delete "${job!.title}"? This action cannot be undone.`}
          confirmText="Delete Job"
          cancelText="Cancel"
          variant="danger"
          loading={deleting}
        />
      </Container>
    </div>
  );
}