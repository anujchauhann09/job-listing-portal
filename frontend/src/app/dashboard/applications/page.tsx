'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { applicationService, EmployerApplication } from '@/services/applications';
import { jobService } from '@/services/jobs';
import { JobApplication, ApplicationStatus, Job } from '@/types/job';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { getFileUrl } from '@/lib/constants';
import {
  Building, MapPin, Calendar, FileText, Eye, Trash2,
  Clock, Star, CheckCircle, XCircle, User,
  ChevronDown, ChevronUp, X, ExternalLink, MessageSquare, Download,
} from 'lucide-react';

// ─── Status config ────────────────────────────────────────────────────────────

const statusConfig: Record<ApplicationStatus, {
  label: string;
  variant: 'secondary' | 'primary' | 'success' | 'error' | 'outline';
  icon: React.ElementType;
}> = {
  APPLIED:     { label: 'Applied',      variant: 'secondary', icon: Clock },
  SHORTLISTED: { label: 'Shortlisted',  variant: 'success',   icon: Star },
  HIRED:       { label: 'Hired',        variant: 'success',   icon: CheckCircle },
  REJECTED:    { label: 'Not Selected', variant: 'error',     icon: XCircle },
  WITHDRAWN:   { label: 'Withdrawn',    variant: 'secondary', icon: XCircle },
};

function formatDate(d: Date | string) {
  const date = new Date(d);
  const diff = Math.floor((Date.now() - date.getTime()) / 86400000);
  if (diff === 0) return 'Today';
  if (diff === 1) return 'Yesterday';
  if (diff < 7) return `${diff} days ago`;
  return date.toLocaleDateString();
}

// ─── Candidate Drawer ─────────────────────────────────────────────────────────

