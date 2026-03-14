import { apiClient, ApiResponse } from './api';
import { Job, JobSearchFilters } from '@/types/job';

export interface CreateJobData {
  title: string;
  description: string;
  qualifications?: string;
  responsibilities?: string;
  location: string;
  jobType: 'FULL_TIME' | 'PART_TIME' | 'INTERNSHIP' | 'CONTRACT';
  experienceLevel: 'FRESHER' | 'JUNIOR' | 'MID' | 'SENIOR';
  remoteType: 'ONSITE' | 'REMOTE' | 'HYBRID';
  salaryMin?: number;
  salaryMax?: number;
  salaryCurrency?: string;
  salaryPeriod?: 'MONTHLY' | 'YEARLY';
  skills: string[];
}

export interface UpdateJobData {
  title?: string;
  description?: string;
  qualifications?: string;
  responsibilities?: string;
  location?: string;
  jobType?: 'FULL_TIME' | 'PART_TIME' | 'INTERNSHIP' | 'CONTRACT';
  experienceLevel?: 'FRESHER' | 'JUNIOR' | 'MID' | 'SENIOR';
  remoteType?: 'ONSITE' | 'REMOTE' | 'HYBRID';
  salaryMin?: number;
  salaryMax?: number;
  salaryCurrency?: string;
  salaryPeriod?: 'MONTHLY' | 'YEARLY';
  status?: 'DRAFT' | 'OPEN' | 'CLOSED' | 'ARCHIVED';
  skills?: string[];
}

export class JobService {
  // Employer endpoints
  async createJob(data: CreateJobData): Promise<ApiResponse<Job>> {
    return apiClient.post<Job>('/employer/jobs', data);
  }

  async updateJob(jobUuid: string, data: UpdateJobData): Promise<ApiResponse<Job>> {
    return apiClient.patch<Job>(`/employer/jobs/${jobUuid}`, data);
  }

  async deleteJob(jobUuid: string): Promise<ApiResponse<null>> {
    return apiClient.delete<null>(`/employer/jobs/${jobUuid}`);
  }

  async getEmployerJobs(): Promise<ApiResponse<Job[]>> {
    return apiClient.get<Job[]>('/employer/jobs');
  }

  async getEmployerJobByUuid(uuid: string): Promise<ApiResponse<Job>> {
    return apiClient.get<Job>(`/employer/jobs/${uuid}`);
  }

  // Public endpoints
  async getJobs(filters?: JobSearchFilters): Promise<ApiResponse<Job[]>> {
    const params = new URLSearchParams();
    
    if (filters?.page) params.append('page', filters.page.toString());
    if (filters?.limit) params.append('limit', filters.limit.toString());
    if (filters?.location) params.append('location', filters.location);
    if (filters?.jobType) params.append('jobType', filters.jobType);
    if (filters?.salaryMin) params.append('salaryMin', filters.salaryMin.toString());
    if (filters?.salaryMax) params.append('salaryMax', filters.salaryMax.toString());
    if (filters?.sortBy) params.append('sortBy', filters.sortBy);
    if (filters?.sortOrder) params.append('sortOrder', filters.sortOrder);

    const queryString = params.toString();
    return apiClient.get<Job[]>(`/jobs${queryString ? `?${queryString}` : ''}`);
  }

  async getJobByUuid(uuid: string): Promise<ApiResponse<Job>> {
    return apiClient.get<Job>(`/jobs/${uuid}`);
  }
}

export const jobService = new JobService();
