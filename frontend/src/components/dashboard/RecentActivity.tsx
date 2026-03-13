'use client';

import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { 
  Clock, 
  MapPin, 
  Building, 
  ExternalLink,
  Eye,
  FileText,
} from 'lucide-react';

interface JobApplication {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  appliedDate: Date;
  status: 'pending' | 'reviewed' | 'shortlisted' | 'rejected' | 'hired';
  jobId: string;
}

interface RecentActivityProps {
  applications: JobApplication[];
  className?: string;
}

const statusConfig = {
  pending: {
    label: 'Pending',
    variant: 'secondary' as const,
    color: 'text-secondary-600 dark:text-secondary-400',
  },
  reviewed: {
    label: 'Reviewed',
    variant: 'primary' as const,
    color: 'text-primary-600 dark:text-primary-400',
  },
  shortlisted: {
    label: 'Shortlisted',
    variant: 'success' as const,
    color: 'text-success-600 dark:text-success-400',
  },
  rejected: {
    label: 'Rejected',
    variant: 'error' as const,
    color: 'text-error-600 dark:text-error-400',
  },
  hired: {
    label: 'Hired',
    variant: 'success' as const,
    color: 'text-success-600 dark:text-success-400',
  },
};

export function RecentActivity({ applications, className }: RecentActivityProps) {
  const formatDate = (date: Date) => {
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    
    return date.toLocaleDateString();
  };

  if (applications.length === 0) {
    return (
      <div className={cn(
        'bg-white dark:bg-secondary-800 rounded-lg border border-secondary-200 dark:border-secondary-700 p-6',
        className
      )}>
        <h3 className="text-lg font-semibold text-secondary-900 dark:text-secondary-100 mb-4">
          Recent Applications
        </h3>
        <div className="text-center py-8">
          <FileText className="h-12 w-12 text-secondary-400 dark:text-secondary-500 mx-auto mb-4" />
          <p className="text-secondary-600 dark:text-secondary-400 mb-4">
            No applications yet
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
          Recent Applications
        </h3>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/dashboard/applications">
            View All
          </Link>
        </Button>
      </div>
      
      <div className="space-y-4">
        {applications.slice(0, 5).map((application) => (
          <div
            key={application.id}
            className="flex items-start space-x-4 p-4 rounded-lg border border-secondary-100 dark:border-secondary-700 hover:bg-secondary-50 dark:hover:bg-secondary-700/50 transition-colors"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-secondary-900 dark:text-secondary-100 truncate">
                    {application.jobTitle}
                  </h4>
                  <div className="flex items-center space-x-4 mt-1 text-xs text-secondary-600 dark:text-secondary-400">
                    <div className="flex items-center space-x-1">
                      <Building className="h-3 w-3" />
                      <span>{application.company}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-3 w-3" />
                      <span>{application.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{formatDate(application.appliedDate)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 ml-4">
                  <Badge variant={statusConfig[application.status].variant}>
                    {statusConfig[application.status].label}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-1 h-6 w-6"
                    asChild
                  >
                    <Link href={`/jobs/${application.jobId}`}>
                      <Eye className="h-3 w-3" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {applications.length > 5 && (
        <div className="mt-4 text-center">
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard/applications">
              <ExternalLink className="h-4 w-4 mr-2" />
              View All {applications.length} Applications
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}