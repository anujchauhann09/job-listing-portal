'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { User, JobSeekerProfile, EmployerProfile } from '@/types/auth';
import { cn } from '@/lib/utils';
import { 
  User as UserIcon, 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Briefcase, 
  GraduationCap,
  Edit,
  Download,
  Users
} from 'lucide-react';

interface ProfileDisplayProps {
  user: User;
  onEdit?: () => void;
  onDownloadResume?: () => void;
  className?: string;
}

export function ProfileDisplay({ user, onEdit, onDownloadResume, className }: ProfileDisplayProps) {
  const isJobSeeker = user.role === 'job-seeker';
  const profile = user.profile as JobSeekerProfile | EmployerProfile;

  const getProfileCompletion = () => {
    return profile.profileCompletion || 0;
  };

  const getCompletionColor = (completion: number) => {
    if (completion >= 80) return 'text-success-600';
    if (completion >= 50) return 'text-warning-600';
    return 'text-error-600';
  };

  return (
    <div className={cn('space-y-6', className)}>
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between space-y-4 sm:space-y-0">
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-primary-100 rounded-full flex items-center justify-center dark:bg-primary-900/20">
                {isJobSeeker ? (
                  <UserIcon className="h-8 w-8 sm:h-10 sm:w-10 text-primary-600 dark:text-primary-400" />
                ) : (
                  <Building2 className="h-8 w-8 sm:h-10 sm:w-10 text-primary-600 dark:text-primary-400" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <h1 className="text-xl sm:text-2xl font-bold text-secondary-900 dark:text-secondary-100">
                  {isJobSeeker 
                    ? `${(profile as JobSeekerProfile).firstName} ${(profile as JobSeekerProfile).lastName}`
                    : (profile as EmployerProfile).companyName
                  }
                </h1>
                
                {isJobSeeker ? (
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center text-secondary-600 dark:text-secondary-400">
                      <Mail className="h-4 w-4 mr-2" />
                      <span className="text-sm">{user.email}</span>
                    </div>
                    {(profile as JobSeekerProfile).phone && (
                      <div className="flex items-center text-secondary-600 dark:text-secondary-400">
                        <Phone className="h-4 w-4 mr-2" />
                        <span className="text-sm">{(profile as JobSeekerProfile).phone}</span>
                      </div>
                    )}
                    <div className="flex items-center text-secondary-600 dark:text-secondary-400">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span className="text-sm">{(profile as JobSeekerProfile).location}</span>
                    </div>
                  </div>
                ) : (
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center text-secondary-600 dark:text-secondary-400">
                      <Briefcase className="h-4 w-4 mr-2" />
                      <span className="text-sm">{(profile as EmployerProfile).industry}</span>
                    </div>
                    <div className="flex items-center text-secondary-600 dark:text-secondary-400">
                      <Users className="h-4 w-4 mr-2" />
                      <span className="text-sm">{(profile as EmployerProfile).companySize} employees</span>
                    </div>
                    {(profile as EmployerProfile).website && (
                      <div className="flex items-center text-secondary-600 dark:text-secondary-400">
                        <Globe className="h-4 w-4 mr-2" />
                        <a 
                          href={(profile as EmployerProfile).website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
                        >
                          {(profile as EmployerProfile).website}
                        </a>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:items-end space-y-3">
              <div className="text-center sm:text-right">
                <div className="text-sm text-secondary-600 dark:text-secondary-400">
                  Profile Completion
                </div>
                <div className={cn('text-lg font-semibold', getCompletionColor(getProfileCompletion()))}>
                  {getProfileCompletion()}%
                </div>
              </div>

              <div className="flex space-x-2">
                {isJobSeeker && (profile as JobSeekerProfile).resumeUrl && onDownloadResume && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onDownloadResume}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Resume
                  </Button>
                )}
                {onEdit && (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={onEdit}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {isJobSeeker && (
        <>
          {(profile as JobSeekerProfile).bio && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">About</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-secondary-700 dark:text-secondary-300 leading-relaxed">
                  {(profile as JobSeekerProfile).bio}
                </p>
              </CardContent>
            </Card>
          )}

          {(profile as JobSeekerProfile).skills && (profile as JobSeekerProfile).skills.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {(profile as JobSeekerProfile).skills.map((skill, index) => (
                    <Badge key={index} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Briefcase className="h-5 w-5 mr-2" />
                Work Experience
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <p className="text-secondary-700 dark:text-secondary-300 whitespace-pre-line">
                  {(profile as JobSeekerProfile).experience}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <GraduationCap className="h-5 w-5 mr-2" />
                Education
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <p className="text-secondary-700 dark:text-secondary-300 whitespace-pre-line">
                  {(profile as JobSeekerProfile).education}
                </p>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {!isJobSeeker && (
        <>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">About the Company</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <p className="text-secondary-700 dark:text-secondary-300 whitespace-pre-line">
                  {(profile as EmployerProfile).description}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center">
                  <UserIcon className="h-4 w-4 mr-3 text-secondary-500" />
                  <span className="text-sm">
                    <span className="font-medium">Contact Person:</span>{' '}
                    {(profile as EmployerProfile).contactPerson}
                  </span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-3 text-secondary-500" />
                  <span className="text-sm">
                    <span className="font-medium">Email:</span> {user.email}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}