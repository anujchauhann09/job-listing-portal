'use client';

import React from 'react';
import { Container } from '@/components/ui/Container';
import { JobPostingForm } from '@/components/jobs';
import { JobPostingFormData } from '@/validators/job';
import { useRouter } from 'next/navigation';

export default function NewJobPostingPage() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (data: JobPostingFormData) => {
    setLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Creating job posting:', data);
    
      router.push('/dashboard/employer');
      
    } catch (error) {
      console.error('Error creating job posting:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePreview = (data: JobPostingFormData) => {
    sessionStorage.setItem('jobPreviewData', JSON.stringify(data));
    
    window.open('/jobs/preview', '_blank');
  };

  const handleSaveDraft = async (data: JobPostingFormData) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Saving draft:', data);
      alert('Draft saved successfully!');
      
    } catch (error) {
      console.error('Error saving draft:', error);
      alert('Error saving draft. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900">
      <Container className="py-8">
        <JobPostingForm
          onSubmit={handleSubmit}
          onPreview={handlePreview}
          onSaveDraft={handleSaveDraft}
          loading={loading}
          mode="create"
        />
      </Container>
    </div>
  );
}