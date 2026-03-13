'use client';

import React from 'react';
import { Container } from '@/components/ui/Container';
import { JobDetail } from '@/components/jobs';
import { JobApplicationForm } from '@/components/applications';
import { Job } from '@/types/job';
import { useRouter } from 'next/navigation';
import { notFound } from 'next/navigation';
import { useApplications } from '@/hooks';
import { useAuth } from '@/context/AuthContext';

const mockJob: Job = {
  id: '1',
  title: 'Senior Frontend Developer',
  description: `We are looking for an experienced Frontend Developer to join our dynamic team and help build amazing user experiences that delight our customers.

In this role, you will work with cutting-edge technologies including React, TypeScript, and modern web frameworks to create responsive, accessible, and performant applications. You'll collaborate closely with our design team to implement pixel-perfect interfaces and work with backend engineers to integrate APIs seamlessly.

Our ideal candidate is passionate about creating exceptional user experiences, stays up-to-date with the latest frontend technologies, and enjoys working in a collaborative, fast-paced environment.

What you'll do:
• Develop and maintain high-quality React applications using TypeScript
• Collaborate with designers to implement responsive and accessible user interfaces
• Work with backend teams to integrate RESTful APIs and GraphQL endpoints
• Write comprehensive tests using Jest and React Testing Library
• Participate in code reviews and contribute to our engineering best practices
• Mentor junior developers and contribute to team knowledge sharing

What we offer:
• Competitive salary and equity package
• Comprehensive health, dental, and vision insurance
• Flexible work arrangements with remote-friendly culture
• Professional development budget for conferences and courses
• Modern tech stack and tools
• Collaborative and inclusive team environment`,
  requirements: [
    '5+ years of experience with React and TypeScript',
    'Strong understanding of modern CSS, Sass/SCSS, and responsive design principles',
    'Experience with state management libraries (Redux, Zustand, or Context API)',
    'Knowledge of testing frameworks (Jest, React Testing Library, Cypress)',
    'Familiarity with build tools (Webpack, Vite) and package managers (npm, yarn)',
    'Experience with version control systems (Git) and collaborative development workflows',
    'Understanding of web accessibility standards (WCAG) and best practices',
    'Excellent communication and collaboration skills',
    'Bachelor\'s degree in Computer Science, Engineering, or equivalent experience'
  ],
  location: 'San Francisco, CA',
  type: 'full-time',
  salaryRange: {
    min: 120000,
    max: 160000,
    currency: 'USD'
  },
  employerId: 'emp1',
  employer: {
    companyName: 'TechCorp Inc.',
    logoUrl: '/logos/techcorp.png',
    industry: 'Technology'
  },
  status: 'active',
  applicationsCount: 23,
  postedDate: new Date('2024-01-15'),
  updatedDate: new Date('2024-01-15')
};

interface JobDetailPageProps {
  params: {
    id: string;
  };
}

export default function JobDetailPage({ params }: JobDetailPageProps) {
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = React.useState(false);
  const [isSaved, setIsSaved] = React.useState(false);
  const [showApplicationForm, setShowApplicationForm] = React.useState(false);

  const {
    hasApplied,
    existingApplication,
    createApplication,
    checkExistingApplication,
  } = useApplications({ jobId: params.id, autoLoad: false });

  const job = mockJob;

  React.useEffect(() => {
    if (job && user?.role === 'job-seeker') {
      checkExistingApplication(job.id);
    }
  }, [job, user, checkExistingApplication]);

  if (!job) {
    notFound();
  }

  const handleBack = () => {
    router.back();
  };

  const handleApply = async () => {
    if (!user) {
      router.push('/auth/login');
      return;
    }

    if (user.role !== 'job-seeker') {
      alert('Only job seekers can apply to jobs');
      return;
    }

    if (hasApplied) {
      alert('You have already applied to this job');
      return;
    }

    setShowApplicationForm(true);
  };

  const handleApplicationSubmit = async (data: { coverLetter?: string; resumeFile?: File }) => {
    setLoading(true);
    
    try {
      let resumeUrl = user?.role === 'job-seeker' && 'resumeUrl' in user.profile ? user.profile.resumeUrl : undefined;
  
      if (data.resumeFile) {
        console.log('Would upload file:', data.resumeFile.name);
      }

      await createApplication({
        jobId: job.id,
        coverLetter: data.coverLetter,
        resumeUrl: resumeUrl,
      });

      setShowApplicationForm(false);
      alert('Application submitted successfully!');
    } catch (err) {
      console.error('Failed to submit application:', err);
      alert(err instanceof Error ? err.message : 'Failed to submit application');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
    console.log(isSaved ? 'Unsaved job:' : 'Saved job:', job.id);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: job.title,
        text: `Check out this job opportunity: ${job.title} at ${job.employer.companyName}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      console.log('Job URL copied to clipboard');
    }
  };

  const canApply = user?.role === 'job-seeker' && !hasApplied;
  const isApplied = hasApplied && !!existingApplication;

  return (
    <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900">
      <Container className="py-8">
        <JobDetail
          job={job}
          onBack={handleBack}
          onApply={handleApply}
          onSave={handleSave}
          onShare={handleShare}
          isApplied={isApplied}
          isSaved={isSaved}
          loading={loading}
          showApplyButton={canApply}
        />
        
        <JobApplicationForm
          job={job}
          isOpen={showApplicationForm}
          onClose={() => setShowApplicationForm(false)}
          onSubmit={handleApplicationSubmit}
          loading={loading}
          userResumeUrl={user?.role === 'job-seeker' && 'resumeUrl' in user.profile ? user.profile.resumeUrl : undefined}
        />
      </Container>
    </div>
  );
}