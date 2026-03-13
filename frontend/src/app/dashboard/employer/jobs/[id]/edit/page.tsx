'use client';

import React from 'react';
import { Container } from '@/components/ui/Container';
import { JobPostingForm } from '@/components/jobs';
import { JobPostingFormData } from '@/validators/job';
import { Job } from '@/types/job';
import { useRouter } from 'next/navigation';
import { notFound } from 'next/navigation';

const mockJob: Job = {
  id: '1',
  title: 'Senior Frontend Developer',
  description: 'We are looking for an experienced Frontend Developer to join our team and help build amazing user experiences. You will work with React, TypeScript, and modern web technologies to create responsive and accessible applications.\n\nIn this role, you will collaborate with designers, product managers, and backend engineers to deliver high-quality features that our users love.',
  requirements: [
    '5+ years of experience with React and TypeScript',
    'Strong understanding of modern CSS and responsive design',
    'Experience with state management libraries (Redux, Zustand)',
    'Knowledge of testing frameworks (Jest, React Testing Library)',
    'Excellent communication and collaboration skills'
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

interface EditJobPageProps {
  params: {
    id: string;
  };
}

export default function EditJobPage({ params }: EditJobPageProps) {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [job, setJob] = React.useState<Job | null>(null);

  React.useEffect(() => {
    const fetchJob = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        
        if (params.id === '1') {
          setJob(mockJob);
        } else {
          notFound();
        }
      } catch (error) {
        console.error('Error fetching job:', error);
        notFound();
      }
    };

    fetchJob();
  }, [params.id]);

  const handleSubmit = async (data: JobPostingFormData) => {
    setLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Updating job posting:', { id: params.id, ...data });

      if (job) {
        const updatedJob: Job = {
          ...job,
          title: data.title,
          description: data.description,
          requirements: data.requirements,
          location: data.location,
          type: data.type,
          salaryRange: data.salaryRange,
          updatedDate: new Date()
        };
        setJob(updatedJob);
      }
      
      router.push('/dashboard/employer');
      
    } catch (error) {
      console.error('Error updating job posting:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePreview = (data: JobPostingFormData) => {
    const previewData = {
      ...job,
      ...data,
      id: params.id
    };
    sessionStorage.setItem('jobPreviewData', JSON.stringify(previewData));
    
    window.open('/jobs/preview', '_blank');
  };

  const handleSaveDraft = async (data: JobPostingFormData) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Saving draft changes:', { id: params.id, ...data });
      
      alert('Changes saved as draft!');
      
    } catch (error) {
      console.error('Error saving draft:', error);
      alert('Error saving draft. Please try again.');
    }
  };

  if (!job) {
    return (
      <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-secondary-600 dark:text-secondary-400">Loading job details...</p>
        </div>
      </div>
    );
  }

  const initialData: Partial<JobPostingFormData> = {
    title: job.title,
    description: job.description,
    requirements: job.requirements,
    location: job.location,
    type: job.type,
    salaryRange: job.salaryRange ? {
      ...job.salaryRange,
      currency: job.salaryRange.currency || 'USD'
    } : undefined
  };

  return (
    <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900">
      <Container className="py-8">
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100">
                Edit Job Posting
              </h1>
              <p className="text-secondary-600 dark:text-secondary-400 mt-1">
                Update your job posting details. Changes will preserve existing applications.
              </p>
            </div>
            
            {job.applicationsCount > 0 && (
              <div className="bg-warning-50 dark:bg-warning-900/20 border border-warning-200 dark:border-warning-800 rounded-lg p-3">
                <p className="text-sm text-warning-800 dark:text-warning-200">
                  <strong>{job.applicationsCount}</strong> application{job.applicationsCount !== 1 ? 's' : ''} received
                </p>
                <p className="text-xs text-warning-600 dark:text-warning-400 mt-1">
                  Editing will preserve all existing applications
                </p>
              </div>
            )}
          </div>
        </div>

        <JobPostingForm
          initialData={initialData}
          onSubmit={handleSubmit}
          onPreview={handlePreview}
          onSaveDraft={handleSaveDraft}
          loading={loading}
          mode="edit"
        />
      </Container>
    </div>
  );
}