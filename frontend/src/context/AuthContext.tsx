'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { User, AuthContextType } from '@/types/auth';
import { authService } from '@/services/auth';
import { LoginFormData, RegisterFormData } from '@/validators/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const SESSION_CACHE_KEY = 'auth_user_cache';

function buildUser(backendUser: Record<string, unknown> | { uuid?: string; email?: string; name?: string; role?: string }): User {
  const role = backendUser.role === 'JOB_SEEKER' ? 'job-seeker' : 'employer';
  const name = (backendUser.name as string) || '';
  const profile = role === 'job-seeker'
    ? { firstName: name, lastName: '', location: '', skills: [], experience: '', education: '', profileCompletion: 0 }
    : { companyName: name, industry: '', companySize: '', description: '', contactPerson: '', profileCompletion: 0 };
  return {
    id: backendUser.uuid as string,
    email: backendUser.email as string,
    role: role as 'job-seeker' | 'employer',
    profile: profile as User['profile'],
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initAuth = async () => {
      if (typeof window === 'undefined') {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const response = await authService.getCurrentUser();

        if (response.success && response.data) {
          const user = buildUser(response.data);
          sessionStorage.setItem(SESSION_CACHE_KEY, JSON.stringify(user));
          setUser(user);
        } else {
          sessionStorage.removeItem(SESSION_CACHE_KEY);
          setUser(null);
        }
      } catch (error: unknown) {
        sessionStorage.removeItem(SESSION_CACHE_KEY);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = useCallback(async (data: LoginFormData) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await authService.login(data);

      if (!response.data || !response.data.user) {
        throw new Error('Invalid response from server');
      }
      
      const loggedInUser = buildUser(response.data.user);
      sessionStorage.setItem(SESSION_CACHE_KEY, JSON.stringify(loggedInUser));
      setUser(loggedInUser);
      
      return response;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed. Please try again.';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (data: RegisterFormData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await authService.register(data);
      return response;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Registration failed. Please try again.';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      setLoading(true);
      
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      sessionStorage.removeItem(SESSION_CACHE_KEY);
      setUser(null);
      setError(null);
      setLoading(false);
      
      if (typeof window !== 'undefined') {
        window.location.href = '/';
      }
    }
  }, []);

  const updateProfile = useCallback(async (profileData: Partial<User['profile']>) => {
    if (!user) throw new Error('No user logged in');
    try {
      setLoading(true);
      setError(null);
      const updatedUser = { ...user, profile: { ...user.profile, ...profileData }, updatedAt: new Date() };
      setUser(updatedUser);
      return updatedUser;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Profile update failed. Please try again.';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [user]);

  const resetPassword = useCallback(async (_data: unknown) => {
    throw new Error('Password reset is not supported');
  }, []);

  const changePassword = useCallback(async (_data: unknown) => {
    throw new Error('Password change is not supported');
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  useEffect(() => {
    const handleUnauthorized = () => {
      sessionStorage.removeItem(SESSION_CACHE_KEY);
      setUser(null);
      setError(null);
      if (typeof window !== 'undefined') {
        const isAuthPage = window.location.pathname.startsWith('/auth/');
        if (!isAuthPage) {
          window.location.href = '/auth/login';
        }
      }
    };

    window.addEventListener('auth:unauthorized', handleUnauthorized);
    return () => window.removeEventListener('auth:unauthorized', handleUnauthorized);
  }, []);

  const refreshUser = useCallback(async () => {
    if (!user) return;
    
    try {
      const response = await authService.getCurrentUser();
      
      if (response.success && response.data) {
        const updatedUser = buildUser(response.data);
        sessionStorage.setItem(SESSION_CACHE_KEY, JSON.stringify(updatedUser));
        setUser(updatedUser);
        return updatedUser;
      }
    } catch (error) {
      console.error('Failed to refresh user:', error);
    }
  }, [user]);

  const loginWithSession = useCallback(async (bearerToken?: string) => {
    try {
      const response = bearerToken
        ? await authService.exchangeOAuthSession(bearerToken)
        : await authService.getCurrentUser();

      if (response.success && response.data) {
        const userData = (response.data as any).user ?? response.data;
        const newUser = buildUser(userData);
        sessionStorage.setItem(SESSION_CACHE_KEY, JSON.stringify(newUser));
        setUser(newUser);
        return newUser;
      }
    } catch (error) {
      console.error('Failed to initialize session user:', error);
    }
  }, []);

  const value: AuthContextType = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    resetPassword,
    changePassword,
    updateProfile,
    clearError,
    refreshUser,
    loginWithSession,
    isAuthenticated: !!user,
    isJobSeeker: user?.role === 'job-seeker',
    isEmployer: user?.role === 'employer',
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}