import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Job } from '@/types/job';
import { MapPin, Calendar, DollarSign, Building2, Briefcase, MapPinned } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatJobType, formatExperienceLevel, formatRemoteType, formatSalary, formatPostedDate, getSkillNames } from '@/lib/jobUtils';

export interface JobCardProps {
  job: Job;
  actions?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  showEmployer?: boolean;
}

export const JobCard: React.FC<JobCardProps> = ({
  job,
  actions,
  onClick,
  className,
  showEmployer = true,
}) => {
  const getJobTypeColor = (type: string) => {
    switch (type) {
      case 'FULL_TIME':
        return 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200';
      case 'PART_TIME':
        return 'bg-warning-100 text-warning-800 dark:bg-warning-900 dark:text-warning-200';
      case 'CONTRACT':
        return 'bg-secondary-100 text-secondary-800 dark:bg-secondary-800 dark:text-secondary-200';
      case 'INTERNSHIP':
        return 'bg-info-100 text-info-800 dark:bg-info-900 dark:text-info-200';
      default:
        return 'bg-secondary-100 text-secondary-800 dark:bg-secondary-800 dark:text-secondary-200';
    }
  };

  const skills = getSkillNames(job);

  return (
    <Card 
      className={cn(
        'cursor-pointer transition-all duration-200 hover:shadow-md hover:border-primary-300 dark:hover:border-primary-600',
        className
      )}
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-secondary-900 dark:text-secondary-100 line-clamp-1">
              {job.title}
            </h3>
            {showEmployer && job.employer && (
              <div className="flex items-center mt-1 text-secondary-600 dark:text-secondary-400">
                <Building2 className="h-4 w-4 mr-1" />
                <span className="text-sm">{job.employer.companyName}</span>
              </div>
            )}
          </div>
          <Badge className={getJobTypeColor(job.jobType)}>
            {formatJobType(job.jobType)}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="py-3">
        {job.description && (
          <p className="text-sm text-secondary-600 dark:text-secondary-400 line-clamp-2 mb-3">
            {job.description}
          </p>
        )}
        
        <div className="flex flex-wrap gap-3 text-sm text-secondary-600 dark:text-secondary-400 mb-3">
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{job.location}</span>
          </div>

          <div className="flex items-center">
            <MapPinned className="h-4 w-4 mr-1" />
            <span>{formatRemoteType(job.remoteType)}</span>
          </div>
          
          <div className="flex items-center">
            <Briefcase className="h-4 w-4 mr-1" />
            <span>{formatExperienceLevel(job.experienceLevel)}</span>
          </div>
          
          {(job.salaryMin || job.salaryMax) && (
            <div className="flex items-center">
              <DollarSign className="h-4 w-4 mr-1" />
              <span>{formatSalary(job.salaryMin, job.salaryMax, job.salaryCurrency, job.salaryPeriod)}</span>
            </div>
          )}
          
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{formatPostedDate(job.createdAt)}</span>
          </div>
        </div>

        {skills.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {skills.slice(0, 3).map((skill, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
            {skills.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{skills.length - 3} more
              </Badge>
            )}
          </div>
        )}
      </CardContent>

      {actions && (
        <CardFooter className="pt-3">
          {actions}
        </CardFooter>
      )}
    </Card>
  );
};