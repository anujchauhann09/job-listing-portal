'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { SavedJobs } from '@/components/dashboard/SavedJobs';
import { ProfileCompletion } from '@/components/dashboard/ProfileCompletion';
import { 
  FileText, 
  Bookmark, 
  Eye, 
  CheckCircle,
} from 'lucide-react';

export default function JobSeekerDashboard() {
  const { user } = useAuth();

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

  const mockApplications = [
    {
      id: '1',
      jobTitle: 'Senior Frontend Developer',
      company: 'TechCorp Inc.',
      location: 'San Francisco, CA',
      appliedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      status: 'reviewed' as const,
      jobId: 'job-1',
    },
    {
      id: '2',
      jobTitle: 'React Developer',
      company: 'StartupXYZ',
      location: 'Remote',
      appliedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
      status: 'pending' as const,
      jobId: 'job-2',
    },
    {
      id: '3',
      jobTitle: 'Full Stack Engineer',
      company: 'Innovation Labs',
      location: 'New York, NY',
      appliedDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
      status: 'shortlisted' as const,
      jobId: 'job-3',
    },
  ];

  const mockSavedJobs = [
    {
      id: 'saved-1',
      title: 'UI/UX Designer',
      company: 'Design Studio',
      location: 'Los Angeles, CA',
      type: 'full-time' as const,
      salaryRange: {
        min: 70000,
        max: 90000,
        currency: 'USD',
      },
      savedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      postedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    },
    {
      id: 'saved-2',
      title: 'Product Manager',
      company: 'Growth Co.',
      location: 'Remote',
      type: 'remote' as const,
      salaryRange: {
        min: 100000,
        max: 130000,
        currency: 'USD',
      },
      savedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      postedDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    },
  ];

  const calculateProfileCompletion = () => {
    const profile = user.profile;
    const requiredFields = ['firstName', 'lastName', 'location', 'bio', 'skills', 'experience', 'education'];
    const completedFields = requiredFields.filter(field => {
      const value = profile[field as keyof typeof profile];
      return value && (Array.isArray(value) ? value.length > 0 : value.toString().trim().length > 0);
    });
    
    return Math.round((completedFields.length / requiredFields.length) * 100);
  };

  const profileCompletionSteps = [
    {
      id: 'basic-info',
      title: 'Complete Basic Information',
      description: 'Add your name, location, and contact details',
      completed: user.role === 'job-seeker' && 'firstName' in user.profile && 
                 !!(user.profile.firstName && user.profile.lastName && user.profile.location),
      href: '/profile',
      priority: 'high' as const,
    },
    {
      id: 'bio',
      title: 'Write Professional Bio',
      description: 'Tell employers about your background and goals',
      completed: user.role === 'job-seeker' && 'bio' in user.profile && 
                 !!(user.profile.bio && user.profile.bio.length > 50),
      href: '/profile',
      priority: 'high' as const,
    },
    {
      id: 'skills',
      title: 'Add Skills',
      description: 'List your technical and professional skills',
      completed: user.role === 'job-seeker' && 'skills' in user.profile && 
                 !!(user.profile.skills && user.profile.skills.length > 0),
      href: '/profile',
      priority: 'medium' as const,
    },
    {
      id: 'experience',
      title: 'Add Work Experience',
      description: 'Include your professional experience and achievements',
      completed: user.role === 'job-seeker' && 'experience' in user.profile && 
                 !!(user.profile.experience && user.profile.experience.length > 100),
      href: '/profile',
      priority: 'high' as const,
    },
    {
      id: 'education',
      title: 'Add Education',
      description: 'Include your educational background',
      completed: user.role === 'job-seeker' && 'education' in user.profile && 
                 !!(user.profile.education && user.profile.education.length > 20),
      href: '/profile',
      priority: 'medium' as const,
    },
    {
      id: 'resume',
      title: 'Upload Resume',
      description: 'Upload your latest resume for employers to review',
      completed: user.role === 'job-seeker' && 'resumeUrl' in user.profile && 
                 !!(user.profile.resumeUrl),
      href: '/profile',
      priority: 'high' as const,
    },
  ];

  const profileCompletion = calculateProfileCompletion();

  return (
    <div className="space-y-6">
      <DashboardHeader
        user={user}
        title={`Welcome back, ${getUserName().split(' ')[0] || 'there'}!`}
        subtitle="Track your job applications and discover new opportunities"
      />
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Applications Sent"
          value={mockApplications.length}
          change={{
            value: 2,
            trend: 'up',
            period: 'this week',
          }}
          icon={<FileText className="h-6 w-6" />}
        />
        <StatsCard
          title="Profile Views"
          value="24"
          change={{
            value: 8,
            trend: 'up',
            period: 'this week',
          }}
          icon={<Eye className="h-6 w-6" />}
        />
        <StatsCard
          title="Saved Jobs"
          value={mockSavedJobs.length}
          icon={<Bookmark className="h-6 w-6" />}
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
          <RecentActivity applications={mockApplications} />
          <SavedJobs 
            jobs={mockSavedJobs} 
            onRemove={(jobId) => {
              console.log('Remove saved job:', jobId);
            }}
          />
        </div>
        
        <div className="space-y-6">
          <ProfileCompletion
            completionPercentage={profileCompletion}
            steps={profileCompletionSteps}
            userType="job-seeker"
          />
        </div>
      </div>
    </div>
  );
}