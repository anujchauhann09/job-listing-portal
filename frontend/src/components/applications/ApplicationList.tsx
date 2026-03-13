'use client';

import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
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
  FileText,
  Search,
  Filter,
  SortAsc,
  SortDesc,
  User,
  Mail
} from 'lucide-react';

interface ApplicationListProps {
  applications: JobApplication[];
  onStatusChange?: (applicationId: string, newStatus: ApplicationStatus) => void;
  onViewApplication?: (applicationId: string) => void;
  loading?: boolean;
  className?: string;
}

type SortField = 'appliedDate' | 'status' | 'jobTitle' | 'applicantName';
type SortDirection = 'asc' | 'desc';

const statusConfig = {
  pending: {
    label: 'Pending',
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

export function ApplicationList({
  applications,
  onStatusChange,
  onViewApplication,
  loading = false,
  className
}: ApplicationListProps) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState<ApplicationStatus | 'all'>('all');
  const [sortField, setSortField] = React.useState<SortField>('appliedDate');
  const [sortDirection, setSortDirection] = React.useState<SortDirection>('desc');

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    
    return date.toLocaleDateString();
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const getStatusCounts = () => {
    return {
      all: applications.length,
      pending: applications.filter(app => app.status === 'pending').length,
      reviewed: applications.filter(app => app.status === 'reviewed').length,
      shortlisted: applications.filter(app => app.status === 'shortlisted').length,
      rejected: applications.filter(app => app.status === 'rejected').length,
      hired: applications.filter(app => app.status === 'hired').length,
    };
  };

  const filteredAndSortedApplications = React.useMemo(() => {
    let filtered = applications;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(app => {
        const applicantName = app.jobSeeker ? `${app.jobSeeker.firstName} ${app.jobSeeker.lastName}`.toLowerCase() : '';
        const jobTitle = app.job?.title?.toLowerCase() || '';
        const applicantEmail = app.jobSeeker?.email?.toLowerCase() || '';
        
        return applicantName.includes(query) || 
               jobTitle.includes(query) || 
               applicantEmail.includes(query);
      });
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(app => app.status === statusFilter);
    }

    filtered.sort((a, b) => {
      let aValue: any;
      let bValue: any;

      switch (sortField) {
        case 'appliedDate':
          aValue = a.appliedDate.getTime();
          bValue = b.appliedDate.getTime();
          break;
        case 'status':
          aValue = a.status;
          bValue = b.status;
          break;
        case 'jobTitle':
          aValue = a.job?.title || '';
          bValue = b.job?.title || '';
          break;
        case 'applicantName':
          aValue = a.jobSeeker ? `${a.jobSeeker.firstName} ${a.jobSeeker.lastName}` : '';
          bValue = b.jobSeeker ? `${b.jobSeeker.firstName} ${b.jobSeeker.lastName}` : '';
          break;
        default:
          return 0;
      }

      if (sortDirection === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    return filtered;
  }, [applications, searchQuery, statusFilter, sortField, sortDirection]);

  const statusCounts = getStatusCounts();

  if (loading) {
    return (
      <div className={cn('space-y-4', className)}>
        {[...Array(5)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <div className="h-24 bg-secondary-200 dark:bg-secondary-700 rounded"></div>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className={cn('space-y-6', className)}>
      <Card className="p-6">
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-secondary-400" />
            <Input
              type="text"
              placeholder="Search by applicant name, job title, or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              label=""
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {Object.entries(statusCounts).map(([status, count]) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status as ApplicationStatus | 'all')}
                className={cn(
                  'px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                  statusFilter === status
                    ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300'
                    : 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200 dark:bg-secondary-800 dark:text-secondary-300 dark:hover:bg-secondary-700'
                )}
              >
                {status === 'all' ? 'All' : statusConfig[status as ApplicationStatus]?.label || status} ({count})
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-secondary-700 dark:text-secondary-300">
              Sort by:
            </span>
            {(['appliedDate', 'status', 'jobTitle', 'applicantName'] as SortField[]).map((field) => (
              <button
                key={field}
                onClick={() => handleSort(field)}
                className={cn(
                  'flex items-center space-x-1 px-3 py-1 rounded text-sm transition-colors',
                  sortField === field
                    ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300'
                    : 'text-secondary-600 hover:text-secondary-900 dark:text-secondary-400 dark:hover:text-secondary-100'
                )}
              >
                <span>
                  {field === 'appliedDate' && 'Date'}
                  {field === 'status' && 'Status'}
                  {field === 'jobTitle' && 'Job'}
                  {field === 'applicantName' && 'Applicant'}
                </span>
                {sortField === field && (
                  sortDirection === 'asc' ? <SortAsc className="h-3 w-3" /> : <SortDesc className="h-3 w-3" />
                )}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {filteredAndSortedApplications.length === 0 ? (
        <Card className="text-center py-12">
          <FileText className="h-12 w-12 text-secondary-400 dark:text-secondary-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-secondary-900 dark:text-secondary-100 mb-2">
            No Applications Found
          </h3>
          <p className="text-secondary-600 dark:text-secondary-400">
            {searchQuery || statusFilter !== 'all' 
              ? 'Try adjusting your search or filters'
              : 'No applications have been received yet'
            }
          </p>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredAndSortedApplications.map((application) => {
            const config = statusConfig[application.status];
            const StatusIcon = config.icon;
            const job = application.job;
            const jobSeeker = application.jobSeeker;
            
            return (
              <Card key={application.id} className="p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <User className="h-5 w-5 text-secondary-600 dark:text-secondary-400" />
                          <div>
                            <h3 className="text-lg font-semibold text-secondary-900 dark:text-secondary-100">
                              {jobSeeker ? `${jobSeeker.firstName} ${jobSeeker.lastName}` : 'Applicant'}
                            </h3>
                            <div className="flex items-center space-x-4 text-sm text-secondary-600 dark:text-secondary-400">
                              <div className="flex items-center space-x-1">
                                <Mail className="h-4 w-4" />
                                <span>{jobSeeker?.email || 'email@example.com'}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Calendar className="h-4 w-4" />
                                <span>Applied {formatDate(application.appliedDate)}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4 text-sm text-secondary-600 dark:text-secondary-400 mb-3">
                          <div className="flex items-center space-x-1">
                            <Building className="h-4 w-4" />
                            <span>Applied for: {job?.title || 'Job Title'}</span>
                          </div>
                          {job?.location && (
                            <div className="flex items-center space-x-1">
                              <MapPin className="h-4 w-4" />
                              <span>{job.location}</span>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center space-x-4">
                          {application.resumeUrl && (
                            <div className="flex items-center space-x-1 text-sm text-secondary-600 dark:text-secondary-400">
                              <FileText className="h-4 w-4" />
                              <span>Resume attached</span>
                            </div>
                          )}
                          {application.coverLetter && (
                            <div className="text-sm text-secondary-600 dark:text-secondary-400">
                              Cover letter included
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <Badge variant={config.variant} className="ml-4">
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {config.label}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-secondary-200 dark:border-secondary-700">
                      <div className="flex items-center space-x-2">
                        {application.resumeUrl && (
                          <a href={application.resumeUrl} target="_blank" rel="noopener noreferrer">
                            <Button
                              variant="ghost"
                              size="sm"
                            >
                              <FileText className="h-4 w-4 mr-1" />
                              Resume
                            </Button>
                          </a>
                        )}
                        {onViewApplication && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onViewApplication(application.id)}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View Details
                          </Button>
                        )}
                      </div>
                      
                      {onStatusChange && (
                        <div className="flex items-center space-x-2">
                          {application.status === 'pending' && (
                            <>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => onStatusChange(application.id, 'reviewed')}
                                className="text-primary-600 hover:text-primary-700 hover:bg-primary-50 dark:text-primary-400 dark:hover:text-primary-300 dark:hover:bg-primary-900/20"
                              >
                                Mark Reviewed
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => onStatusChange(application.id, 'shortlisted')}
                                className="text-success-600 hover:text-success-700 hover:bg-success-50 dark:text-success-400 dark:hover:text-success-300 dark:hover:bg-success-900/20"
                              >
                                Shortlist
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => onStatusChange(application.id, 'rejected')}
                                className="text-error-600 hover:text-error-700 hover:bg-error-50 dark:text-error-400 dark:hover:text-error-300 dark:hover:bg-error-900/20"
                              >
                                Reject
                              </Button>
                            </>
                          )}
                          {application.status === 'reviewed' && (
                            <>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => onStatusChange(application.id, 'shortlisted')}
                                className="text-success-600 hover:text-success-700 hover:bg-success-50 dark:text-success-400 dark:hover:text-success-300 dark:hover:bg-success-900/20"
                              >
                                Shortlist
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => onStatusChange(application.id, 'rejected')}
                                className="text-error-600 hover:text-error-700 hover:bg-error-50 dark:text-error-400 dark:hover:text-error-300 dark:hover:bg-error-900/20"
                              >
                                Reject
                              </Button>
                            </>
                          )}
                          {application.status === 'shortlisted' && (
                            <>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => onStatusChange(application.id, 'hired')}
                                className="text-success-600 hover:text-success-700 hover:bg-success-50 dark:text-success-400 dark:hover:text-success-300 dark:hover:bg-success-900/20"
                              >
                                Hire
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => onStatusChange(application.id, 'rejected')}
                                className="text-error-600 hover:text-error-700 hover:bg-error-50 dark:text-error-400 dark:hover:text-error-300 dark:hover:bg-error-900/20"
                              >
                                Reject
                              </Button>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}