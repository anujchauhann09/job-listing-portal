'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { User, AuthContextType } from '@/types/auth';
import { authService } from '@/services/auth';
import { LoginFormData, RegisterFormData, PasswordResetFormData, ChangePasswordFormData } from '@/validators/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const SESSION_CACHE_KEY = 'auth_user_cache';

function buildUser(backendUser: any): User {
  const role = backendUser.role === 'JOB_SEEKER' ? 'job-seeker' : 'employer';
  const profile = role === 'job-seeker'
    ? { firstName: backendUser.name || '', lastName: '', location: '', skills: [], experience: '', education: '', profileCompletion: 0 }
    : { companyName: backendUser.name || '', industry: '', companySize: '', description: '', contactPerson: '', profileCompletion: 0 };
  return {
    id: backendUser.uuid,
    email: backendUser.email,
    role: role as any,
    profile: profile as any,
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
      } catch (error: any) {
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
    } catch (error: any) {
      const errorMessage = error.message || 'Login failed. Please try again.';
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
    } catch (error: any) {
      const errorMessage = error.message || 'Registration failed. Please try again.';
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

  const updateProfile = useCallback(async (profileData: any) => {
    if (!user) {
      throw new Error('No user logged in');
    }
    
    try {
      setLoading(true);
      setError(null);
      
      const updatedUser = {
        ...user,
        profile: { ...user.profile, ...profileData },
        updatedAt: new Date(),
      };
      setUser(updatedUser);
      
      return updatedUser;
    } catch (error: any) {
      const errorMessage = error.message || 'Profile update failed. Please try again.';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [user]);

  const resetPassword = useCallback(async (data: PasswordResetFormData) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await authService.resetPassword(data);
      return response;
    } catch (error: any) {
      const errorMessage = error.message || 'Password reset failed. Please try again.';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const changePassword = useCallback(async (data: ChangePasswordFormData) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await authService.changePassword(data);
      return response;
    } catch (error: any) {
      const errorMessage = error.message || 'Password change failed. Please try again.';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
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

export function withAuth<P extends object>(
  Component: React.ComponentType<P>,
  requiredRole?: 'job-seeker' | 'employer'
) {
  return function AuthenticatedComponent(props: P) {
    const { user, loading } = useAuth();

    if (loading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        </div>
      );
    }

    if (!user) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-secondary-900 dark:text-secondary-100">
              Authentication Required
            </h2>
            <p className="text-secondary-600 dark:text-secondary-400 mt-2">
              Please log in to access this page.
            </p>
          </div>
        </div>
      );
    }

    if (requiredRole && user.role !== requiredRole) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-secondary-900 dark:text-secondary-100">
              Access Denied
            </h2>
            <p className="text-secondary-600 dark:text-secondary-400 mt-2">
              You don't have permission to access this page.
            </p>
          </div>
        </div>
      );
    }

    return <Component {...props} />;
  };
}