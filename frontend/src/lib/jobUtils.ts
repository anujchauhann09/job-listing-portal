import { Job } from '@/types/job';

export function formatJobType(jobType: string): string {
  const typeMap: Record<string, string> = {
    FULL_TIME: 'Full Time',
    PART_TIME: 'Part Time',
    INTERNSHIP: 'Internship',
    CONTRACT: 'Contract',
  };
  return typeMap[jobType] || jobType;
}

export function formatExperienceLevel(level: string): string {
  const levelMap: Record<string, string> = {
    FRESHER: 'Fresher',
    JUNIOR: 'Junior (1-3 years)',
    MID: 'Mid-Level (3-5 years)',
    SENIOR: 'Senior (5+ years)',
  };
  return levelMap[level] || level;
}

export function formatRemoteType(remoteType: string): string {
  const typeMap: Record<string, string> = {
    ONSITE: 'On-site',
    REMOTE: 'Remote',
    HYBRID: 'Hybrid',
  };
  return typeMap[remoteType] || remoteType;
}

export function formatSalary(
  min?: number,
  max?: number,
  currency: string = 'USD',
  period?: string
): string {
  if (!min && !max) return 'Not specified';
  
  const periodText = period === 'YEARLY' ? '/year' : '/month';
  
  if (min && max) {
    return `${currency} ${min.toLocaleString()} - ${max.toLocaleString()}${periodText}`;
  }
  if (min) {
    return `${currency} ${min.toLocaleString()}+${periodText}`;
  }
  return `Up to ${currency} ${max?.toLocaleString()}${periodText}`;
}

export function getSkillNames(job: Job): string[] {
  return job.skills?.map(s => s.skill.name) || [];
}

export function formatPostedDate(date: Date | string): string {
  const posted = new Date(date);
  const now = new Date();
  const diffMs = now.getTime() - posted.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
}
