export type JobType = 'full-time' | 'part-time' | 'contract' | 'remote';
export type JobStatus = 'active' | 'closed' | 'draft';
export type ApplicationStatus = 'pending' | 'reviewed' | 'shortlisted' | 'rejected' | 'hired';

export interface Job {
  id: string;
  title: string;
  description: string;
  requirements: string[];
  location: string;
  type: JobType;
  salaryRange?: {
    min: number;
    max: number;
    currency?: string;
  };
  employerId: string;
  employer: {
    companyName: string;
    logoUrl?: string;
    industry: string;
  };
  status: JobStatus;
  applicationsCount: number;
  postedDate: Date;
  updatedDate: Date;
}

export interface JobApplication {
  id: string;
  jobId: string;
  jobSeekerId: string;
  status: ApplicationStatus;
  appliedDate: Date;
  coverLetter?: string;
  resumeUrl: string;
  job?: Job;
  jobSeeker?: {
    firstName: string;
    lastName: string;
    email: string;
    resumeUrl?: string;
  };
}

export interface JobSearchFilters {
  query?: string;
  location?: string;
  type?: JobType[];
  salaryRange?: {
    min?: number;
    max?: number;
  };
  datePosted?: 'today' | 'week' | 'month' | 'all';
}

export interface SearchResults<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}