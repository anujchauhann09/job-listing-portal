import { LoginFormData, RegisterFormData, PasswordResetFormData, ChangePasswordFormData } from '@/validators/auth';

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

export interface AuthFormData {
  email: string;
  password: string;
  role?: UserRole;
  firstName?: string;
  lastName?: string;
  companyName?: string;
  rememberMe?: boolean;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (data: LoginFormData) => Promise<any>;
  register: (data: RegisterFormData) => Promise<any>;
  logout: () => void;
  resetPassword: (data: PasswordResetFormData) => Promise<any>;
  changePassword: (data: ChangePasswordFormData) => Promise<any>;
  updateProfile: (profile: Partial<JobSeekerProfile | EmployerProfile>) => Promise<User>;
  clearError: () => void;
  refreshUser: () => Promise<User | undefined>;
  loginWithSession: (bearerToken?: string) => Promise<User | undefined>;
  isAuthenticated: boolean;
  isJobSeeker: boolean;
  isEmployer: boolean;
}