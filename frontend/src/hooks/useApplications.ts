import { useState, useEffect, useCallback } from 'react';
import { JobApplication, ApplicationStatus } from '@/types/job';
import { applicationService, CreateApplicationData } from '@/services/applications';

interface UseApplicationsOptions {
  jobId?: string;
  autoLoad?: boolean;
}

interface UseApplicationsReturn {
  applications: JobApplication[];
  loading: boolean;
  error: string | null;
  hasApplied: boolean;
  existingApplication: JobApplication | null;
  createApplication: (data: CreateApplicationData) => Promise<JobApplication>;
  updateApplicationStatus: (applicationId: string, status: ApplicationStatus) => Promise<void>;
  withdrawApplication: (applicationId: string) => Promise<void>;
  checkExistingApplication: (jobId: string) => Promise<boolean>;
  refreshApplications: () => Promise<void>;
}

export function useApplications(options: UseApplicationsOptions = {}): UseApplicationsReturn {
  const { jobId, autoLoad = true } = options;
  
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasApplied, setHasApplied] = useState(false);
  const [existingApplication, setExistingApplication] = useState<JobApplication | null>(null);

  const loadApplications = useCallback(async () => {
    if (!autoLoad) return;
    
    setLoading(true);
    setError(null);
    
    try {
      let response;
      if (jobId) {
        response = await applicationService.getJobApplications(jobId);
      } else {
        response = await applicationService.getMyApplications();
      }
      
      if (response.success) {
        setApplications(response.data);
      } else {
        setError(response.message || 'Failed to load applications');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load applications');
    } finally {
      setLoading(false);
    }
  }, [jobId, autoLoad]);

  const checkExistingApplication = useCallback(async (targetJobId: string): Promise<boolean> => {
    try {
      const response = await applicationService.checkExistingApplication(targetJobId);
      
      if (response.success) {
        setHasApplied(response.data.hasApplied);
        setExistingApplication(response.data.application || null);
        return response.data.hasApplied;
      }
      
      return false;
    } catch (err) {
      console.error('Failed to check existing application:', err);
      return false;
    }
  }, []);

  const createApplication = useCallback(async (data: CreateApplicationData): Promise<JobApplication> => {
    setLoading(true);
    setError(null);
    
    try {
      const hasExisting = await checkExistingApplication(data.jobId);
      
      if (hasExisting) {
        throw new Error('You have already applied to this job');
      }
      
      const response = await applicationService.createApplication(data);
      
      if (response.success) {
        const newApplication = response.data;
        setApplications(prev => [newApplication, ...prev]);
        setHasApplied(true);
        setExistingApplication(newApplication);
        return newApplication;
      } else {
        throw new Error(response.message || 'Failed to submit application');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to submit application';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [checkExistingApplication]);

  const updateApplicationStatus = useCallback(async (applicationId: string, status: ApplicationStatus) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await applicationService.updateApplicationStatus({
        applicationId,
        status
      });
      
      if (response.success) {
        setApplications(prev => 
          prev.map(app => 
            app.id === applicationId 
              ? { ...app, status }
              : app
          )
        );
      } else {
        throw new Error(response.message || 'Failed to update application status');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update application status';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const withdrawApplication = useCallback(async (applicationId: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await applicationService.withdrawApplication(applicationId);
      
      if (response.success) {
        setApplications(prev => prev.filter(app => app.id !== applicationId));
        
        if (existingApplication?.id === applicationId) {
          setHasApplied(false);
          setExistingApplication(null);
        }
      } else {
        throw new Error(response.message || 'Failed to withdraw application');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to withdraw application';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [existingApplication]);

  const refreshApplications = useCallback(async () => {
    await loadApplications();
  }, [loadApplications]);

  useEffect(() => {
    loadApplications();
  }, [loadApplications]);

  useEffect(() => {
    if (jobId) {
      checkExistingApplication(jobId);
    }
  }, [jobId, checkExistingApplication]);

  return {
    applications,
    loading,
    error,
    hasApplied,
    existingApplication,
    createApplication,
    updateApplicationStatus,
    withdrawApplication,
    checkExistingApplication,
    refreshApplications,
  };
}