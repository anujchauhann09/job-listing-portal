import { apiClient, ApiResponse } from './api';
import { User } from '@/types/auth';
import { LoginFormData, RegisterFormData, PasswordResetFormData, ChangePasswordFormData } from '@/validators/auth';

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    uuid: string;
    email: string;
    name: string | null;
    role: string;
  };
}

export interface RegisterResponse {
  uuid: string;
  createdAt: string;
}

export class AuthService {
  async login(data: LoginFormData): Promise<ApiResponse<LoginResponse>> {
    const res = await apiClient.post<LoginResponse>('/auth/login', {
      email: data.email,
      password: data.password,
    });

    console.log('Login response:', res);
    return res;
  }

  async register(data: RegisterFormData): Promise<ApiResponse<RegisterResponse>> {
    const userType = data.role === 'job-seeker' ? 'JOB_SEEKER' : 'EMPLOYER';
    
    const res = await apiClient.post<RegisterResponse>('/auth/register', {
      email: data.email,
      password: data.password,
      userType: userType,
    });

    console.log('Register response:', res);
    return res;
  }

  async refresh(refreshToken: string): Promise<ApiResponse<{ accessToken: string }>> {
    return apiClient.post<{ accessToken: string }>('/auth/refresh', {
      refreshToken,
    });
  }

  async logout(refreshToken?: string): Promise<ApiResponse<null>> {
    const res = await apiClient.post<null>('/auth/logout', {
      refreshToken,
    });
    return res;
  }

  async getCurrentUser(): Promise<ApiResponse<User>> {
    return apiClient.get<User>('/auth/me');
  }

  async resetPassword(
    data: PasswordResetFormData
  ): Promise<ApiResponse<{ message: string }>> {
    return apiClient.post<{ message: string }>(
      '/auth/reset-password',
      data
    );
  }

  async changePassword(
    data: ChangePasswordFormData
  ): Promise<ApiResponse<{ message: string }>> {
    return apiClient.post<{ message: string }>(
      '/auth/change-password',
      data
    );
  }
}

export const authService = new AuthService();