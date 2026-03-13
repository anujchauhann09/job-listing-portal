'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { Job } from '@/types/job';
import { FileText, Send, X } from 'lucide-react';

const applicationSchema = z.object({
  coverLetter: z.string().optional(),
  resumeFile: z.any().optional(),
});

type ApplicationFormData = z.infer<typeof applicationSchema>;

interface JobApplicationFormProps {
  job: Job;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { coverLetter?: string; resumeFile?: File }) => Promise<void>;
  loading?: boolean;
  userResumeUrl?: string;
}

export function JobApplicationForm({
  job,
  isOpen,
  onClose,
  onSubmit,
  loading = false,
  userResumeUrl
}: JobApplicationFormProps) {
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [useExistingResume, setUseExistingResume] = React.useState(!!userResumeUrl);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
  });

  const coverLetter = watch('coverLetter');

  React.useEffect(() => {
    if (!isOpen) {
      reset();
      setSelectedFile(null);
      setUseExistingResume(!!userResumeUrl);
    }
  }, [isOpen, reset, userResumeUrl]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        alert('Please upload a PDF or Word document');
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }
      
      setSelectedFile(file);
      setUseExistingResume(false);
    }
  };

  const handleFormSubmit = async (data: ApplicationFormData) => {
    try {
      await onSubmit({
        coverLetter: data.coverLetter?.trim() || undefined,
        resumeFile: useExistingResume ? undefined : selectedFile || undefined,
      });
      onClose();
    } catch (error) {
      console.error('Application submission failed:', error);
    }
  };

  const characterCount = coverLetter?.length || 0;
  const maxCharacters = 1000;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Apply for Position">
      <div className="space-y-6">
        <div className="bg-secondary-50 dark:bg-secondary-800 rounded-lg p-4">
          <h3 className="font-semibold text-secondary-900 dark:text-secondary-100 mb-2">
            {job.title}
          </h3>
          <p className="text-sm text-secondary-600 dark:text-secondary-400">
            {job.employer.companyName} • {job.location}
          </p>
          {job.salaryRange && (
            <p className="text-sm text-secondary-600 dark:text-secondary-400 mt-1">
              {job.salaryRange.currency} {job.salaryRange.min.toLocaleString()} - {job.salaryRange.max.toLocaleString()}
            </p>
          )}
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          <div className="space-y-4">
            <h4 className="font-medium text-secondary-900 dark:text-secondary-100">
              Resume
            </h4>
            
            {userResumeUrl && (
              <div className="space-y-3">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    checked={useExistingResume}
                    onChange={() => {
                      setUseExistingResume(true);
                      setSelectedFile(null);
                    }}
                    className="text-primary-600"
                  />
                  <span className="text-sm text-secondary-700 dark:text-secondary-300">
                    Use my existing resume
                  </span>
                </label>
                
                {useExistingResume && (
                  <div className="ml-6 flex items-center space-x-2 text-sm text-secondary-600 dark:text-secondary-400">
                    <FileText className="h-4 w-4" />
                    <a 
                      href={userResumeUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:text-primary-600 dark:hover:text-primary-400"
                    >
                      View current resume
                    </a>
                  </div>
                )}
              </div>
            )}
            
            <div className="space-y-3">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  checked={!useExistingResume}
                  onChange={() => setUseExistingResume(false)}
                  className="text-primary-600"
                />
                <span className="text-sm text-secondary-700 dark:text-secondary-300">
                  Upload a new resume
                </span>
              </label>
              
              {!useExistingResume && (
                <div className="ml-6">
                  <Input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    label=""
                    placeholder="Choose file"
                  />
                  {selectedFile && (
                    <div className="mt-2 flex items-center space-x-2 text-sm text-secondary-600 dark:text-secondary-400">
                      <FileText className="h-4 w-4" />
                      <span>{selectedFile.name}</span>
                      <button
                        type="button"
                        onClick={() => setSelectedFile(null)}
                        className="text-error-600 hover:text-error-700"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                  <p className="mt-1 text-xs text-secondary-500 dark:text-secondary-500">
                    PDF, DOC, or DOCX files up to 5MB
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300">
              Cover Letter (Optional)
            </label>
            <textarea
              {...register('coverLetter')}
              rows={6}
              maxLength={maxCharacters}
              placeholder="Tell the employer why you're interested in this position and what makes you a great fit..."
              className="w-full px-3 py-2 border border-secondary-300 dark:border-secondary-600 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-secondary-700 dark:text-secondary-100 resize-none"
            />
            <div className="flex justify-between text-xs text-secondary-500 dark:text-secondary-500">
              <span>Optional but recommended</span>
              <span>{characterCount}/{maxCharacters}</span>
            </div>
            {errors.coverLetter && (
              <p className="text-sm text-error-600 dark:text-error-400">
                {errors.coverLetter.message}
              </p>
            )}
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-secondary-200 dark:border-secondary-700">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              loading={loading}
              disabled={!useExistingResume && !selectedFile}
            >
              <Send className="h-4 w-4 mr-2" />
              Submit Application
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}