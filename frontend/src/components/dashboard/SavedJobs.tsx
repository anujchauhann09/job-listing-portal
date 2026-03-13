'use client';

import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { 
  Bookmark, 
  MapPin, 
  Building, 
  Clock,
  ExternalLink,
  Trash2,
} from 'lucide-react';

interface SavedJob {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'remote';
  salaryRange?: {
    min: number;
    max: number;
    currency: string;
  };
  savedDate: Date;
  postedDate: Date;
}

interface SavedJobsProps {
  jobs: SavedJob[];
  onRemove?: (jobId: string) => void;
  className?: string;
}

const jobTypeConfig = {
  'full-time': { label: 'Full-time', variant: 'primary' as const },
  'part-time': { label: 'Part-time', variant: 'secondary' as const },
  'contract': { label: 'Contract', variant: 'outline' as const },
  'remote': { label: 'Remote', variant: 'success' as const },
};

export function SavedJobs({ jobs, onRemove, className }: SavedJobsProps) {
  const formatSalary = (salaryRange?: SavedJob['salaryRange']) => {
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
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    
    return date.toLocaleDateString();
  };

  if (jobs.length === 0) {
    return (
      <div className={cn(
        'bg-white dark:bg-secondary-800 rounded-lg border border-secondary-200 dark:border-secondary-700 p-6',
        className
      )}>
        <h3 className="text-lg font-semibold text-secondary-900 dark:text-secondary-100 mb-4">
          Saved Jobs
        </h3>
        <div className="text-center py-8">
          <Bookmark className="h-12 w-12 text-secondary-400 dark:text-secondary-500 mx-auto mb-4" />
          <p className="text-secondary-600 dark:text-secondary-400 mb-4">
            No saved jobs yet
          </p>
          <Button variant="primary" size="sm" asChild>
            <Link href="/jobs">
              Browse Jobs
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
          Saved Jobs
        </h3>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/dashboard/saved-jobs">
            View All
          </Link>
        </Button>
      </div>
      
      <div className="space-y-4">
        {jobs.slice(0, 3).map((job) => (
          <div
            key={job.id}
            className="flex items-start space-x-4 p-4 rounded-lg border border-secondary-100 dark:border-secondary-700 hover:bg-secondary-50 dark:hover:bg-secondary-700/50 transition-colors"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-secondary-900 dark:text-secondary-100 truncate">
                    {job.title}
                  </h4>
                  <div className="flex items-center space-x-4 mt-1 text-xs text-secondary-600 dark:text-secondary-400">
                    <div className="flex items-center space-x-1">
                      <Building className="h-3 w-3" />
                      <span>{job.company}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-3 w-3" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>Posted {formatDate(job.postedDate)}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 mt-2">
                    <Badge variant={jobTypeConfig[job.type].variant}>
                      {jobTypeConfig[job.type].label}
                    </Badge>
                    {job.salaryRange && (
                      <span className="text-xs text-secondary-600 dark:text-secondary-400">
                        {formatSalary(job.salaryRange)}
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-1 ml-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-1 h-6 w-6"
                    asChild
                  >
                    <Link href={`/jobs/${job.id}`}>
                      <ExternalLink className="h-3 w-3" />
                    </Link>
                  </Button>
                  {onRemove && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-1 h-6 w-6 text-error-600 hover:text-error-700 hover:bg-error-50 dark:text-error-400 dark:hover:text-error-300 dark:hover:bg-error-900/20"
                      onClick={() => onRemove(job.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {jobs.length > 3 && (
        <div className="mt-4 text-center">
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard/saved-jobs">
              <Bookmark className="h-4 w-4 mr-2" />
              View All {jobs.length} Saved Jobs
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}