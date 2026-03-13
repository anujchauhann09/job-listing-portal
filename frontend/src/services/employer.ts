import { apiClient, ApiResponse } from './api';

export interface EmployerProfile {
  companyName: string | null;
  companyDescription: string | null;
  companySize: number | null;
  industry: string | null;
  website: string | null;
  headquartersCity: string | null;
  headquartersCountry: string | null;
  companyLogoUrl: string | null;
}

export interface UpdateEmployerProfileData {
  companyName?: string | null;
  companyDescription?: string | null;
  companySize?: number | null;
  industry?: string | null;
  website?: string | null;
  headquartersCity?: string | null;
  headquartersCountry?: string | null;
}

export interface LogoUploadResponse {
  companyLogoUrl: string;
}

export class EmployerService {
  async getMyProfile(): Promise<ApiResponse<EmployerProfile>> {
    return apiClient.get<EmployerProfile>('/employer/profile/me');
  }

  async updateMyProfile(data: UpdateEmployerProfileData): Promise<ApiResponse<null>> {
    return apiClient.patch<null>('/employer/profile/me', data);
  }

  async uploadLogo(file: File): Promise<ApiResponse<LogoUploadResponse>> {
    return apiClient.uploadFile<LogoUploadResponse>('/employer/profile/logo', file, 'logo');
  }

  async getLogoUrl(): Promise<ApiResponse<{ companyLogoUrl: string | null }>> {
    return apiClient.get<{ companyLogoUrl: string | null }>('/employer/profile/logo');
  }

  async deleteLogo(): Promise<ApiResponse<null>> {
    return apiClient.delete<null>('/employer/profile/logo');
  }
}

export const employerService = new EmployerService();
