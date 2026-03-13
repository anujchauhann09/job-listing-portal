import { apiClient, ApiResponse } from './api';

export interface JobSeekerProfile {
  experienceYears: number | null;
  currentTitle: string | null;
  currentLocation: string | null;
  expectedSalary: number | null;
  noticePeriodDays: number | null;
  resumeUrl: string | null;
  skills: string[];
}

export interface JobSeekerProfileResponse {
  user: {
    name: string | null;
    email: string;
  };
  profile: JobSeekerProfile;
}

export interface UpdateJobSeekerProfileData {
  experienceYears?: number | null;
  currentTitle?: string | null;
  currentLocation?: string | null;
  expectedSalary?: number | null;
  noticePeriodDays?: number | null;
  skills?: string[];
}

export interface ResumeUploadResponse {
  resumeUrl: string;
}

export class JobSeekerService {
  async getMyProfile(): Promise<ApiResponse<JobSeekerProfileResponse>> {
    return apiClient.get<JobSeekerProfileResponse>('/job-seeker/profile/me');
  }

  async updateMyProfile(data: UpdateJobSeekerProfileData): Promise<ApiResponse<null>> {
    return apiClient.patch<null>('/job-seeker/profile/me', data);
  }

  async uploadResume(file: File): Promise<ApiResponse<ResumeUploadResponse>> {
    return apiClient.uploadFile<ResumeUploadResponse>('/job-seeker/profile/resume', file, 'file');
  }

  async getResumeUrl(): Promise<ApiResponse<{ resumeUrl: string | null }>> {
    return apiClient.get<{ resumeUrl: string | null }>('/job-seeker/profile/resume');
  }

  async deleteResume(): Promise<ApiResponse<null>> {
    return apiClient.delete<null>('/job-seeker/profile/resume');
  }
}

export const jobSeekerService = new JobSeekerService();
