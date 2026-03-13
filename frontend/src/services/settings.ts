import { apiClient, ApiResponse } from './api';
import { SettingsData } from '@/types/user';

export interface UpdatePasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface UpdateEmailData {
  newEmail: string;
  currentPassword: string;
}

export interface NotificationSettings {
  email: boolean;
  push: boolean;
  marketing: boolean;
}

export interface PrivacySettings {
  profileVisible: boolean;
  showEmail: boolean;
}

export interface SecuritySettings {
  twoFactorEnabled: boolean;
  sessionTimeout: number; // in minutes
}

export interface SessionInfo {
  id: string;
  device: string;
  location: string;
  lastActive: Date;
  current: boolean;
}

export class SettingsService {
  async getSettings(): Promise<ApiResponse<SettingsData>> {
    return apiClient.get<SettingsData>('/settings');
  }

  async updatePassword(data: UpdatePasswordData): Promise<ApiResponse<void>> {
    return apiClient.post<void>('/settings/password', data);
  }

  async updateEmail(data: UpdateEmailData): Promise<ApiResponse<{ verificationRequired: boolean }>> {
    return apiClient.post<{ verificationRequired: boolean }>('/settings/email', data);
  }

  async verifyEmailChange(verificationCode: string): Promise<ApiResponse<void>> {
    return apiClient.post<void>('/settings/email/verify', { code: verificationCode });
  }

  async updateNotifications(settings: NotificationSettings): Promise<ApiResponse<void>> {
    return apiClient.put<void>('/settings/notifications', settings);
  }

  async updatePrivacy(settings: PrivacySettings): Promise<ApiResponse<void>> {
    return apiClient.put<void>('/settings/privacy', settings);
  }

  async updateSecurity(settings: SecuritySettings): Promise<ApiResponse<void>> {
    return apiClient.put<void>('/settings/security', settings);
  }

  async getSessions(): Promise<ApiResponse<SessionInfo[]>> {
    return apiClient.get<SessionInfo[]>('/settings/sessions');
  }

  async terminateSession(sessionId: string): Promise<ApiResponse<void>> {
    return apiClient.delete<void>(`/settings/sessions/${sessionId}`);
  }

  async terminateAllOtherSessions(): Promise<ApiResponse<void>> {
    return apiClient.post<void>('/settings/sessions/terminate-others');
  }

  async getLoginHistory(): Promise<ApiResponse<SessionInfo[]>> {
    return apiClient.get<SessionInfo[]>('/settings/login-history');
  }

  async deleteAccount(password: string): Promise<ApiResponse<void>> {
    return apiClient.post<void>('/settings/delete-account', { password });
  }
}

export const settingsService = new SettingsService();