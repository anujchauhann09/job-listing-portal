'use client';

import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { 
  Bell,
  User,
  Clock,
  Eye,
  CheckCircle,
  X,
} from 'lucide-react';

interface NewApplicant {
  id: string;
  applicantName: string;
  jobTitle: string;
  jobId: string;
  appliedDate: Date;
  isNew: boolean;
}

interface NewApplicantNotificationsProps {
  applicants: NewApplicant[];
  onMarkAsRead?: (applicantId: string) => void;
  onMarkAllAsRead?: () => void;
  className?: string;
}

export function NewApplicantNotifications({ 
  applicants, 
  onMarkAsRead,
  onMarkAllAsRead,
  className 
}: NewApplicantNotificationsProps) {
  const newApplicants = applicants.filter(applicant => applicant.isNew);
  const recentApplicants = applicants.slice(0, 5);

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    }
    if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    }
    if (diffInDays < 7) {
      return `${diffInDays}d ago`;
    }
    
    return date.toLocaleDateString();
  };

  if (applicants.length === 0) {
    return (
      <div className={cn(
        'bg-white dark:bg-secondary-800 rounded-lg border border-secondary-200 dark:border-secondary-700 p-6',
        className
      )}>
        <h3 className="text-lg font-semibold text-secondary-900 dark:text-secondary-100 mb-4">
          New Applicants
        </h3>
        <div className="text-center py-8">
          <Bell className="h-12 w-12 text-secondary-400 dark:text-secondary-500 mx-auto mb-4" />
          <p className="text-secondary-600 dark:text-secondary-400">
            No new applicants yet
          </p>
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
        <div className="flex items-center space-x-2">
          <h3 className="text-lg font-semibold text-secondary-900 dark:text-secondary-100">
            New Applicants
          </h3>
          {newApplicants.length > 0 && (
            <Badge variant="error" className="text-xs">
              {newApplicants.length} new
            </Badge>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          {newApplicants.length > 0 && onMarkAllAsRead && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onMarkAllAsRead}
              className="text-xs"
            >
              <CheckCircle className="h-3 w-3 mr-1" />
              Mark all read
            </Button>
          )}
          <Button variant="ghost" size="sm" asChild>
            <Link href="/dashboard/applications">
              View All
            </Link>
          </Button>
        </div>
      </div>
      
      <div className="space-y-3">
        {recentApplicants.map((applicant) => (
          <div
            key={applicant.id}
            className={cn(
              'flex items-start space-x-3 p-3 rounded-lg border transition-colors',
              applicant.isNew
                ? 'border-primary-200 bg-primary-50 dark:border-primary-800 dark:bg-primary-900/20'
                : 'border-secondary-100 dark:border-secondary-700 hover:bg-secondary-50 dark:hover:bg-secondary-700/50'
            )}
          >
            <div className="flex-shrink-0">
              <div className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center',
                applicant.isNew
                  ? 'bg-primary-100 dark:bg-primary-900/40'
                  : 'bg-secondary-100 dark:bg-secondary-700'
              )}>
                <User className={cn(
                  'h-4 w-4',
                  applicant.isNew
                    ? 'text-primary-600 dark:text-primary-400'
                    : 'text-secondary-600 dark:text-secondary-400'
                )} />
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-secondary-900 dark:text-secondary-100">
                    {applicant.applicantName}
                  </p>
                  <p className="text-xs text-secondary-600 dark:text-secondary-400">
                    Applied for: {applicant.jobTitle}
                  </p>
                  <div className="flex items-center space-x-1 mt-1 text-xs text-secondary-500 dark:text-secondary-500">
                    <Clock className="h-3 w-3" />
                    <span>{formatDate(applicant.appliedDate)}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-1 ml-2">
                  {applicant.isNew && (
                    <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                  )}
                  
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-1 h-6 w-6"
                      asChild
                    >
                      <Link href={`/dashboard/applications/${applicant.id}`}>
                        <Eye className="h-3 w-3" />
                      </Link>
                    </Button>
                    
                    {applicant.isNew && onMarkAsRead && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="p-1 h-6 w-6"
                        onClick={() => onMarkAsRead(applicant.id)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {applicants.length > 5 && (
        <div className="mt-4 text-center">
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard/applications">
              View All {applicants.length} Applicants
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}