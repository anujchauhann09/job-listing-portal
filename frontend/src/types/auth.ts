import { LoginFormData, RegisterFormData } from '@/validators/auth';

export type UserRole = 'job-seeker' | 'employer';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  profile: JobSeekerProfile | EmployerProfile;
  createdAt: Date;
  updatedAt: Date;
}

export interface JobSeekerProfile {
  firstName: string;
  lastName: string;
  phone?: string;
  location: string;
  bio?: string;
  skills: string[];
  experience: string;
  education: string;
  resumeUrl?: string;
  profileCompletion: number;
}

export interface EmployerProfile {
  companyName: string;
  industry: string;
  companySize: string;
  website?: string;
  description: string;
  logoUrl?: string;
  contactPerson: string;
  profileCompletion: number;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (data: LoginFormData) => Promise<unknown>;
  register: (data: RegisterFormData) => Promise<unknown>;
  logout: () => void;
  resetPassword: (data: unknown) => Promise<never>;
  changePassword: (data: unknown) => Promise<never>;
  updateProfile: (profile: Partial<User['profile']>) => Promise<User>;
  clearError: () => void;
  refreshUser: () => Promise<User | undefined>;
  loginWithSession: (bearerToken?: string) => Promise<User | undefined>;
  isAuthenticated: boolean;
  isJobSeeker: boolean;
  isEmployer: boolean;
}
