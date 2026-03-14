import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { jobPostingSchema, JobPostingFormData } from '@/validators/job';
import { JOB_TYPES, EXPERIENCE_LEVELS, REMOTE_TYPES, SALARY_PERIODS, JOB_STATUS } from '@/lib/constants';
import { Plus, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface JobPostingFormProps {
  initialData?: Partial<JobPostingFormData>;
  onSubmit: (data: JobPostingFormData) => Promise<void>;
  loading?: boolean;
  mode?: 'create' | 'edit';
}

// Reusable selector button — clearly shows selected vs unselected
function SelectButton({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
        selected
          ? 'bg-primary-600 text-white border-primary-600 shadow-sm dark:bg-primary-500 dark:border-primary-500'
          : 'bg-white text-secondary-700 border-secondary-300 hover:border-primary-400 hover:text-primary-700 dark:bg-secondary-800 dark:text-secondary-300 dark:border-secondary-600 dark:hover:border-primary-500 dark:hover:text-primary-400'
      )}
    >
      {children}
    </button>
  );
}

const TEXTAREA_CLASS =
  'flex min-h-[120px] w-full rounded-lg border border-secondary-300 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-secondary-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-secondary-600 dark:bg-secondary-900 dark:ring-offset-secondary-900 dark:placeholder:text-secondary-400 dark:focus-visible:ring-primary-400';

const JOB_TYPE_LABELS: Record<string, string> = {
  FULL_TIME: 'Full Time',
  PART_TIME: 'Part Time',
  INTERNSHIP: 'Internship',
  CONTRACT: 'Contract',
};

const EXPERIENCE_LABELS: Record<string, string> = {
  FRESHER: 'Fresher',
  JUNIOR: 'Junior',
  MID: 'Mid-Level',
  SENIOR: 'Senior',
};

const REMOTE_LABELS: Record<string, string> = {
  ONSITE: 'On-site',
  REMOTE: 'Remote',
  HYBRID: 'Hybrid',
};

const SALARY_PERIOD_LABELS: Record<string, string> = {
  MONTHLY: 'Monthly',
  YEARLY: 'Yearly',
};

const STATUS_LABELS: Record<string, string> = {
  DRAFT: 'Draft',
  OPEN: 'Open',
  CLOSED: 'Closed',
  ARCHIVED: 'Archived',
};

const STATUS_COLORS: Record<string, string> = {
  DRAFT: 'border-warning-400 bg-warning-50 text-warning-800 dark:bg-warning-900/20 dark:text-warning-300 dark:border-warning-600',
  OPEN: 'border-success-400 bg-success-50 text-success-800 dark:bg-success-900/20 dark:text-success-300 dark:border-success-600',
  CLOSED: 'border-secondary-400 bg-secondary-50 text-secondary-700 dark:bg-secondary-800 dark:text-secondary-300 dark:border-secondary-600',
  ARCHIVED: 'border-error-400 bg-error-50 text-error-700 dark:bg-error-900/20 dark:text-error-300 dark:border-error-600',
};

