'use client';

import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { 
  Users,
  Clock,
  CheckCircle,
  XCircle,
  Star,
  Eye,
  MessageSquare,
  Calendar,
  FileText,
} from 'lucide-react';

interface JobApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  applicantName: string;
  applicantEmail: string;
  appliedDate: Date;
  status: 'pending' | 'reviewed' | 'shortlisted' | 'rejected' | 'hired';
  resumeUrl?: string;
  coverLetter?: string;
}

interface ApplicationTrackingProps {
  applications: JobApplication[];
  onStatusChange?: (applicationId: string, newStatus: JobApplication['status']) => void;
  className?: string;
}

const statusConfig = {
  pending: {
    label: 'New',
    variant: 'secondary' as const,
    icon: Clock,
    color: 'text-secondary-600 dark:text-secondary-400',
  },
  reviewed: {
    label: 'Reviewed',
    variant: 'primary' as const,
    icon: Eye,
    color: 'text-primary-600 dark:text-primary-400',
  },
  shortlisted: {
    label: 'Shortlisted',
    variant: 'success' as const,
    icon: Star,
    color: 'text-success-600 dark:text-success-400',
  },
  rejected: {
    label: 'Rejected',
    variant: 'error' as const,
    icon: XCircle,
    color: 'text-error-600 dark:text-error-400',
  },
  hired: {
    label: 'Hired',
    variant: 'success' as const,
    icon: CheckCircle,
    color: 'text-success-600 dark:text-success-400',
  },
};

export function ApplicationTracking({ 
  applications, 
  onStatusChange,
  className 
}: ApplicationTrackingProps) {
  const [selectedApplication, setSelectedApplication] = React.useState<string | null>(null);

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
  const recentApplications = applications
    .sort((a, b) => b.appliedDate.getTime() - a.appliedDate.getTime())
    .slice(0, 5);

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
          <Users className="h-12 w-12 text-secondary-400 dark:text-secondary-500 mx-auto mb-4" />
          <p className="text-secondary-600 dark:text-secondary-400 mb-4">
            No applications received yet
          </p>
          <Button variant="primary" size="sm" asChild>
            <Link href="/jobs/post">
              Post a Job
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

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-6">
        {Object.entries(statusCounts).map(([status, count]) => {
          const config = statusConfig[status as keyof typeof statusConfig];
          const Icon = config.icon;
          
          return (
            <div
              key={status}
              className="text-center p-3 rounded-lg border border-secondary-100 dark:border-secondary-700"
            >
              <div className="flex items-center justify-center mb-1">
                <Icon className="h-4 w-4 text-secondary-600 dark:text-secondary-400" />
              </div>
              <div className="text-lg font-semibold text-secondary-900 dark:text-secondary-100">
                {count}
              </div>
              <div className="text-xs text-secondary-600 dark:text-secondary-400">
                {config.label}
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="space-y-4">
        {recentApplications.map((application) => {
          const config = statusConfig[application.status];
          const StatusIcon = config.icon;
          
          return (
            <div
              key={application.id}
              className="flex items-start space-x-4 p-4 rounded-lg border border-secondary-100 dark:border-secondary-700 hover:bg-secondary-50 dark:hover:bg-secondary-700/50 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-secondary-900 dark:text-secondary-100">
                      {application.applicantName}
                    </h4>
                    <p className="text-xs text-secondary-600 dark:text-secondary-400">
                      Applied for: {application.jobTitle}
                    </p>
                    <p className="text-xs text-secondary-500 dark:text-secondary-500 mt-1">
                      {application.applicantEmail} • {formatDate(application.appliedDate)}
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    <Badge variant={config.variant}>
                      <StatusIcon className="h-3 w-3 mr-1" />
                      {config.label}
                    </Badge>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {application.resumeUrl && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs h-6 px-2"
                        asChild
                      >
                        <a href={application.resumeUrl} target="_blank" rel="noopener noreferrer">
                          <FileText className="h-3 w-3 mr-1" />
                          Resume
                        </a>
                      </Button>
                    )}
                    {application.coverLetter && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs h-6 px-2"
                        onClick={() => setSelectedApplication(
                          selectedApplication === application.id ? null : application.id
                        )}
                      >
                        <MessageSquare className="h-3 w-3 mr-1" />
                        Cover Letter
                      </Button>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    {application.status === 'pending' && (
                      <>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-xs h-6 px-2 text-success-600 hover:text-success-700 hover:bg-success-50 dark:text-success-400 dark:hover:text-success-300 dark:hover:bg-success-900/20"
                          onClick={() => onStatusChange?.(application.id, 'shortlisted')}
                        >
                          Shortlist
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-xs h-6 px-2 text-error-600 hover:text-error-700 hover:bg-error-50 dark:text-error-400 dark:hover:text-error-300 dark:hover:bg-error-900/20"
                          onClick={() => onStatusChange?.(application.id, 'rejected')}
                        >
                          Reject
                        </Button>
                      </>
                    )}
                    {application.status === 'shortlisted' && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs h-6 px-2 text-success-600 hover:text-success-700 hover:bg-success-50 dark:text-success-400 dark:hover:text-success-300 dark:hover:bg-success-900/20"
                        onClick={() => onStatusChange?.(application.id, 'hired')}
                      >
                        Hire
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs h-6 px-2"
                      asChild
                    >
                      <Link href={`/dashboard/applications/${application.id}`}>
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Link>
                    </Button>
                  </div>
                </div>
                
                {selectedApplication === application.id && application.coverLetter && (
                  <div className="mt-3 p-3 bg-secondary-50 dark:bg-secondary-700/50 rounded-lg">
                    <h5 className="text-xs font-medium text-secondary-900 dark:text-secondary-100 mb-2">
                      Cover Letter:
                    </h5>
                    <p className="text-xs text-secondary-700 dark:text-secondary-300 line-clamp-3">
                      {application.coverLetter}
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      {applications.length > 5 && (
        <div className="mt-4 text-center">
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard/applications">
              <Users className="h-4 w-4 mr-2" />
              View All {applications.length} Applications
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}