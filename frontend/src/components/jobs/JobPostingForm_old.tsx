import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { jobPostingSchema, JobPostingFormData } from '@/validators/job';
import { JOB_TYPES } from '@/lib/constants';
import { JobType } from '@/types/job';
import { Plus, X, Save, Eye } from 'lucide-react';

export interface JobPostingFormProps {
  initialData?: Partial<JobPostingFormData>;
  onSubmit: (data: JobPostingFormData) => void;
  onPreview?: (data: JobPostingFormData) => void;
  onSaveDraft?: (data: JobPostingFormData) => void;
  loading?: boolean;
  mode?: 'create' | 'edit';
}

const JOB_TYPE_LABELS: Record<JobType, string> = {
  'full-time': 'Full Time',
  'part-time': 'Part Time',
  'contract': 'Contract',
  'remote': 'Remote',
};

export const JobPostingForm: React.FC<JobPostingFormProps> = ({
  initialData,
  onSubmit,
  onPreview,
  onSaveDraft,
  loading = false,
  mode = 'create',
}) => {
  const [requirements, setRequirements] = useState<string[]>(
    initialData?.requirements || ['']
  );

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isDirty },
  } = useForm<JobPostingFormData>({
    resolver: zodResolver(jobPostingSchema),
    defaultValues: {
      title: initialData?.title || '',
      description: initialData?.description || '',
      requirements: initialData?.requirements || [''],
      location: initialData?.location || '',
      type: initialData?.type || 'full-time',
      salaryRange: initialData?.salaryRange || undefined,
    },
  });

  const watchedData = watch();
  const selectedType = watch('type');

  const addRequirement = () => {
    const newRequirements = [...requirements, ''];
    setRequirements(newRequirements);
    setValue('requirements', newRequirements, { shouldDirty: true });
  };

  const removeRequirement = (index: number) => {
    if (requirements.length > 1) {
      const newRequirements = requirements.filter((_, i) => i !== index);
      setRequirements(newRequirements);
      setValue('requirements', newRequirements, { shouldDirty: true });
    }
  };

  const updateRequirement = (index: number, value: string) => {
    const newRequirements = [...requirements];
    newRequirements[index] = value;
    setRequirements(newRequirements);
    setValue('requirements', newRequirements, { shouldDirty: true });
  };

  const handlePreview = () => {
    if (onPreview) {
      onPreview({ ...watchedData, requirements });
    }
  };

  const handleSaveDraft = () => {
    if (onSaveDraft) {
      onSaveDraft({ ...watchedData, requirements });
    }
  };

  const handleFormSubmit = (data: JobPostingFormData) => {
    onSubmit({ ...data, requirements });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100">
            {mode === 'edit' ? 'Edit Job Posting' : 'Create Job Posting'}
          </h1>
          <p className="text-secondary-600 dark:text-secondary-400 mt-1">
            {mode === 'edit' 
              ? 'Update your job posting details' 
              : 'Fill in the details to post a new job opportunity'
            }
          </p>
        </div>

        <div className="flex gap-2">
          {onPreview && (
            <Button
              type="button"
              variant="outline"
              onClick={handlePreview}
            >
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
          )}
          
          {onSaveDraft && isDirty && (
            <Button
              type="button"
              variant="outline"
              onClick={handleSaveDraft}
            >
              <Save className="h-4 w-4 mr-2" />
              Save Draft
            </Button>
          )}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            label="Job Title"
            placeholder="e.g. Senior Software Engineer"
            error={errors.title?.message}
            required
            {...register('title')}
          />

          <div>
            <label className="text-sm font-medium text-secondary-900 dark:text-secondary-100 mb-2 block">
              Job Type <span className="text-error-500">*</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {Object.entries(JOB_TYPE_LABELS).map(([type, label]) => (
                <Badge
                  key={type}
                  variant={selectedType === type ? 'default' : 'secondary'}
                  className="cursor-pointer"
                  onClick={() => setValue('type', type as JobType, { shouldDirty: true })}
                >
                  {label}
                </Badge>
              ))}
            </div>
            {errors.type && (
              <p className="text-sm text-error-600 dark:text-error-400 mt-1">
                {errors.type.message}
              </p>
            )}
          </div>

          <Input
            label="Location"
            placeholder="e.g. San Francisco, CA or Remote"
            error={errors.location?.message}
            required
            {...register('location')}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Job Description</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <label className="text-sm font-medium text-secondary-900 dark:text-secondary-100 mb-2 block">
              Description <span className="text-error-500">*</span>
            </label>
            <textarea
              className="flex min-h-[120px] w-full rounded-lg border border-secondary-300 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-secondary-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-secondary-600 dark:bg-secondary-900 dark:ring-offset-secondary-900 dark:placeholder:text-secondary-400 dark:focus-visible:ring-primary-400"
              placeholder="Describe the role, responsibilities, and what makes this opportunity exciting..."
              {...register('description')}
            />
            {errors.description && (
              <p className="text-sm text-error-600 dark:text-error-400 mt-1">
                {errors.description.message}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Requirements</CardTitle>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addRequirement}
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Requirement
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {requirements.map((requirement, index) => (
            <div key={index} className="flex gap-2">
              <Input
                placeholder={`Requirement ${index + 1}`}
                value={requirement}
                onChange={(e) => updateRequirement(index, e.target.value)}
                error={errors.requirements?.[index]?.message}
                className="flex-1"
              />
              {requirements.length > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeRequirement(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
          {errors.requirements && typeof errors.requirements.message === 'string' && (
            <p className="text-sm text-error-600 dark:text-error-400">
              {errors.requirements.message}
            </p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Salary Information (Optional)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              type="number"
              label="Minimum Salary (USD)"
              placeholder="50000"
              error={errors.salaryRange?.min?.message}
              {...register('salaryRange.min', { valueAsNumber: true })}
            />
            <Input
              type="number"
              label="Maximum Salary (USD)"
              placeholder="80000"
              error={errors.salaryRange?.max?.message}
              {...register('salaryRange.max', { valueAsNumber: true })}
            />
          </div>
          <p className="text-sm text-secondary-600 dark:text-secondary-400">
            Providing salary information helps attract qualified candidates and improves application quality.
          </p>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-3 pt-6">
        <Button
          type="button"
          variant="outline"
          onClick={() => window.history.back()}
        >
          Cancel
        </Button>
        
        <Button
          type="submit"
          loading={loading}
          disabled={loading}
        >
          {mode === 'edit' ? 'Update Job Posting' : 'Post Job'}
        </Button>
      </div>
    </form>
  );
};