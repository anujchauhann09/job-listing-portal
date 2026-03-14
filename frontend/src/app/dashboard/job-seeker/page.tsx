'use client';

import React, { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { useApplications } from '@/hooks';
import { FileText, Clock, Star, CheckCircle } from 'lucide-react';

export default function JobSeekerDashboard() {
  const { user } = useAuth();
  const { applications, loading, refreshApplications } = useApplications();

  useEffect(() => {
    refreshApplications();
  }, [refreshApplications]);

  if (!user || user.role !== 'job-seeker') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-secondary-900 dark:text-secondary-100">
            Access Denied
          </h2>
          <p className="text-secondary-600 dark:text-secondary-400 mt-2">
            This page is only accessible to job seekers.
          </p>
        </div>
      </div>
    );
  }

  const getUserName = () => {
    if (user.role === 'job-seeker' && 'firstName' in user.profile) {
      const { firstName, lastName } = user.profile;
      return firstName && lastName ? `${firstName} ${lastName}` : user.email;
    }
    return user.email;
  };

  const pendingCount = applications.filter(a => a.status === 'APPLIED').length;
  const shortlistedCount = applications.filter(a => a.status === 'SHORTLISTED').length;
  const hiredCount = applications.filter(a => a.status === 'HIRED').length;

  // Map real applications to the shape RecentActivity expects
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
    <div className="space-y-6">
      <DashboardHeader
        user={user}
        title={`Welcome back, ${getUserName().split(' ')[0] || 'there'}!`}
        subtitle="Track your job applications and discover new opportunities"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Applications Sent"
          value={loading ? '—' : applications.length}
          icon={<FileText className="h-6 w-6" />}
        />
        <StatsCard
          title="Pending Review"
          value={loading ? '—' : pendingCount}
          icon={<Clock className="h-6 w-6" />}
        />
        <StatsCard
          title="Shortlisted"
          value={loading ? '—' : shortlistedCount}
          icon={<Star className="h-6 w-6" />}
        />
        <StatsCard
          title="Hired"
          value={loading ? '—' : hiredCount}
          icon={<CheckCircle className="h-6 w-6" />}
        />
      </div>

      <RecentActivity applications={recentActivityItems} />
    </div>
  );
}
