export interface ProfileData {
  firstName?: string;
  lastName?: string;
  phone?: string;
  location?: string;
  bio?: string;
  skills?: string[];
  experience?: string;
  education?: string;
  resumeUrl?: string;
  
  companyName?: string;
  industry?: string;
  companySize?: string;
  website?: string;
  description?: string;
  logoUrl?: string;
  contactPerson?: string;
}

export interface SettingsData {
  email: string;
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
  notifications: {
    email: boolean;
    push: boolean;
    marketing: boolean;
  };
  privacy: {
    profileVisible: boolean;
    showEmail: boolean;
  };
}