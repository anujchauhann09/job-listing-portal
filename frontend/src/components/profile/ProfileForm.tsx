'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { 
  jobSeekerProfileSchema, 
  employerProfileSchema,
  JobSeekerProfileFormData,
  EmployerProfileFormData 
} from '@/validators/profile';
import { UserRole, JobSeekerProfile, EmployerProfile } from '@/types/auth';
import { cn } from '@/lib/utils';
import { User, Building2, MapPin, Briefcase, GraduationCap, Plus, X } from 'lucide-react';

interface ProfileFormProps {
  userRole: UserRole;
  initialData?: Partial<JobSeekerProfile | EmployerProfile>;
  onSubmit: (data: JobSeekerProfileFormData | EmployerProfileFormData) => Promise<void>;
  loading?: boolean;
  error?: string;
  className?: string;
}

const companySizeOptions = [
  { value: '1-10', label: '1-10 employees' },
  { value: '11-50', label: '11-50 employees' },
  { value: '51-200', label: '51-200 employees' },
  { value: '201-500', label: '201-500 employees' },
  { value: '501-1000', label: '501-1000 employees' },
  { value: '1000+', label: '1000+ employees' },
];

const industryOptions = [
  'Technology', 'Healthcare', 'Finance', 'Education', 'Retail', 'Manufacturing',
  'Consulting', 'Marketing', 'Real Estate', 'Non-profit', 'Government', 'Other'
];

