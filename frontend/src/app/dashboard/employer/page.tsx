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
import { Briefcase, Users, Plus, Loader2, Inbox, Edit, Trash2, Eye } from 'lucide-react';
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
      if (response.success && response.data) setJobs(response.data);
      else setError('Failed to load jobs');
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
        setJobs(prev => prev.filter(j => j.uuid !== deleteTarget.uuid));
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
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <h2 className="text-base font-semibold text-[#0F172A] dark:text-[#E5E7EB]">Access Denied</h2>
          <p className="text-sm text-[#64748B] dark:text-[#9CA3AF] mt-1">This page is only accessible to employers.</p>
        </div>
      </div>
    );
  }

  const getCompanyName = () => {
    if (user.role === 'employer' && 'companyName' in user.profile)
      return (user.profile as any).companyName || 'Your Company';
    return 'Your Company';
  };

  const activeJobs = jobs.filter(j => j.status === 'OPEN');

  return (
    <div className="space-y-6 animate-fade-in">
      <DashboardHeader
        user={user}
        title={`Welcome back, ${getCompanyName()}`}
        subtitle="Manage your job postings and track applications"
        actions={
          <Button size="sm" asChild>
            <Link href="/dashboard/employer/jobs/new">
              <Plus className="h-4 w-4" aria-hidden="true" />
              Post Job
            </Link>
          </Button>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <StatsCard title="Active Jobs" value={loading ? '—' : activeJobs.length} icon={<Briefcase className="h-5 w-5" />} />
        <StatsCard title="Total Jobs" value={loading ? '—' : jobs.length} icon={<Users className="h-5 w-5" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Job listings */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-[#111827] rounded-xl border border-[#E2E8F0] dark:border-[#1F2937]">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#F1F5F9] dark:border-[#1F2937]">
              <h2 className="text-sm font-semibold text-[#0F172A] dark:text-[#E5E7EB]">Your Job Postings</h2>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="w-6 h-6 animate-spin text-[#2563EB]" />
              </div>
            ) : error ? (
              <div className="p-5">
                <div className="bg-[#FEF2F2] border border-[#FECACA] rounded-lg p-4 dark:bg-[#7F1D1D]/20 dark:border-[#7F1D1D]">
                  <p className="text-sm text-[#DC2626] dark:text-[#F87171]">{error}</p>
                  <Button variant="outline" size="sm" onClick={loadJobs} className="mt-3">Retry</Button>
                </div>
              </div>
            ) : jobs.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 px-5 text-center">
                <div className="w-12 h-12 rounded-full bg-[#EFF6FF] dark:bg-[#1E3A8A]/20 flex items-center justify-center mb-4">
                  <Inbox className="w-6 h-6 text-[#2563EB] dark:text-[#60A5FA]" aria-hidden="true" />
                </div>
                <h3 className="text-sm font-semibold text-[#0F172A] dark:text-[#E5E7EB] mb-1">No job postings yet</h3>
                <p className="text-xs text-[#64748B] dark:text-[#9CA3AF] mb-5 max-w-xs">
                  Start attracting top talent by posting your first job opening.
                </p>
                <Button size="sm" asChild>
                  <Link href="/dashboard/employer/jobs/new">
                    <Plus className="h-4 w-4" aria-hidden="true" />
                    Post Your First Job
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="p-4 space-y-3">
                {jobs.map(job => (
                  <JobCard
                    key={job.uuid}
                    job={job}
                    onClick={() => router.push(`/dashboard/employer/jobs/${job.uuid}`)}
                    showEmployer={false}
                    actions={
                      <div className="flex gap-2" onClick={e => e.stopPropagation()}>
                        <Button variant="outline" size="sm" onClick={() => router.push(`/dashboard/employer/jobs/${job.uuid}`)}>
                          <Eye className="h-3.5 w-3.5" aria-hidden="true" /> View
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => router.push(`/dashboard/employer/jobs/${job.uuid}/edit`)}>
                          <Edit className="h-3.5 w-3.5" aria-hidden="true" /> Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setDeleteTarget(job)}
                          className="text-[#DC2626] border-[#FECACA] hover:bg-[#FEF2F2] dark:text-[#F87171] dark:border-[#7F1D1D] dark:hover:bg-[#7F1D1D]/20"
                        >
                          <Trash2 className="h-3.5 w-3.5" aria-hidden="true" /> Delete
                        </Button>
                      </div>
                    }
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <ProfileCompletion steps={[]} userType="employer" />
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
