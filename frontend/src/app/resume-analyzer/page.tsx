'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { 
  FileText,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Target,
  Award,
  Zap,
  Clock,
  BarChart3,
  Sparkles
} from 'lucide-react';

export default function ResumeAnalyzerPage() {
  const { user, logout } = useAuth();
  const [email, setEmail] = useState(user?.email || '');
  const [notified, setNotified] = useState(false);

  const handleNotifyMe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: Implement notification signup
    setNotified(true);
    setTimeout(() => setNotified(false), 5000);
  };

  const features = [
    {
      icon: BarChart3,
      title: 'Comprehensive Scoring',
      description: 'Get an overall score based on industry standards and best practices',
      color: 'primary',
    },
    {
      icon: Target,
      title: 'ATS Optimization',
      description: 'Ensure your resume passes Applicant Tracking Systems',
      color: 'success',
    },
    {
      icon: Sparkles,
      title: 'Keyword Analysis',
      description: 'Identify missing keywords and optimize for job descriptions',
      color: 'warning',
    },
    {
      icon: CheckCircle,
      title: 'Format Check',
      description: 'Verify your resume follows professional formatting guidelines',
      color: 'info',
    },
    {
      icon: TrendingUp,
      title: 'Improvement Suggestions',
      description: 'Receive actionable recommendations to enhance your resume',
      color: 'error',
    },
    {
      icon: Award,
      title: 'Industry Benchmarks',
      description: 'Compare your resume against top performers in your field',
      color: 'secondary',
    },
  ];

  const howItWorks = [
    {
      step: 1,
      title: 'Upload Your Resume',
      description: 'Simply upload your resume in PDF or Word format',
    },
    {
      step: 2,
      title: 'AI Analysis',
      description: 'Our advanced AI analyzes your resume against industry standards',
    },
    {
      step: 3,
      title: 'Get Your Score',
      description: 'Receive a detailed score with specific areas for improvement',
    },
    {
      step: 4,
      title: 'Improve & Resubmit',
      description: 'Make improvements and reanalyze to track your progress',
    },
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; icon: string }> = {
      primary: { bg: 'bg-primary-100 dark:bg-primary-900/30', icon: 'text-primary-600 dark:text-primary-400' },
      success: { bg: 'bg-success-100 dark:bg-success-900/30', icon: 'text-success-600 dark:text-success-400' },
      warning: { bg: 'bg-warning-100 dark:bg-warning-900/30', icon: 'text-warning-600 dark:text-warning-400' },
      error: { bg: 'bg-error-100 dark:bg-error-900/30', icon: 'text-error-600 dark:text-error-400' },
      info: { bg: 'bg-info-100 dark:bg-info-900/30', icon: 'text-info-600 dark:text-info-400' },
      secondary: { bg: 'bg-secondary-100 dark:bg-secondary-700', icon: 'text-secondary-600 dark:text-secondary-400' },
    };
    return colors[color] || colors.primary;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header user={user} onLogout={logout} />
      
      <main className="flex-1">
        <section className="relative bg-gradient-to-br from-warning-50 to-primary-50 dark:from-warning-900/20 dark:to-primary-900/20 py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-warning-100 dark:bg-warning-900/30 rounded-full flex items-center justify-center">
                  <FileText className="h-8 w-8 text-warning-600 dark:text-warning-400" />
                </div>
              </div>
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-warning-100 dark:bg-warning-900/30 text-warning-700 dark:text-warning-400 font-medium mb-6">
                <Clock className="h-4 w-4 mr-2" />
                Coming Soon
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-secondary-900 dark:text-secondary-100 mb-4">
                Resume Score Checker
              </h1>
              <p className="text-xl text-secondary-600 dark:text-secondary-400 mb-8">
                Get instant feedback on your resume with AI-powered analysis. Optimize your resume to land more interviews.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white dark:bg-secondary-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-secondary-900 dark:text-secondary-100 mb-4">
                What You'll Get
              </h2>
              <p className="text-lg text-secondary-600 dark:text-secondary-400">
                Powerful features to help you create the perfect resume
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                const colors = getColorClasses(feature.color);
                
                return (
                  <Card key={index} className="p-6 text-center">
                    <div className={`w-16 h-16 ${colors.bg} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <Icon className={`h-8 w-8 ${colors.icon}`} />
                    </div>
                    <h3 className="text-xl font-semibold text-secondary-900 dark:text-secondary-100 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-secondary-600 dark:text-secondary-400">
                      {feature.description}
                    </p>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-20 bg-secondary-50 dark:bg-secondary-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-secondary-900 dark:text-secondary-100 mb-4">
                How It Works
              </h2>
              <p className="text-lg text-secondary-600 dark:text-secondary-400">
                Simple, fast, and effective resume analysis
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {howItWorks.map((item, index) => (
                  <Card key={index} className="p-6 relative">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-primary-600 dark:bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-xl font-bold text-white">
                          {item.step}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-secondary-900 dark:text-secondary-100 mb-2">
                          {item.title}
                        </h3>
                        <p className="text-secondary-600 dark:text-secondary-400">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white dark:bg-secondary-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <Card className="p-8 bg-primary-50 dark:bg-primary-900/20 border-primary-200 dark:border-primary-800">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100 mb-2">
                    In the Meantime
                  </h2>
                  <p className="text-secondary-600 dark:text-secondary-400">
                    Check out these resources to improve your resume
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <a
                    href="/career-advice"
                    className="p-6 rounded-lg bg-white dark:bg-secondary-800 hover:shadow-md transition-shadow text-center"
                  >
                    <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                      <FileText className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                    </div>
                    <h3 className="font-semibold text-secondary-900 dark:text-secondary-100 mb-2">
                      Resume Tips
                    </h3>
                    <p className="text-sm text-secondary-600 dark:text-secondary-400">
                      Expert advice on writing great resumes
                    </p>
                  </a>

                  <a
                    href="/jobs"
                    className="p-6 rounded-lg bg-white dark:bg-secondary-800 hover:shadow-md transition-shadow text-center"
                  >
                    <div className="w-12 h-12 bg-success-100 dark:bg-success-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Target className="h-6 w-6 text-success-600 dark:text-success-400" />
                    </div>
                    <h3 className="font-semibold text-secondary-900 dark:text-secondary-100 mb-2">
                      Browse Jobs
                    </h3>
                    <p className="text-sm text-secondary-600 dark:text-secondary-400">
                      Find opportunities that match your skills
                    </p>
                  </a>

                  <a
                    href="/profile"
                    className="p-6 rounded-lg bg-white dark:bg-secondary-800 hover:shadow-md transition-shadow text-center"
                  >
                    <div className="w-12 h-12 bg-warning-100 dark:bg-warning-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Award className="h-6 w-6 text-warning-600 dark:text-warning-400" />
                    </div>
                    <h3 className="font-semibold text-secondary-900 dark:text-secondary-100 mb-2">
                      Update Profile
                    </h3>
                    <p className="text-sm text-secondary-600 dark:text-secondary-400">
                      Keep your profile up to date
                    </p>
                  </a>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
