'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { ProfileCompletion } from '@/components/dashboard/ProfileCompletion';
import { JobCard } from '@/components/jobs/JobCard';
import { Button } from '@/components/ui/Button';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { Job } from '@/types/job';
import { jobService } from '@/services/jobs';
import {
  Briefcase,
  Users,
  Eye,
  CheckCircle,
  Plus,
  Loader2,
  Inbox,
  Edit,
  Trash2,
} from 'lucide-react';
import Link from 'next/link';

export default function EmployerDashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Job | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (user && user.role === 'employer') loadJobs();
  }, [user]);

  const loadJobs = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await jobService.getEmployerJobs();
      if (response.success && response.data) {
        setJobs(response.data);
      } else {
        setError('Failed to load jobs');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load jobs');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const response = await jobService.deleteJob(deleteTarget.uuid);
      if (response.success) {
        setJobs((prev) => prev.filter((j) => j.uuid !== deleteTarget.uuid));
        setDeleteTarget(null);
      } else {
        alert('Failed to delete job. Please try again.');
      }
    } catch (err: any) {
      alert(err.message || 'Failed to delete job');
    } finally {
      setDeleting(false);
    }
  };

  if (!user || user.role !== 'employer') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-secondary-900 dark:text-secondary-100">Access Denied</h2>
          <p className="text-secondary-600 dark:text-secondary-400 mt-2">This page is only accessible to employers.</p>
        </div>
      </div>
    );
  }

  const getCompanyName = () => {
    if (user.role === 'employer' && 'companyName' in user.profile) {
      return user.profile.companyName || 'Your Company';
    }
    return 'Your Company';
  };

  const activeJobs = jobs.filter((job) => job.status === 'OPEN');

  return (
    <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DashboardHeader
          user={user}
          title={`Welcome back, ${getCompanyName()}!`}
          subtitle="Manage your job postings and track applications"
        />

        <div className="flex justify-center gap-6 mb-8">
          <div className="w-full max-w-xs">
            <StatsCard title="Active Jobs" value={activeJobs.length} icon={<Briefcase className="h-6 w-6" />} />
          </div>
          <div className="w-full max-w-xs">
            <StatsCard title="Total Jobs" value={jobs.length} icon={<Users className="h-6 w-6" />} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-secondary-800 rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-secondary-900 dark:text-secondary-100">
                  Your Job Postings
                </h2>
                <Button variant="primary" size="sm" asChild>
                  <Link href="/dashboard/employer/jobs/new">
                    <Plus className="h-4 w-4 mr-2" />
                    Post Job
                  </Link>
                </Button>
              </div>

              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
                </div>
              ) : error ? (
                <div className="bg-error-50 border border-error-200 rounded-lg p-4 dark:bg-error-900/20 dark:border-error-800">
                  <p className="text-error-600 dark:text-error-400">{error}</p>
                  <Button variant="outline" size="sm" onClick={loadJobs} className="mt-3">
                    Retry
                  </Button>
                </div>
              ) : jobs.length === 0 ? (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900/30 mb-4">
                    <Inbox className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-secondary-900 dark:text-secondary-100 mb-2">
                    No job postings yet
                  </h3>
                  <p className="text-secondary-600 dark:text-secondary-400 mb-6 max-w-md mx-auto">
                    Start attracting top talent by posting your first job opening.
                  </p>
                  <Button variant="primary" asChild>
                    <Link href="/dashboard/employer/jobs/new">
                      <Plus className="h-4 w-4 mr-2" />
                      Post Your First Job
                    </Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {jobs.map((job) => (
                    <JobCard
                      key={job.uuid}
                      job={job}
                      onClick={() => router.push(`/dashboard/employer/jobs/${job.uuid}`)}
                      showEmployer={false}
                      actions={
                        <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => router.push(`/dashboard/employer/jobs/${job.uuid}`)}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => router.push(`/dashboard/employer/jobs/${job.uuid}/edit`)}
                          >
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setDeleteTarget(job)}
                            className="text-error-600 border-error-300 hover:bg-error-50 dark:text-error-400 dark:border-error-700 dark:hover:bg-error-900/20"
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Delete
                          </Button>
                        </div>
                      }
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <ProfileCompletion steps={[]} userType="employer" />
          </div>
        </div>
      </div>

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
