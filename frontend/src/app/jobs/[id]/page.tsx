'use client';

import { use, useState, useEffect } from 'react';
import { Container } from '@/components/ui/Container';
import { PageLoading } from '@/components/ui/Loading';
import { JobDetail } from '@/components/jobs';
import { JobApplicationForm } from '@/components/applications';
import { Job } from '@/types/job';
import { useRouter, notFound } from 'next/navigation';
import { useApplications } from '@/hooks';
import { useAuth } from '@/context/AuthContext';
import { jobService } from '@/services/jobs';
import { jobSeekerService } from '@/services/jobSeeker';

interface JobDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function JobDetailPage({ params }: JobDetailPageProps) {
  const router = useRouter();
  const { user } = useAuth();
  const { id } = use(params);
  const [job, setJob] = useState<Job | null>(null);
  const [pageLoading, setPageLoading] = useState(true);
  const [applyLoading, setApplyLoading] = useState(false);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [notFoundFlag, setNotFoundFlag] = useState(false);

  const {
    hasApplied,
    existingApplication,
    createApplication,
    checkExistingApplication,
  } = useApplications({ jobId: id, autoLoad: false });

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await jobService.getJobByUuid(id);
        if (response.success && response.data) {
          setJob(response.data);
        } else {
          setNotFoundFlag(true);
        }
      } catch {
        setNotFoundFlag(true);
      } finally {
        setPageLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  useEffect(() => {
    if (job && user?.role === 'job-seeker') {
      checkExistingApplication(job.uuid);
    }
  }, [job, user, checkExistingApplication]);

  if (pageLoading) {
    return <PageLoading />;
  }

  if (notFoundFlag || !job) {
    notFound();
  }

  const handleApply = async () => {
    if (!user) {
      router.push('/auth/login');
      return;
    }
    if (user.role !== 'job-seeker') {
      alert('Only job seekers can apply to jobs');
      return;
    }
    if (hasApplied) {
      alert('You have already applied to this job');
      return;
    }
    setShowApplicationForm(true);
  };

  const handleApplicationSubmit = async (data: { coverLetter?: string; resumeFile?: File }) => {
    setApplyLoading(true);
    try {
      let resumeUrl: string | undefined;

      if (data.resumeFile) {
        // Upload the new resume file first, then use the returned URL
        const uploadRes = await jobSeekerService.uploadResume(data.resumeFile);
        if (!uploadRes.success || !uploadRes.data?.resumeUrl) {
          throw new Error('Failed to upload resume');
        }
        resumeUrl = uploadRes.data.resumeUrl;
      } else {
        // Fall back to existing profile resume URL
        resumeUrl =
          user?.role === 'job-seeker' && 'resumeUrl' in user.profile
            ? (user.profile.resumeUrl ?? undefined)
            : undefined;
      }

      await createApplication({
        jobId: job!.uuid,
        coverLetter: data.coverLetter,
        resumeUrl,
      });

      setShowApplicationForm(false);
      alert('Application submitted successfully!');
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to submit application');
    } finally {
      setApplyLoading(false);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: job!.title,
        text: `Check out: ${job!.title}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const canApply = user?.role === 'job-seeker' && !hasApplied;
  const isApplied = hasApplied && !!existingApplication;

  return (
    <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900">
      <Container className="py-8">
        <JobDetail
          job={job!}
          onBack={() => router.back()}
          onApply={handleApply}
          onShare={handleShare}
          isApplied={isApplied}
          loading={applyLoading}
          showApplyButton={canApply}
        />

        <JobApplicationForm
          job={job!}
          isOpen={showApplicationForm}
          onClose={() => setShowApplicationForm(false)}
          onSubmit={handleApplicationSubmit}
          loading={applyLoading}
          userResumeUrl={
            user?.role === 'job-seeker' && 'resumeUrl' in user.profile
              ? user.profile.resumeUrl
              : undefined
          }
        />
      </Container>
    </div>
  );
}
