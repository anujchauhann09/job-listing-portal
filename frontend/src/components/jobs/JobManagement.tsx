import React from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Job, JobStatus } from '@/types/job';
import {
  Plus,
  Edit,
  Eye,
  Users,
  Calendar,
  MapPin,
  DollarSign,
  Archive,
  Play,
  Pause,
  Trash2,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export interface JobManagementProps {
  jobs: Job[];
  onCreateJob: () => void;
  onEditJob: (jobUuid: string) => void;
  onViewJob: (jobUuid: string) => void;
  onUpdateStatus: (jobUuid: string, newStatus: JobStatus) => void;
  onDeleteJob: (jobUuid: string) => void;
  loading?: boolean;
}

const formatLabel = (value: string) =>
  value.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

export const JobManagement: React.FC<JobManagementProps> = ({
  jobs,
  onCreateJob,
  onEditJob,
  onViewJob,
  onUpdateStatus,
  onDeleteJob,
  loading = false,
}) => {
  const router = useRouter();

  const getStatusColor = (status?: JobStatus) => {
    switch (status) {
      case 'OPEN':
        return 'bg-success-100 text-success-800 dark:bg-success-900 dark:text-success-200';
      case 'CLOSED':
        return 'bg-secondary-100 text-secondary-800 dark:bg-secondary-800 dark:text-secondary-200';
      case 'DRAFT':
        return 'bg-warning-100 text-warning-800 dark:bg-warning-900 dark:text-warning-200';
      case 'ARCHIVED':
        return 'bg-error-100 text-error-800 dark:bg-error-900 dark:text-error-200';
      default:
        return 'bg-secondary-100 text-secondary-800 dark:bg-secondary-800 dark:text-secondary-200';
    }
  };

  const formatSalary = (job: Job) => {
    if (!job.salaryMin && !job.salaryMax) return 'Not specified';
    const currency = job.salaryCurrency || 'USD';
    if (job.salaryMin && job.salaryMax)
      return `${currency} ${job.salaryMin.toLocaleString()} – ${job.salaryMax.toLocaleString()}`;
    if (job.salaryMin) return `${currency} ${job.salaryMin.toLocaleString()}+`;
    return `Up to ${currency} ${job.salaryMax!.toLocaleString()}`;
  };

  const formatDate = (date: Date | string) =>
    new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-4 bg-secondary-200 dark:bg-secondary-700 rounded w-1/3 mb-2" />
              <div className="h-3 bg-secondary-200 dark:bg-secondary-700 rounded w-1/2 mb-4" />
              <div className="flex gap-4">
                <div className="h-3 bg-secondary-200 dark:bg-secondary-700 rounded w-20" />
                <div className="h-3 bg-secondary-200 dark:bg-secondary-700 rounded w-24" />
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
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-secondary-900 dark:text-secondary-100">Job Postings</h2>
          <p className="text-secondary-600 dark:text-secondary-400">Manage your job listings</p>
        </div>
        <Button onClick={onCreateJob}>
          <Plus className="h-4 w-4 mr-2" />
          New Job Posting
        </Button>
      </div>

      <div className="space-y-4">
        {jobs.map((job) => (
          <Card key={job.uuid} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <h3 className="text-lg font-semibold text-secondary-900 dark:text-secondary-100">
                      {job.title}
                    </h3>
                    <Badge className={getStatusColor(job.status)}>{job.status ?? 'OPEN'}</Badge>
                    <Badge variant="secondary">{formatLabel(job.jobType)}</Badge>
                    <Badge variant="secondary">{formatLabel(job.remoteType)}</Badge>
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm text-secondary-600 dark:text-secondary-400 mb-3">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-1" />
                      <span>{formatSalary(job)}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>Posted {formatDate(job.createdAt)}</span>
                    </div>
                  </div>

                  {job.description && (
                    <p className="text-sm text-secondary-600 dark:text-secondary-400 line-clamp-2">
                      {job.description}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2 ml-4 flex-wrap justify-end">
                  <Button variant="outline" size="sm" onClick={() => onViewJob(job.uuid)}>
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => onEditJob(job.uuid)}>
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDeleteJob(job.uuid)}
                    className="text-error-600 hover:bg-error-50 dark:text-error-400 dark:hover:bg-error-900/20"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-secondary-200 dark:border-secondary-700">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-secondary-600 dark:text-secondary-400 flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {formatLabel(job.experienceLevel)} level
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => router.push(`/dashboard/employer/jobs/${job.uuid}/applications`)}
                  >
                    View Applications
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
