'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export const dynamic = 'force-dynamic';
import { 
  Search, 
  Users, 
  Briefcase, 
  TrendingUp, 
  Shield, 
  Zap,
  ArrowRight,
  CheckCircle,
  Star
} from 'lucide-react';
import { ROUTES } from '@/lib/constants';

export default function Home() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <Header user={user} onLogout={logout} />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900 py-20 sm:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-secondary-900 dark:text-secondary-100 mb-6">
                Find Your Dream Job or 
                <span className="text-primary-600 dark:text-primary-400"> Perfect Candidate</span>
              </h1>
              <p className="text-xl text-secondary-600 dark:text-secondary-400 mb-8 max-w-2xl mx-auto">
                Connect with opportunities that match your skills and ambitions. 
                Join thousands of professionals who trust Employrix for their career journey.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                {!user ? (
                  <>
                    <Button size="lg" asChild>
                      <Link href={ROUTES.REGISTER}>
                        Get Started
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                    <Button variant="outline" size="lg" asChild>
                      <Link href={ROUTES.JOBS}>
                        Browse Jobs
                      </Link>
                    </Button>
                  </>
                ) : (
                  <>
                    <Button size="lg" asChild>
                      <Link href={user.role === 'job-seeker' ? ROUTES.DASHBOARD_JOB_SEEKER : ROUTES.DASHBOARD_EMPLOYER}>
                        Go to Dashboard
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                    <Button variant="outline" size="lg" asChild>
                      <Link href={ROUTES.JOBS}>
                        {user.role === 'job-seeker' ? 'Find Jobs' : 'View All Jobs'}
                      </Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white dark:bg-secondary-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-secondary-900 dark:text-secondary-100 mb-4">
                Why Choose Employrix?
              </h2>
              <p className="text-xl text-secondary-600 dark:text-secondary-400 max-w-2xl mx-auto">
                We make job searching and hiring simple, efficient, and effective for everyone.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="text-center p-8 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="h-8 w-8 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-xl font-semibold text-secondary-900 dark:text-secondary-100 mb-4">
                  Smart Job Search
                </h3>
                <p className="text-secondary-600 dark:text-secondary-400">
                  Advanced filters and AI-powered recommendations help you find the perfect job match quickly.
                </p>
              </Card>

              <Card className="text-center p-8 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-success-100 dark:bg-success-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="h-8 w-8 text-success-600 dark:text-success-400" />
                </div>
                <h3 className="text-xl font-semibold text-secondary-900 dark:text-secondary-100 mb-4">
                  Quality Candidates
                </h3>
                <p className="text-secondary-600 dark:text-secondary-400">
                  Connect with pre-screened, qualified professionals who match your company culture and requirements.
                </p>
              </Card>

              <Card className="text-center p-8 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-warning-100 dark:bg-warning-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Zap className="h-8 w-8 text-warning-600 dark:text-warning-400" />
                </div>
                <h3 className="text-xl font-semibold text-secondary-900 dark:text-secondary-100 mb-4">
                  Fast & Easy
                </h3>
                <p className="text-secondary-600 dark:text-secondary-400">
                  Streamlined application process and intuitive interface make job searching and hiring effortless.
                </p>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-20 bg-secondary-50 dark:bg-secondary-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">1+</div>
                <div className="text-secondary-600 dark:text-secondary-400">Active Jobs</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">1+</div>
                <div className="text-secondary-600 dark:text-secondary-400">Job Seekers</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">1+</div>
                <div className="text-secondary-600 dark:text-secondary-400">Companies</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">95%</div>
                <div className="text-secondary-600 dark:text-secondary-400">Success Rate</div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white dark:bg-secondary-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-secondary-900 dark:text-secondary-100 mb-4">
                How It Works
              </h2>
              <p className="text-xl text-secondary-600 dark:text-secondary-400">
                Get started in just a few simple steps
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div>
                <h3 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100 mb-8 text-center">
                  For Job Seekers
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                      1
                    </div>
                    <div>
                      <h4 className="font-semibold text-secondary-900 dark:text-secondary-100 mb-2">
                        Create Your Profile
                      </h4>
                      <p className="text-secondary-600 dark:text-secondary-400">
                        Sign up and build a comprehensive profile showcasing your skills and experience.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold text-secondary-900 dark:text-secondary-100 mb-2">
                        Search & Apply
                      </h4>
                      <p className="text-secondary-600 dark:text-secondary-400">
                        Browse thousands of jobs and apply to positions that match your interests.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                      3
                    </div>
                    <div>
                      <h4 className="font-semibold text-secondary-900 dark:text-secondary-100 mb-2">
                        Get Hired
                      </h4>
                      <p className="text-secondary-600 dark:text-secondary-400">
                        Track your applications and connect with employers to land your dream job.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100 mb-8 text-center">
                  For Employers
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-success-600 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                      1
                    </div>
                    <div>
                      <h4 className="font-semibold text-secondary-900 dark:text-secondary-100 mb-2">
                        Post Your Job
                      </h4>
                      <p className="text-secondary-600 dark:text-secondary-400">
                        Create detailed job listings that attract the right candidates to your company.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-success-600 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold text-secondary-900 dark:text-secondary-100 mb-2">
                        Review Applications
                      </h4>
                      <p className="text-secondary-600 dark:text-secondary-400">
                        Efficiently review and manage applications from qualified candidates.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-success-600 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                      3
                    </div>
                    <div>
                      <h4 className="font-semibold text-secondary-900 dark:text-secondary-100 mb-2">
                        Hire the Best
                      </h4>
                      <p className="text-secondary-600 dark:text-secondary-400">
                        Connect with top talent and build your dream team with the right people.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-primary-600 dark:bg-primary-700">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who have found success with Employrix. 
              Your next opportunity is just a click away.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {!user ? (
                <>
                  <Button variant="secondary" size="lg" asChild>
                    <Link href={ROUTES.REGISTER}>
                      Sign Up Now
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary-600" asChild>
                    <Link href={ROUTES.LOGIN}>
                      Sign In
                    </Link>
                  </Button>
                </>
              ) : (
                <Button variant="secondary" size="lg" asChild>
                  <Link href={user.role === 'job-seeker' ? ROUTES.DASHBOARD_JOB_SEEKER : ROUTES.DASHBOARD_EMPLOYER}>
                    Go to Dashboard
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
