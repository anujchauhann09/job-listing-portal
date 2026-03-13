import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { ROUTES } from '@/lib/constants';

interface UseAuthRedirectOptions {
  requireAuth?: boolean;
  requireRole?: 'job-seeker' | 'employer';
  redirectTo?: string;
  redirectIfAuthenticated?: string;
}

export function useAuthRedirect({
  requireAuth = false,
  requireRole,
  redirectTo = ROUTES.LOGIN,
  redirectIfAuthenticated,
}: UseAuthRedirectOptions = {}) {
  const { user, loading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    if (requireAuth && !isAuthenticated) {
      router.push(redirectTo);
      return;
    }

    if (redirectIfAuthenticated && isAuthenticated) {
      const dashboardPath = user?.role === 'job-seeker' 
        ? ROUTES.DASHBOARD_JOB_SEEKER 
        : ROUTES.DASHBOARD_EMPLOYER;
      router.push(redirectIfAuthenticated === 'dashboard' ? dashboardPath : redirectIfAuthenticated);
      return;
    }

    if (requireRole && user && user.role !== requireRole) {
      const correctDashboard = user.role === 'job-seeker' 
        ? ROUTES.DASHBOARD_JOB_SEEKER 
        : ROUTES.DASHBOARD_EMPLOYER;
      router.push(correctDashboard);
      return;
    }
  }, [user, loading, isAuthenticated, requireAuth, requireRole, redirectTo, redirectIfAuthenticated, router]);

  return {
    user,
    loading,
    isAuthenticated,
    canAccess: !loading && (!requireAuth || isAuthenticated) && (!requireRole || user?.role === requireRole),
  };
}