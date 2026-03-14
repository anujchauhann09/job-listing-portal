import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Job } from '@/types/job';
import { getFileUrl } from '@/lib/constants';
import {
  MapPin,
  Calendar,
  DollarSign,
  Building2,
  Clock,
  ArrowLeft,
  Share2,
  Bookmark,
  BookmarkCheck,
  Briefcase,
  Monitor,
  GraduationCap,
  Trash2,
  Edit,
} from 'lucide-react';

export interface JobDetailProps {
  job: Job;
  onBack?: () => void;
  onApply?: () => void;
  onShare?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  isApplied?: boolean;
  isSaved?: boolean;
  loading?: boolean;
  showApplyButton?: boolean;
  showManageButtons?: boolean;
}

const formatLabel = (value: string) =>
  value.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

export const JobDetail: React.FC<JobDetailProps> = ({
  job,
  onBack,
  onApply,
  onShare,
  onEdit,
  onDelete,
  isApplied = false,
  isSaved = false,
  loading = false,
  showApplyButton = true,
  showManageButtons = false,
}) => {
  const formatSalary = () => {
    if (!job.salaryMin && !job.salaryMax) return 'Salary not specified';
    const currency = job.salaryCurrency || 'USD';
    const period = job.salaryPeriod ? ` / ${formatLabel(job.salaryPeriod)}` : '';
    if (job.salaryMin && job.salaryMax) {
      return `${currency} ${job.salaryMin.toLocaleString()} – ${job.salaryMax.toLocaleString()}${period}`;
    }
    if (job.salaryMin) return `${currency} ${job.salaryMin.toLocaleString()}+${period}`;
    return `Up to ${currency} ${job.salaryMax!.toLocaleString()}${period}`;
  };

  const formatDate = (date: Date | string) =>
    new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

  const skills = job.skills?.map((s) => s.skill.name) ?? [];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {onBack && (
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
      )}

      <Card>
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <CardTitle className="text-2xl">{job.title}</CardTitle>
                <Badge variant={job.status === 'OPEN' ? 'default' : 'secondary'}>
                  {job.status ?? 'OPEN'}
                </Badge>
              </div>

              {job.employer && (
                <div className="flex items-center text-secondary-600 dark:text-secondary-400 mb-4">
                  <Building2 className="h-5 w-5 mr-2" />
                  <span className="text-lg font-medium">{job.employer.companyName}</span>
                  {job.employer.industry && (
                    <>
                      <span className="mx-2">•</span>
                      <span>{job.employer.industry}</span>
                    </>
                  )}
                </div>
              )}

              <div className="flex flex-wrap gap-4 text-sm text-secondary-600 dark:text-secondary-400">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center">
                  <DollarSign className="h-4 w-4 mr-1" />
                  <span>{formatSalary()}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>Posted {formatDate(job.createdAt)}</span>
                </div>
                <div className="flex items-center">
                  <Briefcase className="h-4 w-4 mr-1" />
                  <span>{formatLabel(job.jobType)}</span>
                </div>
                <div className="flex items-center">
                  <Monitor className="h-4 w-4 mr-1" />
                  <span>{formatLabel(job.remoteType)}</span>
                </div>
                <div className="flex items-center">
                  <GraduationCap className="h-4 w-4 mr-1" />
                  <span>{formatLabel(job.experienceLevel)}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2 flex-wrap justify-end">
              {onShare && (
                <Button variant="outline" size="sm" onClick={onShare}>
                  <Share2 className="h-4 w-4" />
                </Button>
              )}
              {showManageButtons && onEdit && (
                <Button variant="outline" size="sm" onClick={onEdit}>
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
              )}
              {showManageButtons && onDelete && (
                <Button variant="outline" size="sm" onClick={onDelete}
                  className="text-error-600 border-error-300 hover:bg-error-50 dark:text-error-400 dark:border-error-700 dark:hover:bg-error-900/20">
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              )}
              {showApplyButton && onApply && (
                <Button onClick={onApply} loading={loading} disabled={isApplied} className="min-w-[120px]">
                  {isApplied ? 'Applied' : 'Apply Now'}
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {job.description && (
            <Card>
              <CardHeader><CardTitle>Job Description</CardTitle></CardHeader>
              <CardContent>
                <div className="prose prose-secondary dark:prose-invert max-w-none">
                  {job.description.split('\n').map((p, i) => (
                    <p key={i} className="mb-4 last:mb-0 text-secondary-700 dark:text-secondary-300">{p}</p>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {job.responsibilities && (
            <Card>
              <CardHeader><CardTitle>Responsibilities</CardTitle></CardHeader>
              <CardContent>
                <div className="prose prose-secondary dark:prose-invert max-w-none">
                  {job.responsibilities.split('\n').map((p, i) => (
                    <p key={i} className="mb-2 last:mb-0 text-secondary-700 dark:text-secondary-300">{p}</p>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {job.qualifications && (
            <Card>
              <CardHeader><CardTitle>Qualifications</CardTitle></CardHeader>
              <CardContent>
                <div className="prose prose-secondary dark:prose-invert max-w-none">
                  {job.qualifications.split('\n').map((p, i) => (
                    <p key={i} className="mb-2 last:mb-0 text-secondary-700 dark:text-secondary-300">{p}</p>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {skills.length > 0 && (
            <Card>
              <CardHeader><CardTitle>Required Skills</CardTitle></CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <Badge key={skill} variant="secondary">{skill}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          {job.employer && (
            <Card>
              <CardHeader><CardTitle>About {job.employer.companyName}</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {job.employer.companyLogoUrl && (
                  <div className="flex justify-center">
                    <img
                      src={getFileUrl(job.employer.companyLogoUrl) ?? job.employer.companyLogoUrl}
                      alt={`${job.employer.companyName} logo`}
                      className="h-16 w-16 object-contain rounded-lg"
                    />
                  </div>
                )}
                <div className="text-center">
                  <h3 className="font-semibold text-secondary-900 dark:text-secondary-100">
                    {job.employer.companyName}
                  </h3>
                  {job.employer.industry && (
                    <p className="text-sm text-secondary-600 dark:text-secondary-400">
                      {job.employer.industry}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader><CardTitle>Job Details</CardTitle></CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-secondary-600 dark:text-secondary-400">Job Type</span>
                <span className="font-medium">{formatLabel(job.jobType)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary-600 dark:text-secondary-400">Experience</span>
                <span className="font-medium">{formatLabel(job.experienceLevel)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary-600 dark:text-secondary-400">Remote</span>
                <span className="font-medium">{formatLabel(job.remoteType)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary-600 dark:text-secondary-400">Location</span>
                <span className="font-medium">{job.location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary-600 dark:text-secondary-400">Salary</span>
                <span className="font-medium">{formatSalary()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary-600 dark:text-secondary-400">Posted</span>
                <span className="font-medium">{formatDate(job.createdAt)}</span>
              </div>
              {job.status && (
                <div className="flex justify-between">
                  <span className="text-secondary-600 dark:text-secondary-400">Status</span>
                  <Badge variant={job.status === 'OPEN' ? 'default' : 'secondary'}>{job.status}</Badge>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="border-warning-200 bg-warning-50 dark:border-warning-800 dark:bg-warning-900/20">
            <CardContent className="pt-6">
              <div className="flex items-center text-warning-800 dark:text-warning-200">
                <Clock className="h-5 w-5 mr-2 flex-shrink-0" />
                <div>
                  <p className="font-medium">Apply Soon</p>
                  <p className="text-sm">This position is actively being filled</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