export function ProfileForm({ 
  userRole, 
  initialData, 
  onSubmit, 
  loading = false, 
  error, 
  className 
}: ProfileFormProps) {
  const [skills, setSkills] = useState<string[]>(
    userRole === 'job-seeker' && initialData && 'skills' in initialData 
      ? initialData.skills || [] 
      : []
  );
  const [newSkill, setNewSkill] = useState('');

  const isJobSeeker = userRole === 'job-seeker';
  const schema = isJobSeeker ? jobSeekerProfileSchema : employerProfileSchema;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<JobSeekerProfileFormData | EmployerProfileFormData>({
    resolver: zodResolver(schema),
    defaultValues: initialData as JobSeekerProfileFormData | EmployerProfileFormData || {},
  });

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim()) && skills.length < 20) {
      const updatedSkills = [...skills, newSkill.trim()];
      setSkills(updatedSkills);
      setValue('skills' as keyof JobSeekerProfileFormData, updatedSkills);
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    const updatedSkills = skills.filter(skill => skill !== skillToRemove);
    setSkills(updatedSkills);
    setValue('skills' as keyof JobSeekerProfileFormData, updatedSkills);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };

  const onFormSubmit = async (data: JobSeekerProfileFormData | EmployerProfileFormData) => {
    try {
      if (isJobSeeker) {
        (data as JobSeekerProfileFormData).skills = skills;
      }
      await onSubmit(data);
    } catch (error) {
    }
  };

  return (
    <Card className={cn('w-full max-w-2xl mx-auto', className)}>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          {isJobSeeker ? (
            <>
              <User className="h-5 w-5" />
              <span>Job Seeker Profile</span>
            </>
          ) : (
            <>
              <Building2 className="h-5 w-5" />
              <span>Company Profile</span>
            </>
          )}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
          {isJobSeeker && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="First Name"
                  {...register('firstName' as keyof JobSeekerProfileFormData)}
                  error={(errors as any).firstName?.message}
                  required
                />
                <Input
                  label="Last Name"
                  {...register('lastName' as keyof JobSeekerProfileFormData)}
                  error={(errors as any).lastName?.message}
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  type="tel"
                  label="Phone Number"
                  placeholder="+1 (555) 123-4567"
                  {...register('phone' as keyof JobSeekerProfileFormData)}
                  error={(errors as any).phone?.message}
                />
                <Input
                  label="Location"
                  placeholder="City, State/Country"
                  {...register('location' as keyof JobSeekerProfileFormData)}
                  error={(errors as any).location?.message}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-900 dark:text-secondary-100 mb-2">
                  Professional Bio
                </label>
                <textarea
                  {...register('bio' as keyof JobSeekerProfileFormData)}
                  rows={4}
                  className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:border-secondary-600 dark:bg-secondary-800 dark:text-secondary-100"
                  placeholder="Tell us about yourself, your experience, and career goals..."
                />
                {(errors as any).bio && (
                  <p className="mt-1 text-sm text-error-600 dark:text-error-400">
                    {(errors as any).bio.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-900 dark:text-secondary-100 mb-2">
                  Skills
                </label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {skills.map((skill, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="flex items-center space-x-1"
                    >
                      <span>{skill}</span>
                      <button
                        type="button"
                        onClick={() => removeSkill(skill)}
                        className="ml-1 hover:text-error-600"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex space-x-2">
                  <Input
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Add a skill..."
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addSkill}
                    disabled={!newSkill.trim() || skills.length >= 20}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <p className="mt-1 text-xs text-secondary-600 dark:text-secondary-400">
                  {skills.length}/20 skills added
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-900 dark:text-secondary-100 mb-2">
                  Work Experience *
                </label>
                <textarea
                  {...register('experience' as keyof JobSeekerProfileFormData)}
                  rows={6}
                  className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:border-secondary-600 dark:bg-secondary-800 dark:text-secondary-100"
                  placeholder="Describe your work experience, including job titles, companies, and key achievements..."
                  required
                />
                {(errors as any).experience && (
                  <p className="mt-1 text-sm text-error-600 dark:text-error-400">
                    {(errors as any).experience.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-900 dark:text-secondary-100 mb-2">
                  Education *
                </label>
                <textarea
                  {...register('education' as keyof JobSeekerProfileFormData)}
                  rows={4}
                  className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:border-secondary-600 dark:bg-secondary-800 dark:text-secondary-100"
                  placeholder="List your educational background, degrees, certifications, and relevant coursework..."
                  required
                />
                {(errors as any).education && (
                  <p className="mt-1 text-sm text-error-600 dark:text-error-400">
                    {(errors as any).education.message}
                  </p>
                )}
              </div>
            </>
          )}

          {!isJobSeeker && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Company Name"
                  {...register('companyName' as keyof EmployerProfileFormData)}
                  error={(errors as any).companyName?.message}
                  required
                />
                <Input
                  label="Contact Person"
                  {...register('contactPerson' as keyof EmployerProfileFormData)}
                  error={(errors as any).contactPerson?.message}
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-secondary-900 dark:text-secondary-100 mb-2">
                    Industry *
                  </label>
                  <select
                    {...register('industry' as keyof EmployerProfileFormData)}
                    className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:border-secondary-600 dark:bg-secondary-800 dark:text-secondary-100"
                    required
                  >
                    <option value="">Select industry</option>
                    {industryOptions.map((industry) => (
                      <option key={industry} value={industry}>
                        {industry}
                      </option>
                    ))}
                  </select>
                  {(errors as any).industry && (
                    <p className="mt-1 text-sm text-error-600 dark:text-error-400">
                      {(errors as any).industry.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-900 dark:text-secondary-100 mb-2">
                    Company Size *
                  </label>
                  <select
                    {...register('companySize' as keyof EmployerProfileFormData)}
                    className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:border-secondary-600 dark:bg-secondary-800 dark:text-secondary-100"
                    required
                  >
                    <option value="">Select company size</option>
                    {companySizeOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {(errors as any).companySize && (
                    <p className="mt-1 text-sm text-error-600 dark:text-error-400">
                      {(errors as any).companySize.message}
                    </p>
                  )}
                </div>
              </div>

              <Input
                type="url"
                label="Company Website"
                placeholder="https://www.company.com"
                {...register('website' as keyof EmployerProfileFormData)}
                error={(errors as any).website?.message}
              />

              <div>
                <label className="block text-sm font-medium text-secondary-900 dark:text-secondary-100 mb-2">
                  Company Description *
                </label>
                <textarea
                  {...register('description' as keyof EmployerProfileFormData)}
                  rows={6}
                  className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:border-secondary-600 dark:bg-secondary-800 dark:text-secondary-100"
                  placeholder="Describe your company, its mission, values, and what makes it a great place to work..."
                  required
                />
                {(errors as any).description && (
                  <p className="mt-1 text-sm text-error-600 dark:text-error-400">
                    {(errors as any).description.message}
                  </p>
                )}
              </div>
            </>
          )}

          {error && (
            <div className="p-3 rounded-lg bg-error-50 border border-error-200 dark:bg-error-900/20 dark:border-error-800">
              <p className="text-sm text-error-600 dark:text-error-400">{error}</p>
            </div>
          )}

          <div className="flex justify-end">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={loading || isSubmitting}
              disabled={loading || isSubmitting}
            >
              Save Profile
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}