export const JobPostingForm: React.FC<JobPostingFormProps> = ({
  initialData,
  onSubmit,
  loading = false,
  mode = 'create',
}) => {
  const [skills, setSkills] = useState<string[]>(initialData?.skills || []);
  const [skillInput, setSkillInput] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<JobPostingFormData>({
    resolver: zodResolver(jobPostingSchema),
    defaultValues: {
      title: initialData?.title || '',
      description: initialData?.description || '',
      qualifications: initialData?.qualifications || '',
      responsibilities: initialData?.responsibilities || '',
      location: initialData?.location || '',
      jobType: initialData?.jobType || 'FULL_TIME',
      experienceLevel: initialData?.experienceLevel || 'MID',
      remoteType: initialData?.remoteType || 'ONSITE',
      salaryMin: initialData?.salaryMin,
      salaryMax: initialData?.salaryMax,
      salaryCurrency: initialData?.salaryCurrency || 'USD',
      salaryPeriod: initialData?.salaryPeriod || 'YEARLY',
      status: initialData?.status || 'OPEN',
      skills: initialData?.skills || [],
    },
  });

  // Re-populate form when initialData arrives (async fetch in edit mode)
  useEffect(() => {
    if (initialData && mode === 'edit') {
      const incoming = initialData.skills || [];
      setSkills(incoming);
      reset({
        title: initialData.title || '',
        description: initialData.description || '',
        qualifications: initialData.qualifications || '',
        responsibilities: initialData.responsibilities || '',
        location: initialData.location || '',
        jobType: initialData.jobType || 'FULL_TIME',
        experienceLevel: initialData.experienceLevel || 'MID',
        remoteType: initialData.remoteType || 'ONSITE',
        salaryMin: initialData.salaryMin,
        salaryMax: initialData.salaryMax,
        salaryCurrency: initialData.salaryCurrency || 'USD',
        salaryPeriod: initialData.salaryPeriod || 'YEARLY',
        status: initialData.status || 'OPEN',
        skills: incoming,
      });
    }
  }, [initialData, mode, reset]);

  const selectedJobType = watch('jobType');
  const selectedExperienceLevel = watch('experienceLevel');
  const selectedRemoteType = watch('remoteType');
  const selectedSalaryPeriod = watch('salaryPeriod');
  const selectedStatus = watch('status');

  const addSkill = () => {
    const trimmed = skillInput.trim();
    if (trimmed && !skills.includes(trimmed)) {
      const newSkills = [...skills, trimmed];
      setSkills(newSkills);
      setValue('skills', newSkills, { shouldValidate: true });
      setSkillInput('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    const newSkills = skills.filter((s) => s !== skillToRemove);
    setSkills(newSkills);
    setValue('skills', newSkills, { shouldValidate: true });
  };

  const handleFormSubmit = async (data: JobPostingFormData) => {
    await onSubmit({ ...data, skills });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100">
          {mode === 'edit' ? 'Edit Job Posting' : 'Create Job Posting'}
        </h1>
        <p className="text-secondary-600 dark:text-secondary-400 mt-1">
          {mode === 'edit'
            ? 'Update your job posting details'
            : 'Fill in the details to post a new job opportunity'}
        </p>
      </div>

      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <Input
            label="Job Title"
            placeholder="e.g. Senior Software Engineer"
            error={errors.title?.message}
            required
            {...register('title')}
          />

          <Input
            label="Location"
            placeholder="e.g. San Francisco, CA"
            error={errors.location?.message}
            required
            {...register('location')}
          />

          {/* Job Type */}
          <div>
            <label className="text-sm font-medium text-secondary-900 dark:text-secondary-100 mb-3 block">
              Job Type <span className="text-error-500">*</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {Object.entries(JOB_TYPES).map(([key, value]) => (
                <SelectButton
                  key={value}
                  selected={selectedJobType === value}
                  onClick={() => setValue('jobType', value as JobPostingFormData['jobType'], { shouldValidate: true })}
                >
                  {JOB_TYPE_LABELS[key] ?? key}
                </SelectButton>
              ))}
            </div>
            {errors.jobType && (
              <p className="text-sm text-error-600 dark:text-error-400 mt-1">{errors.jobType.message}</p>
            )}
          </div>

          {/* Experience Level */}
          <div>
            <label className="text-sm font-medium text-secondary-900 dark:text-secondary-100 mb-3 block">
              Experience Level <span className="text-error-500">*</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {Object.entries(EXPERIENCE_LEVELS).map(([key, value]) => (
                <SelectButton
                  key={value}
                  selected={selectedExperienceLevel === value}
                  onClick={() => setValue('experienceLevel', value as JobPostingFormData['experienceLevel'], { shouldValidate: true })}
                >
                  {EXPERIENCE_LABELS[key] ?? key}
                </SelectButton>
              ))}
            </div>
            {errors.experienceLevel && (
              <p className="text-sm text-error-600 dark:text-error-400 mt-1">{errors.experienceLevel.message}</p>
            )}
          </div>

          {/* Remote Type */}
          <div>
            <label className="text-sm font-medium text-secondary-900 dark:text-secondary-100 mb-3 block">
              Work Type <span className="text-error-500">*</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {Object.entries(REMOTE_TYPES).map(([key, value]) => (
                <SelectButton
                  key={value}
                  selected={selectedRemoteType === value}
                  onClick={() => setValue('remoteType', value as JobPostingFormData['remoteType'], { shouldValidate: true })}
                >
                  {REMOTE_LABELS[key] ?? key}
                </SelectButton>
              ))}
            </div>
            {errors.remoteType && (
              <p className="text-sm text-error-600 dark:text-error-400 mt-1">{errors.remoteType.message}</p>
            )}
          </div>

          {/* Job Status — edit mode only */}
          {mode === 'edit' && (
            <div>
              <label className="text-sm font-medium text-secondary-900 dark:text-secondary-100 mb-3 block">
                Job Status
              </label>
              <div className="flex flex-wrap gap-2">
                {Object.entries(JOB_STATUS).map(([key, value]) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setValue('status', value as JobPostingFormData['status'], { shouldValidate: true })}
                    className={[
                      'px-4 py-2 rounded-lg text-sm font-medium border-2 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
                      selectedStatus === value
                        ? STATUS_COLORS[key]
                        : 'bg-white text-secondary-500 border-secondary-200 hover:border-secondary-400 dark:bg-secondary-800 dark:text-secondary-400 dark:border-secondary-700',
                    ].join(' ')}
                  >
                    {STATUS_LABELS[key] ?? key}
                  </button>
                ))}
              </div>
              <p className="text-xs text-secondary-500 dark:text-secondary-400 mt-2">
                Only <span className="font-medium text-success-700 dark:text-success-400">Open</span> jobs are visible to job seekers.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Job Details */}
      <Card>
        <CardHeader>
          <CardTitle>Job Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-secondary-900 dark:text-secondary-100 mb-2 block">
              Description <span className="text-error-500">*</span>
            </label>
            <textarea
              className={TEXTAREA_CLASS}
              placeholder="Describe the role, responsibilities, and what makes this opportunity exciting..."
              {...register('description')}
            />
            {errors.description && (
              <p className="text-sm text-error-600 dark:text-error-400 mt-1">{errors.description.message}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-secondary-900 dark:text-secondary-100 mb-2 block">
              Qualifications
            </label>
            <textarea
              className={cn(TEXTAREA_CLASS, 'min-h-[100px]')}
              placeholder="List the required qualifications and skills..."
              {...register('qualifications')}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-secondary-900 dark:text-secondary-100 mb-2 block">
              Responsibilities
            </label>
            <textarea
              className={cn(TEXTAREA_CLASS, 'min-h-[100px]')}
              placeholder="Describe the key responsibilities of this role..."
              {...register('responsibilities')}
            />
          </div>
        </CardContent>
      </Card>

      {/* Skills */}
      <Card>
        <CardHeader>
          <CardTitle>Skills Required</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {skills.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="flex items-center gap-1 pr-1">
                  <span>{skill}</span>
                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    className="ml-1 rounded-full hover:bg-secondary-300 dark:hover:bg-secondary-600 p-0.5 transition-colors"
                    aria-label={`Remove ${skill}`}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}
          <div className="flex gap-2">
            <Input
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addSkill();
                }
              }}
              placeholder="Type a skill and press Enter (e.g. React, TypeScript)..."
              className="flex-1"
            />
            <Button type="button" variant="outline" onClick={addSkill} disabled={!skillInput.trim()}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          {errors.skills && (
            <p className="text-sm text-error-600 dark:text-error-400">{errors.skills.message}</p>
          )}
          <p className="text-xs text-secondary-500 dark:text-secondary-400">
            {skills.length} skill{skills.length !== 1 ? 's' : ''} added — minimum 1 required
          </p>
        </CardContent>
      </Card>

      {/* Salary */}
      <Card>
        <CardHeader>
          <CardTitle>Salary Information (Optional)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              type="number"
              label="Minimum Salary"
              placeholder="50000"
              error={errors.salaryMin?.message}
              {...register('salaryMin', { valueAsNumber: true })}
            />
            <Input
              type="number"
              label="Maximum Salary"
              placeholder="80000"
              error={errors.salaryMax?.message}
              {...register('salaryMax', { valueAsNumber: true })}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Currency"
              placeholder="USD"
              maxLength={3}
              error={errors.salaryCurrency?.message}
              {...register('salaryCurrency')}
            />

            <div>
              <label className="text-sm font-medium text-secondary-900 dark:text-secondary-100 mb-3 block">
                Salary Period
              </label>
              <div className="flex gap-2">
                {Object.entries(SALARY_PERIODS).map(([key, value]) => (
                  <SelectButton
                    key={value}
                    selected={selectedSalaryPeriod === value}
                    onClick={() => setValue('salaryPeriod', value as JobPostingFormData['salaryPeriod'], { shouldValidate: true })}
                  >
                    {SALARY_PERIOD_LABELS[key] ?? key}
                  </SelectButton>
                ))}
              </div>
            </div>
          </div>

          <p className="text-sm text-secondary-600 dark:text-secondary-400">
            Providing salary information helps attract qualified candidates.
          </p>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-3 pt-6">
        <Button type="button" variant="outline" onClick={() => window.history.back()}>
          Cancel
        </Button>
        <Button type="submit" loading={loading} disabled={loading}>
          {mode === 'edit' ? 'Update Job Posting' : 'Post Job'}
        </Button>
      </div>
    </form>
  );
};
