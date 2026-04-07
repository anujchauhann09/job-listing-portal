import { useState, useCallback, useRef } from 'react';
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
  updateApplicationStatus: (applicationUuid: string, status: ApplicationStatus) => Promise<void>;
  withdrawApplication: (applicationUuid: string) => Promise<void>;
  checkExistingApplication: (jobId: string) => Promise<boolean>;
  refreshApplications: () => Promise<void>;
}

export function useApplications(options: UseApplicationsOptions = {}): UseApplicationsReturn {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasApplied, setHasApplied] = useState(false);
  const [existingApplication, setExistingApplication] = useState<JobApplication | null>(null);

  // Ref to avoid stale closure in withdrawApplication
  const existingApplicationRef = useRef(existingApplication);
  existingApplicationRef.current = existingApplication;

  const checkExistingApplication = useCallback(async (jobId: string): Promise<boolean> => {
    try {
      const response = await applicationService.getMyApplications();
      if (response.success && response.data) {
        const found = response.data.find((a) => a.job?.uuid === jobId) ?? null;
        setHasApplied(!!found);
        setExistingApplication(found);
        return !!found;
      }
      return false;
    } catch {
      return false;
    }
  }, []);

  const createApplication = useCallback(async (data: CreateApplicationData): Promise<JobApplication> => {
    setLoading(true);
    setError(null);
    try {
      const response = await applicationService.createApplication(data);
      if (response.success) {
        setHasApplied(true);
        setExistingApplication(response.data);
        setApplications((prev) => [response.data, ...prev]);
        return response.data;
      }
      throw new Error(response.message || 'Failed to submit application');
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to submit application';
      setError(msg);
      throw new Error(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateApplicationStatus = useCallback(async (applicationUuid: string, status: ApplicationStatus) => {
    const response = await applicationService.updateApplicationStatus(applicationUuid, status);
    if (response.success) {
      setApplications((prev) =>
        prev.map((a) => (a.id === applicationUuid ? { ...a, status } : a))
      );
    }
  }, []);

  const withdrawApplication = useCallback(async (applicationUuid: string) => {
    await applicationService.withdrawApplication(applicationUuid);
    setApplications((prev) => prev.filter((a) => a.id !== applicationUuid));
    if (existingApplicationRef.current?.id === applicationUuid) {
      setHasApplied(false);
      setExistingApplication(null);
    }
  }, []);

  const refreshApplications = useCallback(async () => {
    setLoading(true);
    try {
      const response = await applicationService.getMyApplications();
      if (response.success) setApplications(response.data);
    } finally {
      setLoading(false);
    }
  }, []);

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
