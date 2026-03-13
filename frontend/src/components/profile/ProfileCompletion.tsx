'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { User, JobSeekerProfile, EmployerProfile } from '@/types/auth';
import { cn } from '@/lib/utils';
import { CheckCircle, Circle, AlertCircle, TrendingUp } from 'lucide-react';

interface ProfileCompletionProps {
  user: User;
  onEditProfile?: () => void;
  onUploadResume?: () => void;
  onUploadLogo?: () => void;
  className?: string;
}

interface CompletionItem {
  id: string;
  label: string;
  completed: boolean;
  required: boolean;
  action?: () => void;
  actionLabel?: string;
}

export function ProfileCompletion({ 
  user, 
  onEditProfile, 
  onUploadResume, 
  onUploadLogo, 
  className 
}: ProfileCompletionProps) {
  const isJobSeeker = user.role === 'job-seeker';
  const profile = user.profile as JobSeekerProfile | EmployerProfile;

  const getCompletionItems = (): CompletionItem[] => {
    if (isJobSeeker) {
      const jobSeekerProfile = profile as JobSeekerProfile;
      return [
        {
          id: 'basic-info',
          label: 'Basic Information',
          completed: !!(jobSeekerProfile.firstName && jobSeekerProfile.lastName && jobSeekerProfile.location),
          required: true,
          action: onEditProfile,
          actionLabel: 'Complete'
        },
        {
          id: 'contact',
          label: 'Contact Information',
          completed: !!jobSeekerProfile.phone,
          required: false,
          action: onEditProfile,
          actionLabel: 'Add Phone'
        },
        {
          id: 'bio',
          label: 'Professional Bio',
          completed: !!(jobSeekerProfile.bio && jobSeekerProfile.bio.length >= 50),
          required: false,
          action: onEditProfile,
          actionLabel: 'Write Bio'
        },
        {
          id: 'skills',
          label: 'Skills',
          completed: !!(jobSeekerProfile.skills && jobSeekerProfile.skills.length >= 3),
          required: true,
          action: onEditProfile,
          actionLabel: 'Add Skills'
        },
        {
          id: 'experience',
          label: 'Work Experience',
          completed: !!(jobSeekerProfile.experience && jobSeekerProfile.experience.length >= 100),
          required: true,
          action: onEditProfile,
          actionLabel: 'Add Experience'
        },
        {
          id: 'education',
          label: 'Education',
          completed: !!(jobSeekerProfile.education && jobSeekerProfile.education.length >= 50),
          required: true,
          action: onEditProfile,
          actionLabel: 'Add Education'
        },
        {
          id: 'resume',
          label: 'Resume Upload',
          completed: !!jobSeekerProfile.resumeUrl,
          required: false,
          action: onUploadResume,
          actionLabel: 'Upload Resume'
        }
      ];
    } else {
      const employerProfile = profile as EmployerProfile;
      return [
        {
          id: 'company-info',
          label: 'Company Information',
          completed: !!(employerProfile.companyName && employerProfile.industry && employerProfile.companySize),
          required: true,
          action: onEditProfile,
          actionLabel: 'Complete'
        },
        {
          id: 'contact-person',
          label: 'Contact Person',
          completed: !!employerProfile.contactPerson,
          required: true,
          action: onEditProfile,
          actionLabel: 'Add Contact'
        },
        {
          id: 'website',
          label: 'Company Website',
          completed: !!employerProfile.website,
          required: false,
          action: onEditProfile,
          actionLabel: 'Add Website'
        },
        {
          id: 'description',
          label: 'Company Description',
          completed: !!(employerProfile.description && employerProfile.description.length >= 100),
          required: true,
          action: onEditProfile,
          actionLabel: 'Write Description'
        },
        {
          id: 'logo',
          label: 'Company Logo',
          completed: !!employerProfile.logoUrl,
          required: false,
          action: onUploadLogo,
          actionLabel: 'Upload Logo'
        }
      ];
    }
  };

  const completionItems = getCompletionItems();
  const completedItems = completionItems.filter(item => item.completed);
  const requiredItems = completionItems.filter(item => item.required);
  const completedRequiredItems = requiredItems.filter(item => item.completed);
  
  const overallCompletion = Math.round((completedItems.length / completionItems.length) * 100);
  const requiredCompletion = Math.round((completedRequiredItems.length / requiredItems.length) * 100);

  const getCompletionColor = (completion: number) => {
    if (completion >= 80) return 'text-success-600';
    if (completion >= 50) return 'text-warning-600';
    return 'text-error-600';
  };

  const getCompletionBgColor = (completion: number) => {
    if (completion >= 80) return 'bg-success-500';
    if (completion >= 50) return 'bg-warning-500';
    return 'bg-error-500';
  };

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center text-lg">
            <TrendingUp className="h-5 w-5 mr-2" />
            Profile Completion
          </CardTitle>
          <Badge 
            variant={overallCompletion >= 80 ? 'success' : overallCompletion >= 50 ? 'warning' : 'error'}
          >
            {overallCompletion}% Complete
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-secondary-600 dark:text-secondary-400">Overall Progress</span>
            <span className={cn('font-medium', getCompletionColor(overallCompletion))}>
              {completedItems.length} of {completionItems.length} completed
            </span>
          </div>
          <div className="w-full bg-secondary-200 rounded-full h-2 dark:bg-secondary-700">
            <div
              className={cn('h-2 rounded-full transition-all duration-300', getCompletionBgColor(overallCompletion))}
              style={{ width: `${overallCompletion}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="space-y-1">
            <div className="text-2xl font-bold text-secondary-900 dark:text-secondary-100">
              {requiredCompletion}%
            </div>
            <div className="text-xs text-secondary-600 dark:text-secondary-400">
              Required Fields
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold text-secondary-900 dark:text-secondary-100">
              {completedItems.length - completedRequiredItems.length}
            </div>
            <div className="text-xs text-secondary-600 dark:text-secondary-400">
              Optional Completed
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="font-medium text-secondary-900 dark:text-secondary-100">
            Profile Sections
          </h4>
          <div className="space-y-2">
            {completionItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3 rounded-lg border border-secondary-200 dark:border-secondary-700"
              >
                <div className="flex items-center space-x-3">
                  {item.completed ? (
                    <CheckCircle className="h-5 w-5 text-success-500" />
                  ) : (
                    <Circle className="h-5 w-5 text-secondary-400" />
                  )}
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className={cn(
                        'text-sm font-medium',
                        item.completed ? 'text-secondary-900 dark:text-secondary-100' : 'text-secondary-600 dark:text-secondary-400'
                      )}>
                        {item.label}
                      </span>
                      {item.required && (
                        <Badge variant="outline" className="text-xs">
                          Required
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                {!item.completed && item.action && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={item.action}
                    className="text-xs"
                  >
                    {item.actionLabel}
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>

        {overallCompletion < 100 && (
          <div className="p-4 bg-primary-50 rounded-lg border border-primary-200 dark:bg-primary-900/20 dark:border-primary-800">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-primary-600 dark:text-primary-400 flex-shrink-0 mt-0.5" />
              <div className="space-y-2">
                <h5 className="font-medium text-primary-900 dark:text-primary-100">
                  Complete your profile to stand out
                </h5>
                <p className="text-sm text-primary-700 dark:text-primary-300">
                  {isJobSeeker 
                    ? 'A complete profile increases your chances of being discovered by employers and getting hired.'
                    : 'A complete company profile helps attract top talent and builds trust with potential candidates.'
                  }
                </p>
                {requiredCompletion < 100 && (
                  <p className="text-sm font-medium text-primary-800 dark:text-primary-200">
                    Complete all required fields to unlock full platform features.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}