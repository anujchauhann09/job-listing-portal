'use client';

import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { JobApplication, ApplicationStatus } from '@/types/job';
import { 
  Clock,
  CheckCircle,
  XCircle,
  Star,
  Eye,
  Calendar,
  Building,
  MapPin,
  DollarSign,
  FileText,
  Mail,
  Phone,
  User,
  ArrowLeft,
  Download
} from 'lucide-react';

interface ApplicationDetailProps {
  application: JobApplication;
  onStatusChange?: (applicationId: string, newStatus: ApplicationStatus) => void;
  onBack?: () => void;
  isEmployerView?: boolean;
  loading?: boolean;
  className?: string;
}

const statusConfig = {
  pending: {
    label: 'Pending Review',
    variant: 'secondary' as const,
    icon: Clock,
    color: 'text-secondary-600 dark:text-secondary-400',
    description: 'Application is awaiting review'
  },
  reviewed: {
    label: 'Under Review',
    variant: 'primary' as const,
    icon: Eye,
    color: 'text-primary-600 dark:text-primary-400',
    description: 'Application is being reviewed'
  },
  shortlisted: {
    label: 'Shortlisted',
    variant: 'success' as const,
    icon: Star,
    color: 'text-success-600 dark:text-success-400',
    description: 'Candidate has been shortlisted'
  },
  rejected: {
    label: 'Not Selected',
    variant: 'error' as const,
    icon: XCircle,
    color: 'text-error-600 dark:text-error-400',
    description: 'Application was not successful'
  },
  hired: {
    label: 'Hired',
    variant: 'success' as const,
    icon: CheckCircle,
    color: 'text-success-600 dark:text-success-400',
    description: 'Candidate has been hired'
  },
};

export function ApplicationDetail({
  application,
  onStatusChange,
  onBack,
  isEmployerView = false,
  loading = false,
  className
}: ApplicationDetailProps) {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const config = statusConfig[application.status];
  const StatusIcon = config.icon;
  const job = application.job;
  const jobSeeker = application.jobSeeker;

  const getNextActions = () => {
    switch (application.status) {
      case 'pending':
        return [
          { label: 'Mark as Reviewed', status: 'reviewed' as ApplicationStatus, variant: 'primary' as const },
          { label: 'Shortlist', status: 'shortlisted' as ApplicationStatus, variant: 'primary' as const },
          { label: 'Reject', status: 'rejected' as ApplicationStatus, variant: 'outline' as const },
        ];
      case 'reviewed':
        return [
          { label: 'Shortlist', status: 'shortlisted' as ApplicationStatus, variant: 'primary' as const },
          { label: 'Reject', status: 'rejected' as ApplicationStatus, variant: 'outline' as const },
        ];
      case 'shortlisted':
        return [
          { label: 'Hire', status: 'hired' as ApplicationStatus, variant: 'primary' as const },
          { label: 'Reject', status: 'rejected' as ApplicationStatus, variant: 'outline' as const },
        ];
      default:
        return [];
    }
  };

  const nextActions = getNextActions();

  return (
    <div className={cn('space-y-6', className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {onBack && (
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
          )}
          <div>
            <h1 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100">
              Application Details
            </h1>
            <p className="text-secondary-600 dark:text-secondary-400">
              Applied {formatDate(application.appliedDate)}
            </p>
          </div>
        </div>
        
        <Badge variant={config.variant} className="text-sm">
          <StatusIcon className="h-4 w-4 mr-2" />
          {config.label}
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-secondary-900 dark:text-secondary-100 mb-4">
              Job Details
            </h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-secondary-900 dark:text-secondary-100">
                  {job?.title || 'Job Title'}
                </h3>
                <div className="flex items-center space-x-4 text-sm text-secondary-600 dark:text-secondary-400 mt-2">
                  <div className="flex items-center space-x-1">
                    <Building className="h-4 w-4" />
                    <span>{job?.employer.companyName || 'Company'}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>{job?.location || 'Location'}</span>
                  </div>
                  {job?.salaryRange && (
                    <div className="flex items-center space-x-1">
                      <DollarSign className="h-4 w-4" />
                      <span>
                        {job.salaryRange.currency} {job.salaryRange.min.toLocaleString()} - {job.salaryRange.max.toLocaleString()}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              
              {job && (
                <div className="pt-4 border-t border-secondary-200 dark:border-secondary-700">
                  <Link href={`/jobs/${job.id}`}>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      View Full Job Posting
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </Card>

          {application.coverLetter && (
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-secondary-900 dark:text-secondary-100 mb-4">
                Cover Letter
              </h2>
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <p className="text-secondary-700 dark:text-secondary-300 whitespace-pre-wrap">
                  {application.coverLetter}
                </p>
              </div>
            </Card>
          )}

          {application.resumeUrl && (
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-secondary-900 dark:text-secondary-100 mb-4">
                Resume
              </h2>
              <div className="flex items-center justify-between p-4 bg-secondary-50 dark:bg-secondary-800 rounded-lg">
                <div className="flex items-center space-x-3">
                  <FileText className="h-8 w-8 text-primary-600 dark:text-primary-400" />
                  <div>
                    <p className="font-medium text-secondary-900 dark:text-secondary-100">
                      Resume.pdf
                    </p>
                    <p className="text-sm text-secondary-600 dark:text-secondary-400">
                      Attached to application
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <a href={application.resumeUrl} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                  </a>
                  <a href={application.resumeUrl} download>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                  </a>
                </div>
              </div>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          {isEmployerView && jobSeeker && (
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-secondary-900 dark:text-secondary-100 mb-4">
                Applicant Information
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <User className="h-5 w-5 text-secondary-600 dark:text-secondary-400" />
                  <div>
                    <p className="font-medium text-secondary-900 dark:text-secondary-100">
                      {jobSeeker.firstName} {jobSeeker.lastName}
                    </p>
                    <p className="text-sm text-secondary-600 dark:text-secondary-400">
                      Job Seeker
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-secondary-600 dark:text-secondary-400" />
                  <div>
                    <p className="text-sm text-secondary-900 dark:text-secondary-100">
                      {jobSeeker.email}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          )}

          <Card className="p-6">
            <h2 className="text-lg font-semibold text-secondary-900 dark:text-secondary-100 mb-4">
              Application Status
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <StatusIcon className={cn('h-6 w-6', config.color)} />
                <div>
                  <p className="font-medium text-secondary-900 dark:text-secondary-100">
                    {config.label}
                  </p>
                  <p className="text-sm text-secondary-600 dark:text-secondary-400">
                    {config.description}
                  </p>
                </div>
              </div>
              
              <div className="pt-4 border-t border-secondary-200 dark:border-secondary-700">
                <div className="flex items-center space-x-2 text-sm text-secondary-600 dark:text-secondary-400">
                  <Calendar className="h-4 w-4" />
                  <span>Applied {formatDate(application.appliedDate)}</span>
                </div>
              </div>
            </div>
          </Card>

          {isEmployerView && onStatusChange && nextActions.length > 0 && (
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-secondary-900 dark:text-secondary-100 mb-4">
                Actions
              </h2>
              
              <div className="space-y-2">
                {nextActions.map((action) => (
                  <Button
                    key={action.status}
                    variant={action.variant}
                    size="sm"
                    onClick={() => onStatusChange(application.id, action.status)}
                    disabled={loading}
                    className="w-full justify-center"
                  >
                    {action.label}
                  </Button>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}