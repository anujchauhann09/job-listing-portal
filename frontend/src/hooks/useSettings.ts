import { useState, useEffect, useCallback } from 'react';
import { SettingsData } from '@/types/user';
import { 
  settingsService, 
  UpdatePasswordData, 
  UpdateEmailData, 
  NotificationSettings, 
  PrivacySettings, 
  SecuritySettings,
  SessionInfo 
} from '@/services/settings';

interface UseSettingsReturn {
  settings: SettingsData | null;
  sessions: SessionInfo[];
  loginHistory: SessionInfo[];
  loading: boolean;
  error: string | null;
  updatePassword: (data: UpdatePasswordData) => Promise<void>;
  updateEmail: (data: UpdateEmailData) => Promise<{ verificationRequired: boolean }>;
  verifyEmailChange: (code: string) => Promise<void>;
  updateNotifications: (settings: NotificationSettings) => Promise<void>;
  updatePrivacy: (settings: PrivacySettings) => Promise<void>;
  updateSecurity: (settings: SecuritySettings) => Promise<void>;
  terminateSession: (sessionId: string) => Promise<void>;
  terminateAllOtherSessions: () => Promise<void>;
  deleteAccount: (password: string) => Promise<void>;
  refreshSettings: () => Promise<void>;
  refreshSessions: () => Promise<void>;
  refreshLoginHistory: () => Promise<void>;
}

export function useSettings(): UseSettingsReturn {
  const [settings, setSettings] = useState<SettingsData | null>(null);
  const [sessions, setSessions] = useState<SessionInfo[]>([]);
  const [loginHistory, setLoginHistory] = useState<SessionInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadSettings = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await settingsService.getSettings();
      
      if (response.success) {
        setSettings(response.data);
      } else {
        setError(response.message || 'Failed to load settings');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load settings');
    } finally {
      setLoading(false);
    }
  }, []);

  const loadSessions = useCallback(async () => {
    try {
      const response = await settingsService.getSessions();
      
      if (response.success) {
        setSessions(response.data);
      }
    } catch (err) {
      console.error('Failed to load sessions:', err);
    }
  }, []);

  const loadLoginHistory = useCallback(async () => {
    try {
      const response = await settingsService.getLoginHistory();
      
      if (response.success) {
        setLoginHistory(response.data);
      }
    } catch (err) {
      console.error('Failed to load login history:', err);
    }
  }, []);

  const updatePassword = useCallback(async (data: UpdatePasswordData) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await settingsService.updatePassword(data);
      
      if (!response.success) {
        throw new Error(response.message || 'Failed to update password');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update password';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateEmail = useCallback(async (data: UpdateEmailData) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await settingsService.updateEmail(data);
      
      if (response.success) {
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to update email');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update email';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const verifyEmailChange = useCallback(async (code: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await settingsService.verifyEmailChange(code);
      
      if (response.success) {
        await loadSettings();
      } else {
        throw new Error(response.message || 'Failed to verify email');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to verify email';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [loadSettings]);

  const updateNotifications = useCallback(async (notificationSettings: NotificationSettings) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await settingsService.updateNotifications(notificationSettings);
      
      if (response.success) {
        setSettings(prev => prev ? { ...prev, notifications: notificationSettings } : null);
      } else {
        throw new Error(response.message || 'Failed to update notifications');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update notifications';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const updatePrivacy = useCallback(async (privacySettings: PrivacySettings) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await settingsService.updatePrivacy(privacySettings);
      
      if (response.success) {
        setSettings(prev => prev ? { ...prev, privacy: privacySettings } : null);
      } else {
        throw new Error(response.message || 'Failed to update privacy settings');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update privacy settings';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateSecurity = useCallback(async (securitySettings: SecuritySettings) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await settingsService.updateSecurity(securitySettings);
      
      if (!response.success) {
        throw new Error(response.message || 'Failed to update security settings');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update security settings';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const terminateSession = useCallback(async (sessionId: string) => {
    try {
      const response = await settingsService.terminateSession(sessionId);
      
      if (response.success) {
        setSessions(prev => prev.filter(session => session.id !== sessionId));
      } else {
        throw new Error(response.message || 'Failed to terminate session');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to terminate session';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, []);

  const terminateAllOtherSessions = useCallback(async () => {
    try {
      const response = await settingsService.terminateAllOtherSessions();
      
      if (response.success) {
        setSessions(prev => prev.filter(session => session.current));
      } else {
        throw new Error(response.message || 'Failed to terminate sessions');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to terminate sessions';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, []);

  const deleteAccount = useCallback(async (password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await settingsService.deleteAccount(password);
      
      if (!response.success) {
        throw new Error(response.message || 'Failed to delete account');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete account';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshSettings = useCallback(async () => {
    await loadSettings();
  }, [loadSettings]);

  const refreshSessions = useCallback(async () => {
    await loadSessions();
  }, [loadSessions]);

  const refreshLoginHistory = useCallback(async () => {
    await loadLoginHistory();
  }, [loadLoginHistory]);

  useEffect(() => {
    loadSettings();
    loadSessions();
    loadLoginHistory();
  }, [loadSettings, loadSessions, loadLoginHistory]);

  return {
    settings,
    sessions,
    loginHistory,
    loading,
    error,
    updatePassword,
    updateEmail,
    verifyEmailChange,
    updateNotifications,
    updatePrivacy,
    updateSecurity,
    terminateSession,
    terminateAllOtherSessions,
    deleteAccount,
    refreshSettings,
    refreshSessions,
    refreshLoginHistory,
  };
}