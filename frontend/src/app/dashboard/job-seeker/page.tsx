'use client';

import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { ProfileCompletion } from '@/components/dashboard/ProfileCompletion';
import { Button } from '@/components/ui/Button';
import { useApplications } from '@/hooks';
import { FileText, Clock, Star, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { ROUTES } from '@/lib/constants';

export default function JobSeekerDashboard() {
  const { user } = useAuth();
  const { applications, loading, refreshApplications } = useApplications();

  useEffect(() => {
    refreshApplications();
  }, []);

  if (!user || user.role !== 'job-seeker') {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <h2 className="text-base font-semibold text-[#0F172A] dark:text-[#E5E7EB]">Access Denied</h2>
          <p className="text-sm text-[#64748B] dark:text-[#9CA3AF] mt-1">This page is only accessible to job seekers.</p>
        </div>
      </div>
    );
  }

  const getUserName = () => {
    if (user.role === 'job-seeker' && 'firstName' in user.profile) {
      const { firstName } = user.profile;
      return firstName || user.email.split('@')[0];
    }
    return user.email.split('@')[0];
  };

  const pendingCount = applications.filter(a => a.status === 'APPLIED').length;
  const shortlistedCount = applications.filter(a => a.status === 'SHORTLISTED').length;
  const hiredCount = applications.filter(a => a.status === 'HIRED').length;

  const recentActivityItems = applications.map(app => ({
    id: app.id,
    jobTitle: app.job?.title ?? 'Unknown Job',
    company: app.job?.employer?.companyName ?? 'Unknown Company',
    location: app.job?.location ?? '',
    appliedDate: new Date(app.appliedDate),
    status: app.status,
    jobId: app.job?.uuid ?? app.jobId,
  }));

  return (
    <div className="space-y-6 animate-fade-in">
      <DashboardHeader
        user={user}
        title={`Welcome back, ${getUserName()}`}
        subtitle="Track your applications and discover new opportunities"
        actions={
          <Button size="sm" asChild>
            <Link href={ROUTES.JOBS}>Find Jobs</Link>
          </Button>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Applications" value={loading ? '—' : applications.length} icon={<FileText className="h-5 w-5" />} />
        <StatsCard title="Pending" value={loading ? '—' : pendingCount} icon={<Clock className="h-5 w-5" />} />
        <StatsCard title="Shortlisted" value={loading ? '—' : shortlistedCount} icon={<Star className="h-5 w-5" />} />
        <StatsCard title="Hired" value={loading ? '—' : hiredCount} icon={<CheckCircle className="h-5 w-5" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentActivity applications={recentActivityItems} />
        </div>
        <div className="space-y-4">
          <ProfileCompletion steps={[]} userType="job-seeker" />
        </div>
      </div>
    </div>
  );
}
