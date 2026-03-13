'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { 
  Target, 
  Heart, 
  Users, 
  TrendingUp,
  Shield,
  Zap,
  Award,
  Globe,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import { ROUTES } from '@/lib/constants';

export default function AboutPage() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <Header user={user} onLogout={logout} />
      
      <main className="flex-1">
        <section className="relative bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900 py-20 sm:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-secondary-900 dark:text-secondary-100 mb-6">
                About <span className="text-primary-600 dark:text-primary-400">Employrix</span>
              </h1>
              <p className="text-xl text-secondary-600 dark:text-secondary-400 mb-8 max-w-3xl mx-auto">
                We're on a mission to connect talented professionals with amazing opportunities, 
                making the job search and hiring process simple, efficient, and rewarding for everyone.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white dark:bg-secondary-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <Card className="p-8 lg:p-12">
                <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mb-6">
                  <Target className="h-8 w-8 text-primary-600 dark:text-primary-400" />
                </div>
                <h2 className="text-3xl font-bold text-secondary-900 dark:text-secondary-100 mb-4">
                  Our Mission
                </h2>
                <p className="text-lg text-secondary-600 dark:text-secondary-400 leading-relaxed">
                  To empower job seekers and employers by providing a seamless, intuitive platform 
                  that bridges the gap between talent and opportunity. We believe everyone deserves 
                  to find work they love and companies deserve to find people who will help them thrive.
                </p>
              </Card>

              <Card className="p-8 lg:p-12">
                <div className="w-16 h-16 bg-success-100 dark:bg-success-900/30 rounded-full flex items-center justify-center mb-6">
                  <Heart className="h-8 w-8 text-success-600 dark:text-success-400" />
                </div>
                <h2 className="text-3xl font-bold text-secondary-900 dark:text-secondary-100 mb-4">
                  Our Vision
                </h2>
                <p className="text-lg text-secondary-600 dark:text-secondary-400 leading-relaxed">
                  To become the world's most trusted job platform where every professional can 
                  discover their dream career and every company can build exceptional teams. 
                  We envision a future where finding the right job or candidate is effortless and rewarding.
                </p>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-20 bg-secondary-50 dark:bg-secondary-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-bold text-secondary-900 dark:text-secondary-100 mb-8 text-center">
                Our Story
              </h2>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-lg text-secondary-600 dark:text-secondary-400 leading-relaxed mb-6">
                  Employrix was founded with a simple yet powerful idea: job searching and hiring 
                  shouldn't be complicated. We saw talented professionals struggling to find the 
                  right opportunities and companies spending countless hours sifting through 
                  unqualified applications.
                </p>
                <p className="text-lg text-secondary-600 dark:text-secondary-400 leading-relaxed mb-6">
                  In 2026, we set out to change that. We built a platform that uses smart technology 
                  to match the right people with the right opportunities. Our team of passionate 
                  developers, designers, and career experts worked tirelessly to create an experience 
                  that's both powerful and easy to use.
                </p>
                <p className="text-lg text-secondary-600 dark:text-secondary-400 leading-relaxed">
                  We're constantly innovating and improving to make your 
                  experience even better.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white dark:bg-secondary-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-secondary-900 dark:text-secondary-100 mb-4">
                Our Core Values
              </h2>
              <p className="text-xl text-secondary-600 dark:text-secondary-400 max-w-2xl mx-auto">
                These principles guide everything we do and shape how we serve our community.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="p-8 text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="h-8 w-8 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-xl font-semibold text-secondary-900 dark:text-secondary-100 mb-4">
                  People First
                </h3>
                <p className="text-secondary-600 dark:text-secondary-400">
                  We put people at the center of everything we do, ensuring both job seekers 
                  and employers have the best possible experience.
                </p>
              </Card>

              <Card className="p-8 text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-success-100 dark:bg-success-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shield className="h-8 w-8 text-success-600 dark:text-success-400" />
                </div>
                <h3 className="text-xl font-semibold text-secondary-900 dark:text-secondary-100 mb-4">
                  Trust & Transparency
                </h3>
                <p className="text-secondary-600 dark:text-secondary-400">
                  We build trust through honest communication, transparent processes, 
                  and protecting your privacy and data.
                </p>
              </Card>

              <Card className="p-8 text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-warning-100 dark:bg-warning-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Zap className="h-8 w-8 text-warning-600 dark:text-warning-400" />
                </div>
                <h3 className="text-xl font-semibold text-secondary-900 dark:text-secondary-100 mb-4">
                  Innovation
                </h3>
                <p className="text-secondary-600 dark:text-secondary-400">
                  We continuously innovate and improve our platform to provide cutting-edge 
                  solutions for modern job searching and hiring.
                </p>
              </Card>

              <Card className="p-8 text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-error-100 dark:bg-error-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Award className="h-8 w-8 text-error-600 dark:text-error-400" />
                </div>
                <h3 className="text-xl font-semibold text-secondary-900 dark:text-secondary-100 mb-4">
                  Excellence
                </h3>
                <p className="text-secondary-600 dark:text-secondary-400">
                  We strive for excellence in every detail, from our technology to our 
                  customer support, ensuring quality in all we deliver.
                </p>
              </Card>

              <Card className="p-8 text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-info-100 dark:bg-info-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Globe className="h-8 w-8 text-info-600 dark:text-info-400" />
                </div>
                <h3 className="text-xl font-semibold text-secondary-900 dark:text-secondary-100 mb-4">
                  Inclusivity
                </h3>
                <p className="text-secondary-600 dark:text-secondary-400">
                  We celebrate diversity and create an inclusive platform where everyone 
                  has equal access to opportunities.
                </p>
              </Card>

              <Card className="p-8 text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                  <TrendingUp className="h-8 w-8 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-xl font-semibold text-secondary-900 dark:text-secondary-100 mb-4">
                  Growth
                </h3>
                <p className="text-secondary-600 dark:text-secondary-400">
                  We're committed to helping our users grow professionally and personally, 
                  supporting their career development journey.
                </p>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-20 bg-secondary-50 dark:bg-secondary-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-secondary-900 dark:text-secondary-100 mb-4">
                What We Offer
              </h2>
              <p className="text-xl text-secondary-600 dark:text-secondary-400 max-w-2xl mx-auto">
                Comprehensive solutions for both job seekers and employers.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100 mb-8">
                  For Job Seekers
                </h3>
                <div className="space-y-4">
                  {[
                    'Smart job matching based on your skills and preferences',
                    'Easy application tracking and management',
                    'Professional profile builder with resume upload',
                    'Real-time notifications for new opportunities',
                    'Direct communication with employers',
                    'Career resources and guidance',
                  ].map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle className="h-6 w-6 text-success-600 dark:text-success-400 flex-shrink-0 mt-0.5" />
                      <p className="text-secondary-700 dark:text-secondary-300">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100 mb-8">
                  For Employers
                </h3>
                <div className="space-y-4">
                  {[
                    'Post unlimited job listings with detailed descriptions',
                    'Access to a pool of qualified candidates',
                    'Advanced filtering and search capabilities',
                    'Streamlined application review process',
                    'Applicant tracking and management tools',
                    'Company branding and profile customization',
                  ].map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle className="h-6 w-6 text-success-600 dark:text-success-400 flex-shrink-0 mt-0.5" />
                      <p className="text-secondary-700 dark:text-secondary-300">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white dark:bg-secondary-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-secondary-900 dark:text-secondary-100 mb-4">
                Our Impact
              </h2>
              <p className="text-xl text-secondary-600 dark:text-secondary-400">
                Numbers that showcase our growing community and success.
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl sm:text-5xl font-bold text-primary-600 dark:text-primary-400 mb-2">1+</div>
                <div className="text-secondary-600 dark:text-secondary-400 font-medium">Active Job Listings</div>
              </div>
              <div className="text-center">
                <div className="text-4xl sm:text-5xl font-bold text-primary-600 dark:text-primary-400 mb-2">1+</div>
                <div className="text-secondary-600 dark:text-secondary-400 font-medium">Registered Job Seekers</div>
              </div>
              <div className="text-center">
                <div className="text-4xl sm:text-5xl font-bold text-primary-600 dark:text-primary-400 mb-2">1+</div>
                <div className="text-secondary-600 dark:text-secondary-400 font-medium">Partner Companies</div>
              </div>
              <div className="text-center">
                <div className="text-4xl sm:text-5xl font-bold text-primary-600 dark:text-primary-400 mb-2">95%</div>
                <div className="text-secondary-600 dark:text-secondary-400 font-medium">Success Rate</div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-primary-600 dark:bg-primary-700">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Join Our Growing Community
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Whether you're looking for your next career move or searching for top talent, 
              Employrix is here to help you succeed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {!user ? (
                <>
                  <Button variant="secondary" size="lg" asChild>
                    <Link href={ROUTES.REGISTER}>
                      Get Started Today
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="border-white text-white hover:bg-white hover:text-primary-600" 
                    asChild
                  >
                    <Link href={ROUTES.JOBS}>
                      Browse Jobs
                    </Link>
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="secondary" size="lg" asChild>
                    <Link href={user.role === 'job-seeker' ? ROUTES.DASHBOARD_JOB_SEEKER : ROUTES.DASHBOARD_EMPLOYER}>
                      Go to Dashboard
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="border-white text-white hover:bg-white hover:text-primary-600" 
                    asChild
                  >
                    <Link href={ROUTES.JOBS}>
                      Explore Opportunities
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
