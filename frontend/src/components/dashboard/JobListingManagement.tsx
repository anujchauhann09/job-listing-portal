'use client';

import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { 
  Plus,
  Edit,
  Eye,
  Users,
  Calendar,
  MapPin,
  DollarSign,
  MoreVertical,
  Pause,
  Play,
  Trash2,
} from 'lucide-react';

interface JobListing {
  id: string;
  title: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'remote';
  salaryRange?: {
    min: number;
    max: number;
    currency: string;
  };
  status: 'active' | 'closed' | 'draft';
  applicationsCount: number;
  postedDate: Date;
  updatedDate: Date;
}

interface JobListingManagementProps {
  jobs: JobListing[];
  onEdit?: (jobId: string) => void;
  onToggleStatus?: (jobId: string, newStatus: 'active' | 'closed') => void;
  onDelete?: (jobId: string) => void;
  className?: string;
}

const statusConfig = {
  active: {
    label: 'Active',
    variant: 'success' as const,
    color: 'text-success-600 dark:text-success-400',
  },
  closed: {
    label: 'Closed',
    variant: 'secondary' as const,
    color: 'text-secondary-600 dark:text-secondary-400',
  },
  draft: {
    label: 'Draft',
    variant: 'outline' as const,
    color: 'text-secondary-600 dark:text-secondary-400',
  },
};

const jobTypeConfig = {
  'full-time': { label: 'Full-time', variant: 'primary' as const },
  'part-time': { label: 'Part-time', variant: 'secondary' as const },
  'contract': { label: 'Contract', variant: 'outline' as const },
  'remote': { label: 'Remote', variant: 'success' as const },
};

export function JobListingManagement({ 
  jobs, 
  onEdit, 
  onToggleStatus, 
  onDelete,
  className 
}: JobListingManagementProps) {
  const [expandedJob, setExpandedJob] = React.useState<string | null>(null);

  const formatSalary = (salaryRange?: JobListing['salaryRange']) => {
    if (!salaryRange) return null;
    
    const { min, max, currency } = salaryRange;
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
    
    return `${formatter.format(min)} - ${formatter.format(max)}`;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  if (jobs.length === 0) {
    return (
      <div className={cn(
        'bg-white dark:bg-secondary-800 rounded-lg border border-secondary-200 dark:border-secondary-700 p-6',
        className
      )}>
        <h3 className="text-lg font-semibold text-secondary-900 dark:text-secondary-100 mb-4">
          Job Listings
        </h3>
        <div className="text-center py-8">
          <Plus className="h-12 w-12 text-secondary-400 dark:text-secondary-500 mx-auto mb-4" />
          <p className="text-secondary-600 dark:text-secondary-400 mb-4">
            No job listings yet
          </p>
          <Button variant="primary" size="sm" asChild>
            <Link href="/dashboard/employer/jobs/new">
              Post Your First Job
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      'bg-white dark:bg-secondary-800 rounded-lg border border-secondary-200 dark:border-secondary-700 p-6',
      className
    )}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-secondary-900 dark:text-secondary-100">
          Job Listings ({jobs.length})
        </h3>
        <Button variant="primary" size="sm" asChild>
          <Link href="/dashboard/employer/jobs/new">
            <Plus className="h-4 w-4 mr-2" />
            Post Job
          </Link>
        </Button>
      </div>
      
      <div className="space-y-4">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="border border-secondary-100 dark:border-secondary-700 rounded-lg p-4 hover:bg-secondary-50 dark:hover:bg-secondary-700/50 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-sm font-medium text-secondary-900 dark:text-secondary-100 truncate">
                    {job.title}
                  </h4>
                  <div className="flex items-center space-x-2 ml-4">
                    <Badge variant={statusConfig[job.status].variant}>
                      {statusConfig[job.status].label}
                    </Badge>
                    <div className="relative">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="p-1 h-6 w-6"
                        onClick={() => setExpandedJob(expandedJob === job.id ? null : job.id)}
                      >
                        <MoreVertical className="h-3 w-3" />
                      </Button>
                      
                      {expandedJob === job.id && (
                        <div className="absolute right-0 mt-1 w-48 rounded-lg border border-secondary-200 bg-white shadow-medium dark:border-secondary-800 dark:bg-secondary-900 z-10">
                          <div className="py-1">
                            <button
                              onClick={() => {
                                onEdit?.(job.id);
                                setExpandedJob(null);
                              }}
                              className="flex w-full items-center px-3 py-2 text-sm text-secondary-700 hover:bg-secondary-100 dark:text-secondary-300 dark:hover:bg-secondary-800"
                            >
                              <Edit className="mr-2 h-3 w-3" />
                              Edit Job
                            </button>
                            <Link
                              href={`/jobs/${job.id}`}
                              className="flex w-full items-center px-3 py-2 text-sm text-secondary-700 hover:bg-secondary-100 dark:text-secondary-300 dark:hover:bg-secondary-800"
                              onClick={() => setExpandedJob(null)}
                            >
                              <Eye className="mr-2 h-3 w-3" />
                              View Job
                            </Link>
                            <button
                              onClick={() => {
                                onToggleStatus?.(job.id, job.status === 'active' ? 'closed' : 'active');
                                setExpandedJob(null);
                              }}
                              className="flex w-full items-center px-3 py-2 text-sm text-secondary-700 hover:bg-secondary-100 dark:text-secondary-300 dark:hover:bg-secondary-800"
                            >
                              {job.status === 'active' ? (
                                <>
                                  <Pause className="mr-2 h-3 w-3" />
                                  Close Job
                                </>
                              ) : (
                                <>
                                  <Play className="mr-2 h-3 w-3" />
                                  Reopen Job
                                </>
                              )}
                            </button>
                            <div className="border-t border-secondary-200 dark:border-secondary-800">
                              <button
                                onClick={() => {
                                  onDelete?.(job.id);
                                  setExpandedJob(null);
                                }}
                                className="flex w-full items-center px-3 py-2 text-sm text-error-600 hover:bg-error-50 dark:text-error-400 dark:hover:bg-error-900/20"
                              >
                                <Trash2 className="mr-2 h-3 w-3" />
                                Delete Job
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 text-xs text-secondary-600 dark:text-secondary-400 mb-2">
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-3 w-3" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-3 w-3" />
                    <span>Posted {formatDate(job.postedDate)}</span>
                  </div>
                  {job.salaryRange && (
                    <div className="flex items-center space-x-1">
                      <DollarSign className="h-3 w-3" />
                      <span>{formatSalary(job.salaryRange)}</span>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Badge variant={jobTypeConfig[job.type].variant}>
                      {jobTypeConfig[job.type].label}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-xs text-secondary-600 dark:text-secondary-400">
                    <div className="flex items-center space-x-1">
                      <Users className="h-3 w-3" />
                      <span>{job.applicationsCount} applications</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs h-6 px-2"
                      asChild
                    >
                      <Link href={`/dashboard/jobs/${job.id}/applications`}>
                        View Applications
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {jobs.length > 5 && (
        <div className="mt-4 text-center">
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard/jobs">
              View All Jobs
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}