import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Job, JobStatus } from '@/types/job';
import { 
  Plus, 
  Edit, 
  Eye, 
  MoreHorizontal, 
  Users, 
  Calendar,
  MapPin,
  DollarSign,
  Archive,
  Play,
  Pause
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export interface JobManagementProps {
  jobs: Job[];
  onCreateJob: () => void;
  onEditJob: (jobId: string) => void;
  onViewJob: (jobId: string) => void;
  onToggleJobStatus: (jobId: string, newStatus: JobStatus) => void;
  onArchiveJob: (jobId: string) => void;
  loading?: boolean;
}

export const JobManagement: React.FC<JobManagementProps> = ({
  jobs,
  onCreateJob,
  onEditJob,
  onViewJob,
  onToggleJobStatus,
  onArchiveJob,
  loading = false,
}) => {
  const router = useRouter();

  const getStatusColor = (status: JobStatus) => {
    switch (status) {
      case 'active':
        return 'bg-success-100 text-success-800 dark:bg-success-900 dark:text-success-200';
      case 'closed':
        return 'bg-secondary-100 text-secondary-800 dark:bg-secondary-800 dark:text-secondary-200';
      case 'draft':
        return 'bg-warning-100 text-warning-800 dark:bg-warning-900 dark:text-warning-200';
      default:
        return 'bg-secondary-100 text-secondary-800 dark:bg-secondary-800 dark:text-secondary-200';
    }
  };

  const formatSalary = (salaryRange?: Job['salaryRange']) => {
    if (!salaryRange) return 'Not specified';
    const { min, max, currency } = salaryRange;
    return `${currency} ${min.toLocaleString()} - ${max.toLocaleString()}`;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-4 bg-secondary-200 dark:bg-secondary-700 rounded w-1/3 mb-2"></div>
              <div className="h-3 bg-secondary-200 dark:bg-secondary-700 rounded w-1/2 mb-4"></div>
              <div className="flex gap-4">
                <div className="h-3 bg-secondary-200 dark:bg-secondary-700 rounded w-20"></div>
                <div className="h-3 bg-secondary-200 dark:bg-secondary-700 rounded w-24"></div>
                <div className="h-3 bg-secondary-200 dark:bg-secondary-700 rounded w-16"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <div className="max-w-md mx-auto">
            <div className="bg-secondary-100 dark:bg-secondary-800 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Plus className="h-8 w-8 text-secondary-600 dark:text-secondary-400" />
            </div>
            <h3 className="text-lg font-semibold text-secondary-900 dark:text-secondary-100 mb-2">
              No job postings yet
            </h3>
            <p className="text-secondary-600 dark:text-secondary-400 mb-6">
              Create your first job posting to start attracting qualified candidates.
            </p>
            <Button onClick={onCreateJob}>
              <Plus className="h-4 w-4 mr-2" />
              Create Job Posting
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-secondary-900 dark:text-secondary-100">
            Job Postings
          </h2>
          <p className="text-secondary-600 dark:text-secondary-400">
            Manage your job listings and track applications
          </p>
        </div>
        <Button onClick={onCreateJob}>
          <Plus className="h-4 w-4 mr-2" />
          New Job Posting
        </Button>
      </div>

      <div className="space-y-4">
        {jobs.map((job) => (
          <Card key={job.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-secondary-900 dark:text-secondary-100">
                      {job.title}
                    </h3>
                    <Badge className={getStatusColor(job.status)}>
                      {job.status}
                    </Badge>
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm text-secondary-600 dark:text-secondary-400 mb-4">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{job.location}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-1" />
                      <span>{formatSalary(job.salaryRange)}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>Posted {formatDate(job.postedDate)}</span>
                    </div>

                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      <span>{job.applicationsCount} applicant{job.applicationsCount !== 1 ? 's' : ''}</span>
                    </div>
                  </div>

                  <p className="text-sm text-secondary-600 dark:text-secondary-400 line-clamp-2">
                    {job.description}
                  </p>
                </div>

                <div className="flex items-center gap-2 ml-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onViewJob(job.id)}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEditJob(job.id)}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>

                  {job.status === 'active' ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onToggleJobStatus(job.id, 'closed')}
                    >
                      <Pause className="h-4 w-4 mr-1" />
                      Close
                    </Button>
                  ) : job.status === 'closed' ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onToggleJobStatus(job.id, 'active')}
                    >
                      <Play className="h-4 w-4 mr-1" />
                      Reopen
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onToggleJobStatus(job.id, 'active')}
                    >
                      <Play className="h-4 w-4 mr-1" />
                      Publish
                    </Button>
                  )}

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onArchiveJob(job.id)}
                  >
                    <Archive className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {job.applicationsCount > 0 && (
                <div className="mt-4 pt-4 border-t border-secondary-200 dark:border-secondary-700">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-secondary-600 dark:text-secondary-400">
                      Recent activity
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => router.push(`/dashboard/employer/jobs/${job.id}/applications`)}
                    >
                      View Applications
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};