interface CandidateDrawerProps {
  app: EmployerApplication | null;
  jobTitle: string;
  onClose: () => void;
  onStatusChange: (uuid: string, status: ApplicationStatus) => void;
  updating: string | null;
}
function CandidateDrawer({ app, jobTitle, onClose, onStatusChange, updating }: CandidateDrawerProps) {
  if (!app) return null;
  const [downloading, setDownloading] = useState(false);

  const cfg = statusConfig[app.status] ?? statusConfig.APPLIED;
  const StatusIcon = cfg.icon;
  const name = app.jobSeeker?.user?.profile?.name ?? 'Applicant';
  const avatarUrl = getFileUrl(app.jobSeeker?.user?.profile?.avatarUrl);

  const canShortlist = app.status === 'APPLIED';
  const canHire = app.status === 'SHORTLISTED';
  const canReject = app.status === 'APPLIED' || app.status === 'SHORTLISTED';

  const handleDownloadResume = async () => {
    setDownloading(true);
    try {
      await applicationService.downloadApplicantResume(app.uuid, `resume-${name.replace(/\s+/g, '-')}.pdf`);
    } catch {
      alert('Failed to download resume. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white dark:bg-secondary-900 shadow-xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-secondary-200 dark:border-secondary-700">
          <h2 className="text-lg font-semibold text-secondary-900 dark:text-secondary-100">
            Application Details
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-md text-secondary-400 hover:text-secondary-600 hover:bg-secondary-100 dark:hover:bg-secondary-800 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">

          {/* Candidate info */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-primary-100 dark:bg-primary-900/20 flex items-center justify-center shrink-0 overflow-hidden">
              {avatarUrl
                ? <img src={avatarUrl} alt={name} className="w-full h-full object-cover" />
                : <User className="h-7 w-7 text-primary-600 dark:text-primary-400" />
              }
            </div>            <div>
              <p className="text-base font-semibold text-secondary-900 dark:text-secondary-100">{name}</p>
              <p className="text-sm text-secondary-500 dark:text-secondary-400">
                Applied {formatDate(app.appliedAt)}
              </p>
            </div>
          </div>

          {/* Job */}
          <div className="bg-secondary-50 dark:bg-secondary-800 rounded-lg p-4">
            <p className="text-xs font-medium text-secondary-500 dark:text-secondary-400 uppercase tracking-wide mb-1">
              Applied for
            </p>
            <p className="text-sm font-semibold text-secondary-900 dark:text-secondary-100">{jobTitle}</p>
          </div>

          {/* Status */}
          <div>
            <p className="text-xs font-medium text-secondary-500 dark:text-secondary-400 uppercase tracking-wide mb-2">
              Status
            </p>
            <Badge variant={cfg.variant}>
              <StatusIcon className="h-3 w-3 mr-1" />
              {cfg.label}
            </Badge>
          </div>

          {/* Resume */}
          <div>
            <p className="text-xs font-medium text-secondary-500 dark:text-secondary-400 uppercase tracking-wide mb-2">
              Resume
            </p>
            {app.resumeUrl ? (
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownloadResume}
                disabled={downloading}
              >
                <Download className="h-4 w-4 mr-1" />
                {downloading ? 'Downloading...' : 'Download Resume'}
              </Button>
            ) : (
              <p className="text-sm text-secondary-500 dark:text-secondary-400">No resume attached</p>
            )}
          </div>

          {/* Cover Letter */}
          <div>
            <p className="text-xs font-medium text-secondary-500 dark:text-secondary-400 uppercase tracking-wide mb-2 flex items-center gap-1">
              <MessageSquare className="h-3.5 w-3.5" />
              Cover Letter
            </p>
            {app.coverLetter ? (
              <div className="bg-secondary-50 dark:bg-secondary-800 rounded-lg p-4">
                <p className="text-sm text-secondary-700 dark:text-secondary-300 whitespace-pre-wrap leading-relaxed">
                  {app.coverLetter}
                </p>
              </div>
            ) : (
              <p className="text-sm text-secondary-500 dark:text-secondary-400">No cover letter provided</p>
            )}
          </div>
        </div>

        {/* Actions footer */}
        {(canShortlist || canHire || canReject) && (
          <div className="px-6 py-4 border-t border-secondary-200 dark:border-secondary-700 flex flex-wrap gap-2">
            {canShortlist && (
              <Button
                variant="primary" size="sm"
                disabled={updating === app.uuid}
                onClick={() => onStatusChange(app.uuid, 'SHORTLISTED')}
              >
                <Star className="h-4 w-4 mr-1" />
                Shortlist
              </Button>
            )}
            {canHire && (
              <Button
                variant="primary" size="sm"
                disabled={updating === app.uuid}
                onClick={() => onStatusChange(app.uuid, 'HIRED')}
              >
                <CheckCircle className="h-4 w-4 mr-1" />
                Hire
              </Button>
            )}
            {canReject && (
              <Button
                variant="outline" size="sm"
                disabled={updating === app.uuid}
                onClick={() => onStatusChange(app.uuid, 'REJECTED')}
                className="text-error-600 border-error-300 hover:bg-error-50 dark:text-error-400 dark:border-error-700 dark:hover:bg-error-900/20"
              >
                <XCircle className="h-4 w-4 mr-1" />
                Reject
              </Button>
            )}
          </div>
        )}
      </div>
    </>
  );
}

// ─── Job-Seeker view ──────────────────────────────────────────────────────────

function JobSeekerApplications() {
  const router = useRouter();
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [withdrawing, setWithdrawing] = useState<string | null>(null);

  useEffect(() => { load(); }, []);

  const load = async () => {
    try {
      setLoading(true); setError(null);
      const res = await applicationService.getMyApplications();
      if (res.success && res.data) setApplications(res.data);
    } catch { setError('Failed to load applications.'); }
    finally { setLoading(false); }
  };

  const handleWithdraw = async (id: string) => {
    if (!window.confirm('Withdraw this application? This cannot be undone.')) return;
    setWithdrawing(id);
    try {
      await applicationService.withdrawApplication(id);
      setApplications(prev => prev.map(a => a.id === id ? { ...a, status: 'WITHDRAWN' } : a));
    } catch { alert('Failed to withdraw. Please try again.'); }
    finally { setWithdrawing(null); }
  };

  if (loading) return <LoadingSkeleton />;
  if (error) return <ErrorState message={error} onRetry={load} />;

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100">My Applications</h1>
        <p className="text-secondary-600 dark:text-secondary-400 mt-1">
          {applications.length} application{applications.length !== 1 ? 's' : ''}
        </p>
      </div>

      {applications.length === 0 ? (
        <Card className="text-center py-16">
          <FileText className="h-12 w-12 text-secondary-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-secondary-900 dark:text-secondary-100 mb-2">No applications yet</h3>
          <p className="text-secondary-600 dark:text-secondary-400 mb-6">Start applying to jobs to track them here</p>
          <Button variant="primary" onClick={() => router.push('/jobs')}>Browse Jobs</Button>
        </Card>
      ) : (
        <div className="space-y-4">
          {applications.map(app => {
            const cfg = statusConfig[app.status] ?? statusConfig.APPLIED;
            const Icon = cfg.icon;
            return (
              <Card key={app.id} className="p-5">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-semibold text-secondary-900 dark:text-secondary-100">
                      {app.job?.title ?? 'Unknown Job'}
                    </h3>
                    <div className="flex flex-wrap gap-3 mt-1 text-sm text-secondary-600 dark:text-secondary-400">
                      {app.job?.employer?.companyName && (
                        <span className="flex items-center gap-1"><Building className="h-3.5 w-3.5" />{app.job.employer.companyName}</span>
                      )}
                      {app.job?.location && (
                        <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{app.job.location}</span>
                      )}
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />Applied {formatDate(app.appliedDate)}
                      </span>
                    </div>
                  </div>
                  <Badge variant={cfg.variant} className="shrink-0">
                    <Icon className="h-3 w-3 mr-1" />{cfg.label}
                  </Badge>
                </div>

                {app.coverLetter && (
                  <p className="text-sm text-secondary-600 dark:text-secondary-400 line-clamp-2 mb-4">{app.coverLetter}</p>
                )}

                <div className="flex items-center justify-between pt-4 border-t border-secondary-200 dark:border-secondary-700">
                  <div className="flex gap-2">
                    {app.job?.uuid && (
                      <Button variant="ghost" size="sm" onClick={() => router.push(`/jobs/${app.job!.uuid}`)}>
                        <Eye className="h-4 w-4 mr-1" />View Job
                      </Button>
                    )}
                    {app.resumeUrl && (
                      <a href={getFileUrl(app.resumeUrl)!} target="_blank" rel="noopener noreferrer">
                        <Button variant="ghost" size="sm"><FileText className="h-4 w-4 mr-1" />Resume</Button>
                      </a>
                    )}
                  </div>
                  {app.status === 'APPLIED' && (
                    <Button
                      variant="ghost" size="sm"
                      onClick={() => handleWithdraw(app.id)}
                      disabled={withdrawing === app.id}
                      className="text-error-600 hover:text-error-700 hover:bg-error-50 dark:text-error-400 dark:hover:bg-error-900/20"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      {withdrawing === app.id ? 'Withdrawing...' : 'Withdraw'}
                    </Button>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── Employer view ────────────────────────────────────────────────────────────

interface JobGroup {
  job: Job;
  applications: EmployerApplication[];
  loading: boolean;
  expanded: boolean;
}

function EmployerApplications() {
  const [jobGroups, setJobGroups] = useState<JobGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updating, setUpdating] = useState<string | null>(null);
  const [selectedApp, setSelectedApp] = useState<{ app: EmployerApplication; jobTitle: string } | null>(null);

  useEffect(() => { loadJobs(); }, []);

  const loadJobs = async () => {
    try {
      setLoading(true); setError(null);
      const res = await jobService.getEmployerJobs();
      if (res.success && res.data) {
        setJobGroups(res.data.map(job => ({ job, applications: [], loading: false, expanded: false })));
      }
    } catch { setError('Failed to load jobs.'); }
    finally { setLoading(false); }
  };

  const toggleJob = async (jobUuid: string) => {
    const group = jobGroups.find(g => g.job.uuid === jobUuid);
    if (!group) return;

    // already loaded — just toggle
    if (group.applications.length > 0 || group.expanded) {
      setJobGroups(prev => prev.map(g =>
        g.job.uuid === jobUuid ? { ...g, expanded: !g.expanded } : g
      ));
      return;
    }

    // expand and fetch
    setJobGroups(prev => prev.map(g =>
      g.job.uuid === jobUuid ? { ...g, expanded: true, loading: true } : g
    ));

    try {
      const res = await applicationService.getJobApplications(jobUuid);
      if (res.success && res.data) {
        setJobGroups(prev => prev.map(g =>
          g.job.uuid === jobUuid
            ? { ...g, applications: res.data as unknown as EmployerApplication[], loading: false }
            : g
        ));
      }
    } catch {
      setJobGroups(prev => prev.map(g =>
        g.job.uuid === jobUuid ? { ...g, loading: false } : g
      ));
    }
  };

  const handleStatusChange = async (appUuid: string, jobUuid: string, status: ApplicationStatus) => {
    setUpdating(appUuid);
    try {
      await applicationService.updateApplicationStatus(appUuid, status);
      setJobGroups(prev => prev.map(g => {
        if (g.job.uuid !== jobUuid) return g;
        return { ...g, applications: g.applications.map(a => a.uuid === appUuid ? { ...a, status } : a) };
      }));
      // update drawer if open
      setSelectedApp(prev => prev && prev.app.uuid === appUuid ? { ...prev, app: { ...prev.app, status } } : prev);
    } catch { alert('Failed to update status. Please try again.'); }
    finally { setUpdating(null); }
  };

  if (loading) return <LoadingSkeleton />;
  if (error) return <ErrorState message={error} onRetry={loadJobs} />;

  const totalApps = jobGroups.reduce((s, g) => s + g.applications.length, 0);

  return (
    <>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100">Applications</h1>
          <p className="text-secondary-600 dark:text-secondary-400 mt-1">
            {jobGroups.length} job{jobGroups.length !== 1 ? 's' : ''}
            {totalApps > 0 && ` · ${totalApps} application${totalApps !== 1 ? 's' : ''} loaded`}
          </p>
        </div>

        {jobGroups.length === 0 ? (
          <Card className="text-center py-16">
            <FileText className="h-12 w-12 text-secondary-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-secondary-900 dark:text-secondary-100 mb-2">No jobs posted yet</h3>
            <p className="text-secondary-600 dark:text-secondary-400 mb-6">Post a job to start receiving applications</p>
            <Button variant="primary" onClick={() => window.location.href = '/dashboard/employer/jobs/new'}>Post a Job</Button>
          </Card>
        ) : (
          <div className="space-y-4">
            {jobGroups.map(({ job, applications, loading: appsLoading, expanded }) => (
              <Card key={job.uuid} className="overflow-hidden">
                <button
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-secondary-50 dark:hover:bg-secondary-700/30 transition-colors"
                  onClick={() => toggleJob(job.uuid)}
                >
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-semibold text-secondary-900 dark:text-secondary-100">{job.title}</h3>
                    <div className="flex flex-wrap gap-3 mt-1 text-sm text-secondary-600 dark:text-secondary-400">
                      {job.location && <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{job.location}</span>}
                      <span className="capitalize">{job.status?.toLowerCase()}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 ml-4 shrink-0">
                    {expanded && applications.length > 0 && (
                      <span className="text-sm text-secondary-500">{applications.length} applicant{applications.length !== 1 ? 's' : ''}</span>
                    )}
                    {expanded ? <ChevronUp className="h-4 w-4 text-secondary-400" /> : <ChevronDown className="h-4 w-4 text-secondary-400" />}
                  </div>
                </button>

                {expanded && (
                  <div className="border-t border-secondary-200 dark:border-secondary-700">
                    {appsLoading ? (
                      <div className="p-4 space-y-3">
                        {[...Array(2)].map((_, i) => (
                          <div key={i} className="h-14 bg-secondary-100 dark:bg-secondary-700 rounded animate-pulse" />
                        ))}
                      </div>
                    ) : applications.length === 0 ? (
                      <p className="p-6 text-center text-sm text-secondary-500 dark:text-secondary-400">
                        No applications yet for this job
                      </p>
                    ) : (
                      <div className="divide-y divide-secondary-100 dark:divide-secondary-700">
                        {applications.map(app => {
                          const cfg = statusConfig[app.status] ?? statusConfig.APPLIED;
                          const Icon = cfg.icon;
                          const name = app.jobSeeker?.user?.profile?.name ?? 'Applicant';
                          const canShortlist = app.status === 'APPLIED';
                          const canHire = app.status === 'SHORTLISTED';
                          const canReject = app.status === 'APPLIED' || app.status === 'SHORTLISTED';

                          return (
                            <div key={app.uuid} className="flex items-center justify-between px-5 py-3 gap-4 hover:bg-secondary-50 dark:hover:bg-secondary-800/40 transition-colors">
                              <div className="flex items-center gap-3 min-w-0">
                                <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/20 flex items-center justify-center shrink-0">
                                  {app.jobSeeker?.user?.profile?.avatarUrl
                                    ? <img src={getFileUrl(app.jobSeeker.user.profile.avatarUrl)!} alt={name} className="w-full h-full rounded-full object-cover" />
                                    : <User className="h-4 w-4 text-primary-600 dark:text-primary-400" />
                                  }
                                </div>
                                <div className="min-w-0">
                                  <p className="text-sm font-medium text-secondary-900 dark:text-secondary-100 truncate">{name}</p>
                                  <p className="text-xs text-secondary-500 dark:text-secondary-400">Applied {formatDate(app.appliedAt)}</p>
                                </div>
                              </div>

                              <div className="flex items-center gap-2 shrink-0">
                                <Badge variant={cfg.variant}>
                                  <Icon className="h-3 w-3 mr-1" />{cfg.label}
                                </Badge>

                                {/* View info button */}
                                <Button
                                  variant="ghost" size="sm"
                                  onClick={() => setSelectedApp({ app, jobTitle: job.title })}
                                  className="text-xs"
                                >
                                  <Eye className="h-3.5 w-3.5 mr-1" />View
                                </Button>

                                {canShortlist && (
                                  <Button variant="ghost" size="sm" disabled={updating === app.uuid}
                                    onClick={() => handleStatusChange(app.uuid, job.uuid, 'SHORTLISTED')}
                                    className="text-success-600 hover:bg-success-50 dark:text-success-400 dark:hover:bg-success-900/20 text-xs">
                                    Shortlist
                                  </Button>
                                )}
                                {canHire && (
                                  <Button variant="ghost" size="sm" disabled={updating === app.uuid}
                                    onClick={() => handleStatusChange(app.uuid, job.uuid, 'HIRED')}
                                    className="text-success-600 hover:bg-success-50 dark:text-success-400 dark:hover:bg-success-900/20 text-xs">
                                    Hire
                                  </Button>
                                )}
                                {canReject && (
                                  <Button variant="ghost" size="sm" disabled={updating === app.uuid}
                                    onClick={() => handleStatusChange(app.uuid, job.uuid, 'REJECTED')}
                                    className="text-error-600 hover:bg-error-50 dark:text-error-400 dark:hover:bg-error-900/20 text-xs">
                                    Reject
                                  </Button>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Candidate detail drawer */}
      {selectedApp && (
        <CandidateDrawer
          app={selectedApp.app}
          jobTitle={selectedApp.jobTitle}
          onClose={() => setSelectedApp(null)}
          onStatusChange={(uuid, status) => {
            const jobUuid = jobGroups.find(g => g.applications.some(a => a.uuid === uuid))?.job.uuid ?? '';
            handleStatusChange(uuid, jobUuid, status);
          }}
          updating={updating}
        />
      )}
    </>
  );
}

// ─── Shared helpers ───────────────────────────────────────────────────────────

function LoadingSkeleton() {
  return (
    <div className="p-6 space-y-4">
      <div className="h-8 w-48 bg-secondary-200 dark:bg-secondary-700 rounded animate-pulse" />
      {[...Array(3)].map((_, i) => (
        <div key={i} className="h-24 bg-secondary-200 dark:bg-secondary-700 rounded-lg animate-pulse" />
      ))}
    </div>
  );
}

function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="p-6">
      <div className="bg-error-50 dark:bg-error-900/20 border border-error-200 dark:border-error-800 rounded-lg p-4">
        <p className="text-error-700 dark:text-error-300">{message}</p>
        <Button variant="outline" size="sm" className="mt-3" onClick={onRetry}>Retry</Button>
      </div>
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function ApplicationsPage() {
  const { user } = useAuth();
  if (!user) return null;
  if (user.role === 'employer') return <EmployerApplications />;
  if (user.role === 'job-seeker') return <JobSeekerApplications />;
  return <div className="flex items-center justify-center py-20 text-secondary-500">Access denied.</div>;
}
