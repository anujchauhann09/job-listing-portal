import { apiClient, ApiResponse } from './api';
import { JobApplication, ApplicationStatus } from '@/types/job';

export interface CreateApplicationData {
  jobId: string;
  coverLetter?: string;
  resumeUrl?: string;
}

export interface EmployerApplication {
  uuid: string;
  status: ApplicationStatus;
  appliedAt: string;
  coverLetter?: string;
  resumeUrl?: string;
  jobSeeker?: {
    uuid: string;
    user?: {
      profile?: {
        name?: string;
        avatarUrl?: string;
      };
    };
  };
}

// Raw shape returned by the backend
interface RawApplication {
  uuid: string;
  status: ApplicationStatus;
  appliedAt: string;
  coverLetter?: string;
  resumeUrl?: string;
  job?: {
    uuid: string;
    title: string;
    location: string;
    jobType: string;
    employer?: {
      companyName: string;
      companyLogoUrl?: string;
    };
  };
}

function mapApplication(raw: RawApplication): JobApplication {
  return {
    id: raw.uuid,
    jobId: raw.job?.uuid ?? '',
    jobSeekerId: '',
    status: raw.status,
    appliedDate: new Date(raw.appliedAt),
    coverLetter: raw.coverLetter,
    resumeUrl: raw.resumeUrl ?? '',
    job: raw.job
      ? {
          uuid: raw.job.uuid,
          title: raw.job.title,
          location: raw.job.location,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          jobType: raw.job.jobType as any,
          experienceLevel: 'JUNIOR',
          remoteType: 'ONSITE',
          skills: [],
          employer: raw.job.employer
            ? {
                companyName: raw.job.employer.companyName,
                companyLogoUrl: raw.job.employer.companyLogoUrl,
                industry: '',
              }
            : undefined,
          createdAt: new Date(),
        }
      : undefined,
  };
}

export class ApplicationService {
  // POST /jobs/:uuid/apply
  async createApplication(data: CreateApplicationData): Promise<ApiResponse<JobApplication>> {
    const res = await apiClient.post<RawApplication>(`/jobs/${data.jobId}/apply`, {
      coverLetter: data.coverLetter,
      resumeUrl: data.resumeUrl,
    });
    return { ...res, data: res.data ? mapApplication(res.data) : res.data } as ApiResponse<JobApplication>;
  }

  // GET /job-seeker/applications
  async getMyApplications(params?: { page?: number; limit?: number; status?: string }): Promise<ApiResponse<JobApplication[]>> {
    const qs = new URLSearchParams();
    if (params?.page) qs.append('page', String(params.page));
    if (params?.limit) qs.append('limit', String(params.limit));
    if (params?.status) qs.append('status', params.status);
    const q = qs.toString();
    const res = await apiClient.get<RawApplication[]>(`/job-seeker/applications${q ? `?${q}` : ''}`);
    return {
      ...res,
      data: Array.isArray(res.data) ? res.data.map(mapApplication) : res.data,
    } as ApiResponse<JobApplication[]>;
  }

  // GET /employer/jobs/:uuid/applications
  async getJobApplications(jobUuid: string): Promise<ApiResponse<EmployerApplication[]>> {
    return apiClient.get<EmployerApplication[]>(`/employer/jobs/${jobUuid}/applications`);
  }

  // PATCH /applications/:uuid/status
  async updateApplicationStatus(applicationUuid: string, status: ApplicationStatus): Promise<ApiResponse<JobApplication>> {
    return apiClient.patch<JobApplication>(`/applications/${applicationUuid}/status`, { status });
  }

  // PATCH /applications/:uuid/withdraw
  async withdrawApplication(applicationUuid: string): Promise<ApiResponse<void>> {
    return apiClient.patch<void>(`/applications/${applicationUuid}/withdraw`, {});
  }

  // GET /applications/:uuid/resume/download — triggers browser download via fetch+blob
  async downloadApplicantResume(applicationUuid: string, fileName = 'resume.pdf'): Promise<void> {
    const url = `/api/applications/${applicationUuid}/resume/download`;
    const res = await fetch(url, { credentials: 'include' });
    if (!res.ok) throw new Error('Failed to download resume');
    const blob = await res.blob();
    const objectUrl = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = objectUrl;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(objectUrl);
  }
}

export const applicationService = new ApplicationService();
