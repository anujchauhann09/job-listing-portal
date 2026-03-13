'use client';

import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { JobApplication } from '@/types/job';
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
  Trash2
} from 'lucide-react';

interface MyApplicationsProps {
  applications: JobApplication[];
  onWithdraw?: (applicationId: string) => void;
  onViewJob?: (jobId: string) => void;
  loading?: boolean;
  className?: string;
}

const statusConfig = {
  pending: {
    label: 'Pending Review',
    variant: 'secondary' as const,
    icon: Clock,
    color: 'text-secondary-600 dark:text-secondary-400',
    description: 'Your application is being reviewed'
  },
  reviewed: {
    label: 'Under Review',
    variant: 'primary' as const,
    icon: Eye,
    color: 'text-primary-600 dark:text-primary-400',
    description: 'Employer is reviewing your application'
  },
  shortlisted: {
    label: 'Shortlisted',
    variant: 'success' as const,
    icon: Star,
    color: 'text-success-600 dark:text-success-400',
    description: 'Congratulations! You\'ve been shortlisted'
  },
  rejected: {
    label: 'Not Selected',
    variant: 'error' as const,
    icon: XCircle,
    color: 'text-error-600 dark:text-error-400',
    description: 'Unfortunately, you were not selected'
  },
  hired: {
    label: 'Hired',
    variant: 'success' as const,
    icon: CheckCircle,
    color: 'text-success-600 dark:text-success-400',
    description: 'Congratulations! You got the job'
  },
};

export function MyApplications({
  applications,
  onWithdraw,
  onViewJob,
  loading = false,
  className
}: MyApplicationsProps) {
  const formatDate = (date: Date) => {
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    
    return date.toLocaleDateString();
  };

  const getStatusCounts = () => {
    return {
      pending: applications.filter(app => app.status === 'pending').length,
      reviewed: applications.filter(app => app.status === 'reviewed').length,
      shortlisted: applications.filter(app => app.status === 'shortlisted').length,
      rejected: applications.filter(app => app.status === 'rejected').length,
      hired: applications.filter(app => app.status === 'hired').length,
    };
  };

  const statusCounts = getStatusCounts();
  const sortedApplications = [...applications].sort((a, b) => 
    b.appliedDate.getTime() - a.appliedDate.getTime()
  );

  if (loading) {
    return (
      <div className={cn('space-y-4', className)}>
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <div className="h-32 bg-secondary-200 dark:bg-secondary-700 rounded"></div>
          </Card>
        ))}
      </div>
    );
  }

  if (applications.length === 0) {
    return (
      <Card className={cn('text-center py-12', className)}>
        <FileText className="h-12 w-12 text-secondary-400 dark:text-secondary-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-secondary-900 dark:text-secondary-100 mb-2">
          No Applications Yet
        </h3>
        <p className="text-secondary-600 dark:text-secondary-400 mb-6">
          Start applying to jobs to track your applications here
        </p>
        <Link href="/jobs">
          <Button variant="primary">
            Browse Jobs
          </Button>
        </Link>
      </Card>
    );
  }

  return (
    <div className={cn('space-y-6', className)}>
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        {Object.entries(statusCounts).map(([status, count]) => {
          const config = statusConfig[status as keyof typeof statusConfig];
          const Icon = config.icon;
          
          return (
            <Card key={status} className="text-center p-4">
              <div className="flex items-center justify-center mb-2">
                <Icon className={cn('h-5 w-5', config.color)} />
              </div>
              <div className="text-2xl font-bold text-secondary-900 dark:text-secondary-100">
                {count}
              </div>
              <div className="text-sm text-secondary-600 dark:text-secondary-400">
                {config.label}
              </div>
            </Card>
          );
        })}
      </div>

      <div className="space-y-4">
        {sortedApplications.map((application) => {
          const config = statusConfig[application.status];
          const StatusIcon = config.icon;
          const job = application.job;
          
          return (
            <Card key={application.id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-secondary-900 dark:text-secondary-100">
                        {job?.title || 'Job Title'}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-secondary-600 dark:text-secondary-400 mt-1">
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
                    
                    <Badge variant={config.variant} className="ml-4">
                      <StatusIcon className="h-3 w-3 mr-1" />
                      {config.label}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-secondary-600 dark:text-secondary-400 mb-3">
                    {config.description}
                  </p>
                  
                  <div className="flex items-center space-x-4 text-xs text-secondary-500 dark:text-secondary-500">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span>Applied {formatDate(application.appliedDate)}</span>
                    </div>
                    {application.resumeUrl && (
                      <div className="flex items-center space-x-1">
                        <FileText className="h-3 w-3" />
                        <span>Resume attached</span>
                      </div>
                    )}
                    {application.coverLetter && (
                      <span>Cover letter included</span>
                    )}
                  </div>
                </div>
              </div>

              {application.coverLetter && (
                <div className="mb-4 p-3 bg-secondary-50 dark:bg-secondary-800 rounded-lg">
                  <h5 className="text-sm font-medium text-secondary-900 dark:text-secondary-100 mb-2">
                    Your Cover Letter:
                  </h5>
                  <p className="text-sm text-secondary-700 dark:text-secondary-300 line-clamp-3">
                    {application.coverLetter}
                  </p>
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t border-secondary-200 dark:border-secondary-700">
                <div className="flex items-center space-x-2">
                  {application.resumeUrl && (
                    <a href={application.resumeUrl} target="_blank" rel="noopener noreferrer">
                      <Button
                        variant="ghost"
                        size="sm"
                      >
                        <FileText className="h-4 w-4 mr-1" />
                        View Resume
                      </Button>
                    </a>
                  )}
                  {onViewJob && job && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onViewJob(job.id)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View Job
                    </Button>
                  )}
                </div>
                
                <div className="flex items-center space-x-2">
                  {application.status === 'pending' && onWithdraw && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onWithdraw(application.id)}
                      className="text-error-600 hover:text-error-700 hover:bg-error-50 dark:text-error-400 dark:hover:text-error-300 dark:hover:bg-error-900/20"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Withdraw
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}