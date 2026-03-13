'use client';

import React, { useEffect, useState } from 'react';
import { useAuth, withAuth } from '@/context/AuthContext';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { Edit, User, Loader2, Upload, X, Briefcase } from 'lucide-react';
import { profileService, UserProfile } from '@/services/profile';
import { jobSeekerService, JobSeekerProfile } from '@/services/jobSeeker';
import { employerService, EmployerProfile } from '@/services/employer';

function ProfilePage() {
  const { user, logout, refreshUser } = useAuth();
  const [isEditingUser, setIsEditingUser] = useState(false);
  const [isEditingJobSeeker, setIsEditingJobSeeker] = useState(false);
  const [isEditingEmployer, setIsEditingEmployer] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [jobSeekerProfile, setJobSeekerProfile] = useState<JobSeekerProfile | null>(null);
  const [employerProfile, setEmployerProfile] = useState<EmployerProfile | null>(null);
  
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    type: 'avatar' | 'resume' | 'logo';
  }>({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {},
    type: 'avatar',
  });
  
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    phone: '',
  });

  const [jobSeekerFormData, setJobSeekerFormData] = useState({
    experienceYears: '',
    currentTitle: '',
    currentLocation: '',
    expectedSalary: '',
    noticePeriodDays: '',
    skills: [] as string[],
    skillInput: '',
  });

  const [employerFormData, setEmployerFormData] = useState({
    companyName: '',
    companyDescription: '',
    companySize: '',
    industry: '',
    website: '',
    headquartersCity: '',
    headquartersCountry: '',
  });

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await profileService.getMyProfile();
        
        if (response.success && response.data) {
          setProfile(response.data);
          setFormData({
            name: response.data.name || '',
            bio: response.data.bio || '',
            phone: response.data.phone || '',
          });
        }

        if (user?.role === 'job-seeker') {
          try {
            const jsResponse = await jobSeekerService.getMyProfile();
            if (jsResponse.success && jsResponse.data) {
              setJobSeekerProfile(jsResponse.data.profile);
              setJobSeekerFormData({
                experienceYears: jsResponse.data.profile.experienceYears?.toString() || '',
                currentTitle: jsResponse.data.profile.currentTitle || '',
                currentLocation: jsResponse.data.profile.currentLocation || '',
                expectedSalary: jsResponse.data.profile.expectedSalary?.toString() || '',
                noticePeriodDays: jsResponse.data.profile.noticePeriodDays?.toString() || '',
                skills: jsResponse.data.profile.skills || [],
                skillInput: '',
              });
            }
          } catch (err: any) {
            console.log('Job seeker profile not found - user can create one');
          }
        } else if (user?.role === 'employer') {
          try {
            const empResponse = await employerService.getMyProfile();
            if (empResponse.success && empResponse.data) {
              setEmployerProfile(empResponse.data);
              setEmployerFormData({
                companyName: empResponse.data.companyName || '',
                companyDescription: empResponse.data.companyDescription || '',
                companySize: empResponse.data.companySize?.toString() || '',
                industry: empResponse.data.industry || '',
                website: empResponse.data.website || '',
                headquartersCity: empResponse.data.headquartersCity || '',
                headquartersCountry: empResponse.data.headquartersCountry || '',
              });
            }
          } catch (err: any) {
            console.log('Employer profile not found - user can create one');
          }
        }
      } catch (err: any) {
        console.error('Failed to load profile:', err);
        setError(err.message || 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      loadProfile();
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setSaving(true);
      setError(null);

      const updateData: any = {};
      if (formData.name.trim()) updateData.name = formData.name.trim();
      if (formData.bio.trim()) updateData.bio = formData.bio.trim();
      if (formData.phone.trim()) updateData.phone = formData.phone.trim();

      const response = await profileService.updateMyProfile(updateData);
      
      if (response.success && response.data) {
        setProfile(response.data);
        setIsEditingUser(false);
      }
    } catch (err: any) {
      console.error('Failed to update profile:', err);
      setError(err.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 1024 * 1024) {
      setError('Avatar file size must be less than 1MB');
      return;
    }

    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setError('Only PNG, JPG, JPEG, and WEBP images are allowed');
      return;
    }

    try {
      setUploading(true);
      setError(null);

      const response = await profileService.uploadAvatar(file);
      
      if (response.success && response.data) {
        setProfile(prev => prev ? { ...prev, avatarUrl: response.data.avatarUrl } : null);
      }
    } catch (err: any) {
      console.error('Failed to upload avatar:', err);
      setError(err.message || 'Failed to upload avatar');
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteAvatar = async () => {
    setConfirmDialog({
      isOpen: true,
      title: 'Delete Avatar',
      message: 'Are you sure you want to delete your profile picture? This action cannot be undone.',
      type: 'avatar',
      onConfirm: async () => {
        try {
          setUploading(true);
          setError(null);

          await profileService.deleteAvatar();
          
          setProfile(prev => prev ? { ...prev, avatarUrl: null } : null);
          setConfirmDialog(prev => ({ ...prev, isOpen: false }));
        } catch (err: any) {
          console.error('Failed to delete avatar:', err);
          setError(err.message || 'Failed to delete avatar');
        } finally {
          setUploading(false);
        }
      },
    });
  };

  const handleJobSeekerInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setJobSeekerFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddSkill = () => {
    const skill = jobSeekerFormData.skillInput.trim();
    if (skill && !jobSeekerFormData.skills.includes(skill)) {
      setJobSeekerFormData(prev => ({
        ...prev,
        skills: [...prev.skills, skill],
        skillInput: '',
      }));
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setJobSeekerFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove),
    }));
  };

  const handleJobSeekerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setSaving(true);
      setError(null);

      const updateData: any = {};
      if (jobSeekerFormData.experienceYears) updateData.experienceYears = parseInt(jobSeekerFormData.experienceYears);
      if (jobSeekerFormData.currentTitle.trim()) updateData.currentTitle = jobSeekerFormData.currentTitle.trim();
      if (jobSeekerFormData.currentLocation.trim()) updateData.currentLocation = jobSeekerFormData.currentLocation.trim();
      if (jobSeekerFormData.expectedSalary) updateData.expectedSalary = parseInt(jobSeekerFormData.expectedSalary);
      if (jobSeekerFormData.noticePeriodDays) updateData.noticePeriodDays = parseInt(jobSeekerFormData.noticePeriodDays);
      if (jobSeekerFormData.skills.length > 0) updateData.skills = jobSeekerFormData.skills;

      await jobSeekerService.updateMyProfile(updateData);
      
      const response = await jobSeekerService.getMyProfile();
      if (response.success && response.data) {
        setJobSeekerProfile(response.data.profile);
      }
      
      setIsEditingJobSeeker(false);
    } catch (err: any) {
      console.error('Failed to update job seeker profile:', err);
      setError(err.message || 'Failed to update job seeker profile');
    } finally {
      setSaving(false);
    }
  };

  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setError('Resume file size must be less than 5MB');
      return;
    }

    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      setError('Only PDF, DOC, and DOCX files are allowed');
      return;
    }

    try {
      setUploading(true);
      setError(null);

      const response = await jobSeekerService.uploadResume(file);
      
      if (response.success && response.data) {
        setJobSeekerProfile(prev => prev ? { ...prev, resumeUrl: response.data.resumeUrl } : null);
      }
    } catch (err: any) {
      console.error('Failed to upload resume:', err);
      setError(err.message || 'Failed to upload resume');
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteResume = async () => {
    setConfirmDialog({
      isOpen: true,
      title: 'Delete Resume',
      message: 'Are you sure you want to delete your resume? You will need to upload a new one if you want to apply for jobs.',
      type: 'resume',
      onConfirm: async () => {
        try {
          setUploading(true);
          setError(null);

          await jobSeekerService.deleteResume();
          
          setJobSeekerProfile(prev => prev ? { ...prev, resumeUrl: null } : null);
          setConfirmDialog(prev => ({ ...prev, isOpen: false }));
        } catch (err: any) {
          console.error('Failed to delete resume:', err);
          setError(err.message || 'Failed to delete resume');
        } finally {
          setUploading(false);
        }
      },
    });
  };

  const handleEmployerInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEmployerFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEmployerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setSaving(true);
      setError(null);

      const updateData: any = {};
      if (employerFormData.companyName.trim()) updateData.companyName = employerFormData.companyName.trim();
      if (employerFormData.companyDescription.trim()) updateData.companyDescription = employerFormData.companyDescription.trim();
      if (employerFormData.companySize) updateData.companySize = parseInt(employerFormData.companySize);
      if (employerFormData.industry.trim()) updateData.industry = employerFormData.industry.trim();
      if (employerFormData.website.trim()) updateData.website = employerFormData.website.trim();
      if (employerFormData.headquartersCity.trim()) updateData.headquartersCity = employerFormData.headquartersCity.trim();
      if (employerFormData.headquartersCountry.trim()) updateData.headquartersCountry = employerFormData.headquartersCountry.trim();

      await employerService.updateMyProfile(updateData);
      
      const response = await employerService.getMyProfile();
      if (response.success && response.data) {
        setEmployerProfile(response.data);
      }
      
      setIsEditingEmployer(false);
    } catch (err: any) {
      console.error('Failed to update employer profile:', err);
      setError(err.message || 'Failed to update employer profile');
    } finally {
      setSaving(false);
    }
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setError('Logo file size must be less than 2MB');
      return;
    }

    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setError('Only PNG, JPG, JPEG, and WEBP images are allowed');
      return;
    }

    try {
      setUploading(true);
      setError(null);

      const response = await employerService.uploadLogo(file);
      
      if (response.success && response.data) {
        setEmployerProfile(prev => prev ? { ...prev, companyLogoUrl: response.data.companyLogoUrl } : null);
      }
    } catch (err: any) {
      console.error('Failed to upload logo:', err);
      setError(err.message || 'Failed to upload logo');
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteLogo = async () => {
    setConfirmDialog({
      isOpen: true,
      title: 'Delete Company Logo',
      message: 'Are you sure you want to delete your company logo? This will be visible on all your job postings.',
      type: 'logo',
      onConfirm: async () => {
        try {
          setUploading(true);
          setError(null);

          await employerService.deleteLogo();
          
          setEmployerProfile(prev => prev ? { ...prev, companyLogoUrl: null } : null);
          setConfirmDialog(prev => ({ ...prev, isOpen: false }));
        } catch (err: any) {
          console.error('Failed to delete logo:', err);
          setError(err.message || 'Failed to delete logo');
        } finally {
          setUploading(false);
        }
      },
    });
  };

  if (!user) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header user={user} onLogout={logout} />
        <main className="flex-1 flex items-center justify-center bg-secondary-50 dark:bg-secondary-900">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin text-primary-600 mx-auto mb-4" />
            <p className="text-secondary-600 dark:text-secondary-400">Loading profile...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header user={user} onLogout={logout} />
      
      <main className="flex-1 bg-secondary-50 dark:bg-secondary-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Page Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-secondary-900 dark:text-secondary-100">
                      My Profile
                    </h1>
                    <p className="text-secondary-600 dark:text-secondary-400">
                      Manage your personal information
                    </p>
                  </div>
                </div>
                
                {!isEditingUser && (
                  <Button
                    variant="primary"
                    onClick={() => setIsEditingUser(true)}
                    className="flex items-center space-x-2"
                  >
                    <Edit className="h-4 w-4" />
                    <span>Edit Profile</span>
                  </Button>
                )}
              </div>
            </div>

            {error && (
              <div className="mb-6 p-4 rounded-lg bg-error-50 border border-error-200 dark:bg-error-900/20 dark:border-error-800">
                <p className="text-sm text-error-600 dark:text-error-400">{error}</p>
              </div>
            )}

            <Card className="p-6 sm:p-8">
              <div className="mb-8 pb-8 border-b border-secondary-200 dark:border-secondary-700">
                <h2 className="text-lg font-semibold text-secondary-900 dark:text-secondary-100 mb-4">
                  Profile Picture
                </h2>
                <div className="flex items-center space-x-6">
                  <div className="relative">
                    {profile?.avatarUrl ? (
                      <img
                        src={profile.avatarUrl}
                        alt="Profile avatar"
                        className="w-24 h-24 rounded-full object-cover border-2 border-secondary-200 dark:border-secondary-700"
                      />
                    ) : (
                      <div className="w-24 h-24 rounded-full bg-secondary-200 dark:bg-secondary-700 flex items-center justify-center">
                        <User className="w-12 h-12 text-secondary-400 dark:text-secondary-500" />
                      </div>
                    )}
                    {uploading && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
                        <Loader2 className="w-6 h-6 animate-spin text-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <label className="inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-secondary-300 bg-transparent text-secondary-700 hover:bg-secondary-50 active:bg-secondary-100 dark:border-secondary-600 dark:text-secondary-300 dark:hover:bg-secondary-800 h-8 px-3 text-sm cursor-pointer">
                        <input
                          type="file"
                          accept="image/png,image/jpeg,image/jpg,image/webp"
                          onChange={handleAvatarUpload}
                          disabled={uploading}
                          className="hidden"
                        />
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Avatar
                      </label>
                      {profile?.avatarUrl && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={handleDeleteAvatar}
                          disabled={uploading}
                          className="text-error-600 hover:text-error-700"
                        >
                          <X className="w-4 h-4 mr-2" />
                          Remove
                        </Button>
                      )}
                    </div>
                    <p className="text-xs text-secondary-500 dark:text-secondary-400 mt-2">
                      PNG, JPG, JPEG, or WEBP. Max size 1MB.
                    </p>
                  </div>
                </div>
              </div>

              {isEditingUser ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <Input
                    label="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                  />

                  <div>
                    <label className="block text-sm font-medium text-secondary-900 dark:text-secondary-100 mb-2">
                      Bio
                    </label>
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:border-secondary-600 dark:bg-secondary-800 dark:text-secondary-100"
                      placeholder="Tell us about yourself..."
                      maxLength={500}
                    />
                    <p className="text-xs text-secondary-500 dark:text-secondary-400 mt-1">
                      {formData.bio.length}/500 characters
                    </p>
                  </div>

                  <Input
                    label="Phone Number"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 123-4567"
                  />

                  <div className="flex justify-end space-x-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setIsEditingUser(false);
                        setFormData({
                          name: profile?.name || '',
                          bio: profile?.bio || '',
                          phone: profile?.phone || '',
                        });
                        setError(null);
                      }}
                      disabled={saving}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      variant="primary"
                      loading={saving}
                      disabled={saving}
                    >
                      Save Changes
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-secondary-600 dark:text-secondary-400 mb-1">
                      Full Name
                    </label>
                    <p className="text-base text-secondary-900 dark:text-secondary-100">
                      {profile?.name || <span className="text-secondary-400 italic">Not provided</span>}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary-600 dark:text-secondary-400 mb-1">
                      Email
                    </label>
                    <p className="text-base text-secondary-900 dark:text-secondary-100">
                      {user.email}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary-600 dark:text-secondary-400 mb-1">
                      Bio
                    </label>
                    <p className="text-base text-secondary-900 dark:text-secondary-100 whitespace-pre-wrap">
                      {profile?.bio || <span className="text-secondary-400 italic">No bio provided</span>}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary-600 dark:text-secondary-400 mb-1">
                      Phone Number
                    </label>
                    <p className="text-base text-secondary-900 dark:text-secondary-100">
                      {profile?.phone || <span className="text-secondary-400 italic">Not provided</span>}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary-600 dark:text-secondary-400 mb-1">
                      Role
                    </label>
                    <p className="text-base text-secondary-900 dark:text-secondary-100 capitalize">
                      {user.role === 'job-seeker' ? 'Job Seeker' : 'Employer'}
                    </p>
                  </div>
                </div>
              )}
            </Card>

            {user.role === 'job-seeker' && (
              <Card className="p-6 sm:p-8 mt-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100">
                    Professional Profile
                  </h2>
                  {!isEditingJobSeeker && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsEditingJobSeeker(true)}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  )}
                </div>

                <div className="mb-8 pb-8 border-b border-secondary-200 dark:border-secondary-700">
                  <h3 className="text-lg font-semibold text-secondary-900 dark:text-secondary-100 mb-4">
                    Resume
                  </h3>
                  <div className="flex items-center space-x-4">
                    {jobSeekerProfile?.resumeUrl ? (
                      <div className="flex-1 flex items-center justify-between p-4 bg-secondary-50 dark:bg-secondary-800 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded flex items-center justify-center">
                            <Upload className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-secondary-900 dark:text-secondary-100">
                              Resume uploaded
                            </p>
                            <a
                              href="/api/job-seeker/profile/resume/download"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-primary-600 dark:text-primary-400 hover:underline"
                            >
                              Download Resume
                            </a>
                          </div>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={handleDeleteResume}
                          disabled={uploading}
                          className="text-error-600 hover:text-error-700"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="flex-1">
                        <label className="inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-secondary-300 bg-transparent text-secondary-700 hover:bg-secondary-50 active:bg-secondary-100 dark:border-secondary-600 dark:text-secondary-300 dark:hover:bg-secondary-800 h-9 px-4 text-sm cursor-pointer">
                          <input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={handleResumeUpload}
                            disabled={uploading}
                            className="hidden"
                          />
                          <Upload className="w-4 h-4 mr-2" />
                          Upload Resume
                        </label>
                        <p className="text-xs text-secondary-500 dark:text-secondary-400 mt-2">
                          PDF, DOC, or DOCX. Max size 5MB.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {isEditingJobSeeker ? (
                  <form onSubmit={handleJobSeekerSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Input
                        label="Years of Experience"
                        name="experienceYears"
                        type="number"
                        min="0"
                        value={jobSeekerFormData.experienceYears}
                        onChange={handleJobSeekerInputChange}
                        placeholder="e.g., 3"
                      />

                      <Input
                        label="Current Title"
                        name="currentTitle"
                        value={jobSeekerFormData.currentTitle}
                        onChange={handleJobSeekerInputChange}
                        placeholder="e.g., Software Engineer"
                      />

                      <Input
                        label="Current Location"
                        name="currentLocation"
                        value={jobSeekerFormData.currentLocation}
                        onChange={handleJobSeekerInputChange}
                        placeholder="e.g., San Francisco, CA"
                      />

                      <Input
                        label="Expected Salary (Annual)"
                        name="expectedSalary"
                        type="number"
                        min="0"
                        value={jobSeekerFormData.expectedSalary}
                        onChange={handleJobSeekerInputChange}
                        placeholder="e.g., 100000"
                      />

                      <Input
                        label="Notice Period (Days)"
                        name="noticePeriodDays"
                        type="number"
                        min="0"
                        value={jobSeekerFormData.noticePeriodDays}
                        onChange={handleJobSeekerInputChange}
                        placeholder="e.g., 30"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-secondary-900 dark:text-secondary-100 mb-2">
                        Skills
                      </label>
                      <div className="flex items-center space-x-2 mb-3">
                        <Input
                          name="skillInput"
                          value={jobSeekerFormData.skillInput}
                          onChange={handleJobSeekerInputChange}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleAddSkill();
                            }
                          }}
                          placeholder="Add a skill (e.g., React, Node.js)"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={handleAddSkill}
                        >
                          Add
                        </Button>
                      </div>
                      {jobSeekerFormData.skills.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {jobSeekerFormData.skills.map((skill, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400"
                            >
                              {skill}
                              <button
                                type="button"
                                onClick={() => handleRemoveSkill(skill)}
                                className="ml-2 hover:text-primary-900 dark:hover:text-primary-200"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="flex justify-end space-x-3">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setIsEditingJobSeeker(false);
                          if (jobSeekerProfile) {
                            setJobSeekerFormData({
                              experienceYears: jobSeekerProfile.experienceYears?.toString() || '',
                              currentTitle: jobSeekerProfile.currentTitle || '',
                              currentLocation: jobSeekerProfile.currentLocation || '',
                              expectedSalary: jobSeekerProfile.expectedSalary?.toString() || '',
                              noticePeriodDays: jobSeekerProfile.noticePeriodDays?.toString() || '',
                              skills: jobSeekerProfile.skills || [],
                              skillInput: '',
                            });
                          }
                          setError(null);
                        }}
                        disabled={saving}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        variant="primary"
                        loading={saving}
                        disabled={saving}
                      >
                        Save Changes
                      </Button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-secondary-600 dark:text-secondary-400 mb-1">
                          Years of Experience
                        </label>
                        <p className="text-base text-secondary-900 dark:text-secondary-100">
                          {jobSeekerProfile?.experienceYears ?? <span className="text-secondary-400 italic">Not provided</span>}
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-secondary-600 dark:text-secondary-400 mb-1">
                          Current Title
                        </label>
                        <p className="text-base text-secondary-900 dark:text-secondary-100">
                          {jobSeekerProfile?.currentTitle || <span className="text-secondary-400 italic">Not provided</span>}
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-secondary-600 dark:text-secondary-400 mb-1">
                          Current Location
                        </label>
                        <p className="text-base text-secondary-900 dark:text-secondary-100">
                          {jobSeekerProfile?.currentLocation || <span className="text-secondary-400 italic">Not provided</span>}
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-secondary-600 dark:text-secondary-400 mb-1">
                          Expected Salary
                        </label>
                        <p className="text-base text-secondary-900 dark:text-secondary-100">
                          {jobSeekerProfile?.expectedSalary 
                            ? `$${jobSeekerProfile.expectedSalary.toLocaleString()}/year`
                            : <span className="text-secondary-400 italic">Not provided</span>
                          }
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-secondary-600 dark:text-secondary-400 mb-1">
                          Notice Period
                        </label>
                        <p className="text-base text-secondary-900 dark:text-secondary-100">
                          {jobSeekerProfile?.noticePeriodDays 
                            ? `${jobSeekerProfile.noticePeriodDays} days`
                            : <span className="text-secondary-400 italic">Not provided</span>
                          }
                        </p>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-secondary-600 dark:text-secondary-400 mb-2">
                        Skills
                      </label>
                      {jobSeekerProfile?.skills && jobSeekerProfile.skills.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {jobSeekerProfile.skills.map((skill, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <p className="text-base text-secondary-400 italic">No skills added</p>
                      )}
                    </div>
                  </div>
                )}
              </Card>
            )}

            {user.role === 'employer' && (
              <Card className="p-6 sm:p-8 mt-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100">
                    Company Profile
                  </h2>
                  {!isEditingEmployer && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsEditingEmployer(true)}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  )}
                </div>

                <div className="mb-8 pb-8 border-b border-secondary-200 dark:border-secondary-700">
                  <h3 className="text-lg font-semibold text-secondary-900 dark:text-secondary-100 mb-4">
                    Company Logo
                  </h3>
                  <div className="flex items-center space-x-6">
                    <div className="relative">
                      {employerProfile?.companyLogoUrl ? (
                        <img
                          src={employerProfile.companyLogoUrl}
                          alt="Company logo"
                          className="w-24 h-24 rounded-lg object-cover border-2 border-secondary-200 dark:border-secondary-700"
                        />
                      ) : (
                        <div className="w-24 h-24 rounded-lg bg-secondary-200 dark:bg-secondary-700 flex items-center justify-center">
                          <Briefcase className="w-12 h-12 text-secondary-400 dark:text-secondary-500" />
                        </div>
                      )}
                      {uploading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
                          <Loader2 className="w-6 h-6 animate-spin text-white" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <label className="inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-secondary-300 bg-transparent text-secondary-700 hover:bg-secondary-50 active:bg-secondary-100 dark:border-secondary-600 dark:text-secondary-300 dark:hover:bg-secondary-800 h-8 px-3 text-sm cursor-pointer">
                          <input
                            type="file"
                            accept="image/png,image/jpeg,image/jpg,image/webp"
                            onChange={handleLogoUpload}
                            disabled={uploading}
                            className="hidden"
                          />
                          <Upload className="w-4 h-4 mr-2" />
                          Upload Logo
                        </label>
                        {employerProfile?.companyLogoUrl && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={handleDeleteLogo}
                            disabled={uploading}
                            className="text-error-600 hover:text-error-700"
                          >
                            <X className="w-4 h-4 mr-2" />
                            Remove
                          </Button>
                        )}
                      </div>
                      <p className="text-xs text-secondary-500 dark:text-secondary-400 mt-2">
                        PNG, JPG, JPEG, or WEBP. Max size 2MB.
                      </p>
                    </div>
                  </div>
                </div>

                {isEditingEmployer ? (
                  <form onSubmit={handleEmployerSubmit} className="space-y-6">
                    <Input
                      label="Company Name"
                      name="companyName"
                      value={employerFormData.companyName}
                      onChange={handleEmployerInputChange}
                      placeholder="e.g., Acme Corporation"
                    />

                    <div>
                      <label className="block text-sm font-medium text-secondary-900 dark:text-secondary-100 mb-2">
                        Company Description
                      </label>
                      <textarea
                        name="companyDescription"
                        value={employerFormData.companyDescription}
                        onChange={handleEmployerInputChange}
                        rows={4}
                        className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:border-secondary-600 dark:bg-secondary-800 dark:text-secondary-100"
                        placeholder="Tell us about your company..."
                        maxLength={1000}
                      />
                      <p className="text-xs text-secondary-500 dark:text-secondary-400 mt-1">
                        {employerFormData.companyDescription.length}/1000 characters
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Input
                        label="Company Size"
                        name="companySize"
                        type="number"
                        min="1"
                        value={employerFormData.companySize}
                        onChange={handleEmployerInputChange}
                        placeholder="e.g., 50"
                      />

                      <Input
                        label="Industry"
                        name="industry"
                        value={employerFormData.industry}
                        onChange={handleEmployerInputChange}
                        placeholder="e.g., Information Technology"
                      />

                      <Input
                        label="Website"
                        name="website"
                        type="url"
                        value={employerFormData.website}
                        onChange={handleEmployerInputChange}
                        placeholder="https://example.com"
                      />

                      <Input
                        label="Headquarters City"
                        name="headquartersCity"
                        value={employerFormData.headquartersCity}
                        onChange={handleEmployerInputChange}
                        placeholder="e.g., San Francisco"
                      />

                      <Input
                        label="Headquarters Country"
                        name="headquartersCountry"
                        value={employerFormData.headquartersCountry}
                        onChange={handleEmployerInputChange}
                        placeholder="e.g., United States"
                      />
                    </div>

                    <div className="flex justify-end space-x-3">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setIsEditingEmployer(false);
                          if (employerProfile) {
                            setEmployerFormData({
                              companyName: employerProfile.companyName || '',
                              companyDescription: employerProfile.companyDescription || '',
                              companySize: employerProfile.companySize?.toString() || '',
                              industry: employerProfile.industry || '',
                              website: employerProfile.website || '',
                              headquartersCity: employerProfile.headquartersCity || '',
                              headquartersCountry: employerProfile.headquartersCountry || '',
                            });
                          }
                          setError(null);
                        }}
                        disabled={saving}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        variant="primary"
                        loading={saving}
                        disabled={saving}
                      >
                        Save Changes
                      </Button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-secondary-600 dark:text-secondary-400 mb-1">
                        Company Name
                      </label>
                      <p className="text-base text-secondary-900 dark:text-secondary-100">
                        {employerProfile?.companyName || <span className="text-secondary-400 italic">Not provided</span>}
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-secondary-600 dark:text-secondary-400 mb-1">
                        Company Description
                      </label>
                      <p className="text-base text-secondary-900 dark:text-secondary-100 whitespace-pre-wrap">
                        {employerProfile?.companyDescription || <span className="text-secondary-400 italic">No description provided</span>}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-secondary-600 dark:text-secondary-400 mb-1">
                          Company Size
                        </label>
                        <p className="text-base text-secondary-900 dark:text-secondary-100">
                          {employerProfile?.companySize 
                            ? `${employerProfile.companySize} employees`
                            : <span className="text-secondary-400 italic">Not provided</span>
                          }
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-secondary-600 dark:text-secondary-400 mb-1">
                          Industry
                        </label>
                        <p className="text-base text-secondary-900 dark:text-secondary-100">
                          {employerProfile?.industry || <span className="text-secondary-400 italic">Not provided</span>}
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-secondary-600 dark:text-secondary-400 mb-1">
                          Website
                        </label>
                        <p className="text-base text-secondary-900 dark:text-secondary-100">
                          {employerProfile?.website ? (
                            <a
                              href={employerProfile.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary-600 dark:text-primary-400 hover:underline"
                            >
                              {employerProfile.website}
                            </a>
                          ) : (
                            <span className="text-secondary-400 italic">Not provided</span>
                          )}
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-secondary-600 dark:text-secondary-400 mb-1">
                          Headquarters
                        </label>
                        <p className="text-base text-secondary-900 dark:text-secondary-100">
                          {employerProfile?.headquartersCity && employerProfile?.headquartersCountry
                            ? `${employerProfile.headquartersCity}, ${employerProfile.headquartersCountry}`
                            : <span className="text-secondary-400 italic">Not provided</span>
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </Card>
            )}
          </div>
        </div>
      </main>

      <Footer />

      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        onClose={() => setConfirmDialog(prev => ({ ...prev, isOpen: false }))}
        onConfirm={confirmDialog.onConfirm}
        title={confirmDialog.title}
        message={confirmDialog.message}
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
        loading={uploading}
      />
    </div>
  );
}

export default withAuth(ProfilePage);