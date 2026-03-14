'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { JobListingManagement } from '@/components/dashboard/JobListingManagement';
import { ApplicationTracking } from '@/components/dashboard/ApplicationTracking';
import { NewApplicantNotifications } from '@/components/dashboard/NewApplicantNotifications';
import { ProfileCompletion } from '@/components/dashboard/ProfileCompletion';
import { 
  Briefcase, 
  Users, 
  Eye, 
  CheckCircle,
} from 'lucide-react';

export default function EmployerDashboard() {
  const { user } = useAuth();

  if (!user || user.role !== 'employer') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-secondary-900 dark:text-secondary-100">
            Access Denied
          </h2>
          <p className="text-secondary-600 dark:text-secondary-400 mt-2">
            This page is only accessible to employers.
          </p>
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

  const mockJobListings = [
    {
      id: 'job-1',
      title: 'Senior Frontend Developer',
      location: 'San Francisco, CA',
      type: 'full-time' as const,
      salaryRange: {
        min: 120000,
        max: 160000,
        currency: 'USD',
      },
      status: 'active' as const,
      applicationsCount: 15,
      postedDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
      updatedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    },
    {
      id: 'job-2',
      title: 'Product Manager',
      location: 'Remote',
      type: 'remote' as const,
      salaryRange: {
        min: 100000,
        max: 130000,
        currency: 'USD',
      },
      status: 'active' as const,
      applicationsCount: 8,
      postedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      updatedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    },
    {
      id: 'job-3',
      title: 'UX Designer',
      location: 'New York, NY',
      type: 'full-time' as const,
      status: 'closed' as const,
      applicationsCount: 22,
      postedDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 2 weeks ago
      updatedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    },
  ];

  const mockApplications = [
    {
      id: 'app-1',
      jobId: 'job-1',
      jobTitle: 'Senior Frontend Developer',
      applicantName: 'John Smith',
      applicantEmail: 'john.smith@email.com',
      appliedDate: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      status: 'pending' as const,
      resumeUrl: '/resumes/john-smith.pdf',
      coverLetter: 'I am excited to apply for the Senior Frontend Developer position...',
    },
    {
      id: 'app-2',
      jobId: 'job-1',
      jobTitle: 'Senior Frontend Developer',
      applicantName: 'Sarah Johnson',
      applicantEmail: 'sarah.johnson@email.com',
      appliedDate: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      status: 'reviewed' as const,
      resumeUrl: '/resumes/sarah-johnson.pdf',
    },
    {
      id: 'app-3',
      jobId: 'job-2',
      jobTitle: 'Product Manager',
      applicantName: 'Mike Chen',
      applicantEmail: 'mike.chen@email.com',
      appliedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      status: 'shortlisted' as const,
      resumeUrl: '/resumes/mike-chen.pdf',
      coverLetter: 'With 5 years of product management experience...',
    },
  ];

  const mockNewApplicants = [
    {
      id: 'app-1',
      applicantName: 'John Smith',
      jobTitle: 'Senior Frontend Developer',
      jobId: 'job-1',
      appliedDate: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      isNew: true,
    },
    {
      id: 'app-4',
      applicantName: 'Emily Davis',
      jobTitle: 'Product Manager',
      jobId: 'job-2',
      appliedDate: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      isNew: true,
    },
    {
      id: 'app-2',
      applicantName: 'Sarah Johnson',
      jobTitle: 'Senior Frontend Developer',
      jobId: 'job-1',
      appliedDate: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      isNew: false,
    },
  ];

  const calculateProfileCompletion = () => {
    const profile = user.profile;
    const requiredFields = ['companyName', 'industry', 'companySize', 'description', 'contactPerson'];
    const completedFields = requiredFields.filter(field => {
      const value = profile[field as keyof typeof profile];
      return value && value.toString().trim().length > 0;
    });
    
    return Math.round((completedFields.length / requiredFields.length) * 100);
  };

  const profileCompletionSteps = [
    {
      id: 'company-info',
      title: 'Complete Company Information',
      description: 'Add company name, industry, and size',
      completed: user.role === 'employer' && 'companyName' in user.profile && 
                 !!(user.profile.companyName && user.profile.industry && user.profile.companySize),
      href: '/profile',
      priority: 'high' as const,
    },
    {
      id: 'description',
      title: 'Write Company Description',
      description: 'Tell job seekers about your company culture and mission',
      completed: user.role === 'employer' && 'description' in user.profile && 
                 !!(user.profile.description && user.profile.description.length > 100),
      href: '/profile',
      priority: 'high' as const,
    },
    {
      id: 'contact',
      title: 'Add Contact Person',
      description: 'Specify the main contact for job applications',
      completed: user.role === 'employer' && 'contactPerson' in user.profile && 
                 !!(user.profile.contactPerson),
      href: '/profile',
      priority: 'medium' as const,
    },
    {
      id: 'logo',
      title: 'Upload Company Logo',
      description: 'Add your company logo to build brand recognition',
      completed: user.role === 'employer' && 'logoUrl' in user.profile && 
                 !!(user.profile.logoUrl),
      href: '/profile',
      priority: 'medium' as const,
    },
    {
      id: 'website',
      title: 'Add Company Website',
      description: 'Link to your company website for more information',
      completed: user.role === 'employer' && 'website' in user.profile && 
                 !!(user.profile.website),
      href: '/profile',
      priority: 'low' as const,
    },
  ];

  const profileCompletion = calculateProfileCompletion();
  const totalApplications = mockApplications.length;
  const activeJobs = mockJobListings.filter(job => job.status === 'active').length;
  const newApplicantsCount = mockNewApplicants.filter(app => app.isNew).length;

  return (
    <div className="space-y-6">
      <DashboardHeader
        user={user}
        title={`${getCompanyName()} Dashboard`}
        subtitle="Manage your job postings and track applications"
      />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Active Jobs"
          value={activeJobs}
          change={{
            value: 1,
            trend: 'up',
            period: 'this week',
          }}
          icon={<Briefcase className="h-6 w-6" />}
        />
        <StatsCard
          title="Total Applications"
          value={totalApplications}
          change={{
            value: 5,
            trend: 'up',
            period: 'this week',
          }}
          icon={<Users className="h-6 w-6" />}
        />
        <StatsCard
          title="New Applicants"
          value={newApplicantsCount}
          icon={<Eye className="h-6 w-6" />}
        />
        <StatsCard
          title="Profile Complete"
          value={`${profileCompletion}%`}
          change={{
            value: profileCompletion < 100 ? 100 - profileCompletion : 0,
            trend: profileCompletion < 100 ? 'neutral' : 'up',
            period: 'to complete',
          }}
          icon={<CheckCircle className="h-6 w-6" />}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <JobListingManagement
            jobs={mockJobListings}
            onEdit={(jobId) => {
              console.log('Edit job:', jobId);
            }}
            onToggleStatus={(jobId, newStatus) => {
              console.log('Toggle job status:', jobId, newStatus);
            }}
            onDelete={(jobId) => {
              console.log('Delete job:', jobId);
            }}
          />
          <ApplicationTracking
            applications={mockApplications}
            onStatusChange={(applicationId, newStatus) => {
              console.log('Change application status:', applicationId, newStatus);
            }}
          />
        </div>
        
        <div className="space-y-6">
          <NewApplicantNotifications
            applicants={mockNewApplicants}
            onMarkAsRead={(applicantId) => {
              console.log('Mark as read:', applicantId);
            }}
            onMarkAllAsRead={() => {
              console.log('Mark all as read');
            }}
          />
          <ProfileCompletion
            completionPercentage={profileCompletion}
            steps={profileCompletionSteps}
            userType="employer"
          />
        </div>
      </div>
    </div>
  );
}