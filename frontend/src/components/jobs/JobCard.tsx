import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Job } from '@/types/job';
import { MapPin, Calendar, DollarSign, Building2 } from 'lucide-react';
import { cn } from '@/lib/utils';

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
  const formatSalary = (salaryRange?: Job['salaryRange']) => {
    if (!salaryRange) return null;
    const { min, max, currency } = salaryRange;
    return `${currency} ${min.toLocaleString()} - ${max.toLocaleString()}`;
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    if (diffDays <= 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString();
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
            {showEmployer && (
              <div className="flex items-center mt-1 text-secondary-600 dark:text-secondary-400">
                <Building2 className="h-4 w-4 mr-1" />
                <span className="text-sm">{job.employer.companyName}</span>
              </div>
            )}
          </div>
          <Badge className={getJobTypeColor(job.type)}>
            {job.type.replace('-', ' ')}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="py-3">
        <p className="text-sm text-secondary-600 dark:text-secondary-400 line-clamp-2 mb-3">
          {job.description}
        </p>
        
        <div className="flex flex-wrap gap-3 text-sm text-secondary-600 dark:text-secondary-400">
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{job.location}</span>
          </div>
          
          {job.salaryRange && (
            <div className="flex items-center">
              <DollarSign className="h-4 w-4 mr-1" />
              <span>{formatSalary(job.salaryRange)}</span>
            </div>
          )}
          
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{formatDate(job.postedDate)}</span>
          </div>
        </div>

        {job.applicationsCount > 0 && (
          <div className="mt-3 text-xs text-secondary-500 dark:text-secondary-500">
            {job.applicationsCount} application{job.applicationsCount !== 1 ? 's' : ''}
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