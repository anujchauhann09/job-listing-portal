'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { JobManagement } from '@/components/jobs/JobManagement';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { Job, JobStatus } from '@/types/job';
import { jobService } from '@/services/jobs';

export default function DashboardJobsPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<Job | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (user?.role === 'employer') fetchJobs();
  }, [user]);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const res = await jobService.getEmployerJobs();
      if (res.success && res.data) setJobs(res.data);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (jobUuid: string, newStatus: JobStatus) => {
    await jobService.updateJob(jobUuid, { status: newStatus });
    setJobs((prev) =>
      prev.map((j) => (j.uuid === jobUuid ? { ...j, status: newStatus } : j))
    );
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const res = await jobService.deleteJob(deleteTarget.uuid);
      if (res.success) {
        setJobs((prev) => prev.filter((j) => j.uuid !== deleteTarget.uuid));
        setDeleteTarget(null);
      }
    } finally {
      setDeleting(false);
    }
  };

  if (!user || user.role !== 'employer') {
    return (
      <div className="flex items-center justify-center py-20 text-secondary-500 dark:text-secondary-400">
        This page is only accessible to employers.
      </div>
    );
  }

  return (
    <div className="p-6">
      <JobManagement
        jobs={jobs}
        loading={loading}
        onCreateJob={() => router.push('/dashboard/employer/jobs/new')}
        onViewJob={(uuid) => router.push(`/dashboard/employer/jobs/${uuid}`)}
        onEditJob={(uuid) => router.push(`/dashboard/employer/jobs/${uuid}/edit`)}
        onUpdateStatus={handleUpdateStatus}
        onDeleteJob={(uuid) => {
          const job = jobs.find((j) => j.uuid === uuid) ?? null;
          setDeleteTarget(job);
        }}
      />

      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Job Posting"
        message={`Are you sure you want to delete "${deleteTarget?.title}"? This cannot be undone.`}
        confirmText="Delete Job"
        cancelText="Cancel"
        variant="danger"
        loading={deleting}
      />
    </div>
  );
}
