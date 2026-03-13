import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Job } from '@/types/job';
import { 
  MapPin, 
  Calendar, 
  DollarSign, 
  Building2, 
  Users, 
  Clock, 
  ArrowLeft,
  Share2,
  Bookmark,
  BookmarkCheck
} from 'lucide-react';

export interface JobDetailProps {
  job: Job;
  onBack?: () => void;
  onApply?: () => void;
  onSave?: () => void;
  onShare?: () => void;
  isApplied?: boolean;
  isSaved?: boolean;
  loading?: boolean;
  showApplyButton?: boolean;
}

export const JobDetail: React.FC<JobDetailProps> = ({
  job,
  onBack,
  onApply,
  onSave,
  onShare,
  isApplied = false,
  isSaved = false,
  loading = false,
  showApplyButton = true,
}) => {
  const formatSalary = (salaryRange?: Job['salaryRange']) => {
    if (!salaryRange) return 'Salary not specified';
    const { min, max, currency } = salaryRange;
    return `${currency} ${min.toLocaleString()} - ${max.toLocaleString()}`;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getJobTypeColor = (type: Job['type']) => {
    switch (type) {
      case 'full-time':
        return 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200';
      case 'part-time':
        return 'bg-warning-100 text-warning-800 dark:bg-warning-900 dark:text-warning-200';
      case 'contract':
        return 'bg-secondary-100 text-secondary-800 dark:bg-secondary-800 dark:text-secondary-200';
      case 'remote':
        return 'bg-success-100 text-success-800 dark:bg-success-900 dark:text-success-200';
      default:
        return 'bg-secondary-100 text-secondary-800 dark:bg-secondary-800 dark:text-secondary-200';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {onBack && (
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Search
        </Button>
      )}

      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <CardTitle className="text-2xl">{job.title}</CardTitle>
                <Badge className={getJobTypeColor(job.type)}>
                  {job.type.replace('-', ' ')}
                </Badge>
              </div>
              
              <div className="flex items-center text-secondary-600 dark:text-secondary-400 mb-4">
                <Building2 className="h-5 w-5 mr-2" />
                <span className="text-lg font-medium">{job.employer.companyName}</span>
                <span className="mx-2">•</span>
                <span>{job.employer.industry}</span>
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-secondary-600 dark:text-secondary-400">
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
            </div>

            <div className="flex gap-2">
              {onShare && (
                <Button variant="outline" size="sm" onClick={onShare}>
                  <Share2 className="h-4 w-4" />
                </Button>
              )}
              
              {onSave && (
                <Button variant="outline" size="sm" onClick={onSave}>
                  {isSaved ? (
                    <BookmarkCheck className="h-4 w-4" />
                  ) : (
                    <Bookmark className="h-4 w-4" />
                  )}
                </Button>
              )}

              {showApplyButton && onApply && (
                <Button
                  onClick={onApply}
                  loading={loading}
                  disabled={isApplied}
                  className="min-w-[120px]"
                >
                  {isApplied ? 'Applied' : 'Apply Now'}
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Job Description</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-secondary dark:prose-invert max-w-none">
                {job.description.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-4 last:mb-0">
                    {paragraph}
                  </p>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Requirements</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {job.requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0" />
                    <span className="text-secondary-700 dark:text-secondary-300">
                      {requirement}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>About {job.employer.companyName}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {job.employer.logoUrl && (
                <div className="flex justify-center">
                  <img
                    src={job.employer.logoUrl}
                    alt={`${job.employer.companyName} logo`}
                    className="h-16 w-16 object-contain rounded-lg"
                  />
                </div>
              )}
              
              <div className="text-center">
                <h3 className="font-semibold text-secondary-900 dark:text-secondary-100">
                  {job.employer.companyName}
                </h3>
                <p className="text-sm text-secondary-600 dark:text-secondary-400">
                  {job.employer.industry}
                </p>
              </div>

              <Button variant="outline" className="w-full">
                View Company Profile
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Job Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-secondary-600 dark:text-secondary-400">Job Type</span>
                <span className="font-medium text-secondary-900 dark:text-secondary-100">
                  {job.type.replace('-', ' ')}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-secondary-600 dark:text-secondary-400">Location</span>
                <span className="font-medium text-secondary-900 dark:text-secondary-100">
                  {job.location}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-secondary-600 dark:text-secondary-400">Salary</span>
                <span className="font-medium text-secondary-900 dark:text-secondary-100">
                  {formatSalary(job.salaryRange)}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-secondary-600 dark:text-secondary-400">Posted</span>
                <span className="font-medium text-secondary-900 dark:text-secondary-100">
                  {formatDate(job.postedDate)}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-secondary-600 dark:text-secondary-400">Status</span>
                <Badge variant={job.status === 'active' ? 'default' : 'secondary'}>
                  {job.status}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="border-warning-200 bg-warning-50 dark:border-warning-800 dark:bg-warning-900/20">
            <CardContent className="pt-6">
              <div className="flex items-center text-warning-800 dark:text-warning-200">
                <Clock className="h-5 w-5 mr-2" />
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