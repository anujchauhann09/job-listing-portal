export type JobType = 'FULL_TIME' | 'PART_TIME' | 'INTERNSHIP' | 'CONTRACT';
export type ExperienceLevel = 'FRESHER' | 'JUNIOR' | 'MID' | 'SENIOR';
export type RemoteType = 'ONSITE' | 'REMOTE' | 'HYBRID';
export type SalaryPeriod = 'MONTHLY' | 'YEARLY';
export type JobStatus = 'DRAFT' | 'OPEN' | 'CLOSED' | 'ARCHIVED';
export type ApplicationStatus = 'APPLIED' | 'SHORTLISTED' | 'REJECTED' | 'HIRED' | 'WITHDRAWN';

export interface Job {
  uuid: string;
  title: string;
  description?: string;
  qualifications?: string;
  responsibilities?: string;
  location: string;
  jobType: JobType;
  experienceLevel: ExperienceLevel;
  remoteType: RemoteType;
  salaryMin?: number;
  salaryMax?: number;
  salaryCurrency?: string;
  salaryPeriod?: SalaryPeriod;
  status?: JobStatus;
  skills: Array<{ skill: { name: string } }>;
  employer?: {
    companyName: string;
    companyLogoUrl?: string;
    industry: string;
  };
  createdAt: Date;
  updatedAt?: Date;
}

export interface JobLegacy {
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
  jobType?: JobType;
  salaryMin?: number;
  salaryMax?: number;
  page?: number;
  limit?: number;
  sortBy?: 'createdAt' | 'salaryMin' | 'salaryMax';
  sortOrder?: 'asc' | 'desc';
}

export interface JobsResponse {
  jobs: Job[];
  total?: number;
  page?: number;
  limit?: number;
}

export interface SearchResults<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}