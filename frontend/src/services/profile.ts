import { apiClient, ApiResponse } from './api';

export interface UserProfile {
  uuid: string;
  name: string | null;
  bio: string | null;
  phone: string | null;
  avatarUrl: string | null;
}

export interface UpdateProfileData {
  name?: string | null;
  bio?: string | null;
  phone?: string | null;
}

export interface AvatarUploadResponse {
  avatarUrl: string;
}

export class ProfileService {
  async getMyProfile(): Promise<ApiResponse<UserProfile>> {
    return apiClient.get<UserProfile>('/user/profile/me');
  }

  async updateMyProfile(data: UpdateProfileData): Promise<ApiResponse<UserProfile>> {
    return apiClient.patch<UserProfile>('/user/profile/me', data);
  }

  async uploadAvatar(file: File): Promise<ApiResponse<AvatarUploadResponse>> {
    return apiClient.uploadFile<AvatarUploadResponse>('/user/profile/avatar', file, 'file');
  }

  async getAvatarUrl(): Promise<ApiResponse<{ avatarUrl: string | null }>> {
    return apiClient.get<{ avatarUrl: string | null }>('/user/profile/avatar');
  }

  async deleteAvatar(): Promise<ApiResponse<null>> {
    return apiClient.delete<null>('/user/profile/avatar');
  }
}

export const profileService = new ProfileService();