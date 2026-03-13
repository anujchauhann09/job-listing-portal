import { apiClient, ApiResponse } from './api';
import { JobApplication, ApplicationStatus } from '@/types/job';

export interface CreateApplicationData {
  jobId: string;
  coverLetter?: string;
  resumeUrl?: string;
}

export interface UpdateApplicationStatusData {
  applicationId: string;
  status: ApplicationStatus;
}

export class ApplicationService {
  async createApplication(data: CreateApplicationData): Promise<ApiResponse<JobApplication>> {
    return apiClient.post<JobApplication>('/applications', data);
  }

  async getMyApplications(): Promise<ApiResponse<JobApplication[]>> {
    return apiClient.get<JobApplication[]>('/applications/my');
  }

  async getJobApplications(jobId: string): Promise<ApiResponse<JobApplication[]>> {
    return apiClient.get<JobApplication[]>(`/applications/job/${jobId}`);
  }

  async getEmployerApplications(): Promise<ApiResponse<JobApplication[]>> {
    return apiClient.get<JobApplication[]>('/applications/employer');
  }

  async getApplication(applicationId: string): Promise<ApiResponse<JobApplication>> {
    return apiClient.get<JobApplication>(`/applications/${applicationId}`);
  }

  async updateApplicationStatus(data: UpdateApplicationStatusData): Promise<ApiResponse<JobApplication>> {
    return apiClient.patch<JobApplication>(`/applications/${data.applicationId}/status`, {
      status: data.status
    });
  }

  async checkExistingApplication(jobId: string): Promise<ApiResponse<{ hasApplied: boolean; application?: JobApplication }>> {
    return apiClient.get<{ hasApplied: boolean; application?: JobApplication }>(`/applications/check/${jobId}`);
  }

  async withdrawApplication(applicationId: string): Promise<ApiResponse<void>> {
    return apiClient.delete<void>(`/applications/${applicationId}`);
  }
}

export const applicationService = new ApplicationService();