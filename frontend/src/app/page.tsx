'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Search, Users, Zap, Shield, CheckCircle, Briefcase } from 'lucide-react';
import { ROUTES } from '@/lib/constants';

export const dynamic = 'force-dynamic';

const features = [
  {
    icon: Search,
    title: 'Smart Job Search',
    desc: 'Filter by type, location, salary, and experience level to find exactly what you need.',
    color: 'bg-[#EFF6FF] text-[#2563EB]',
  },
  {
    icon: Users,
    title: 'Quality Candidates',
    desc: 'Employers connect with skilled professionals who match their requirements.',
    color: 'bg-[#F0FDF4] text-[#16A34A]',
  },
  {
    icon: Zap,
    title: 'Fast & Simple',
    desc: 'Apply in seconds with your profile. Track every application in one place.',
    color: 'bg-[#FFFBEB] text-[#D97706]',
  },
  {
    icon: Shield,
    title: 'Trusted Platform',
    desc: 'Verified employers and secure data handling you can rely on.',
    color: 'bg-[#F5F3FF] text-[#7C3AED]',
  },
];

const steps = {
  seeker: [
    { n: '1', title: 'Create Your Profile', desc: 'Sign up and add your skills, experience, and resume.' },
    { n: '2', title: 'Search & Apply', desc: 'Browse jobs and apply with a single click.' },
    { n: '3', title: 'Track & Get Hired', desc: 'Monitor your applications and land your next role.' },
  ],
  employer: [
    { n: '1', title: 'Post a Job', desc: 'Create a detailed listing to attract the right candidates.' },
    { n: '2', title: 'Review Applications', desc: 'Manage and shortlist applicants efficiently.' },
    { n: '3', title: 'Hire the Best', desc: 'Connect with top talent and grow your team.' },
  ],
};

export default function Home() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] dark:bg-[#0B0F19]">
      <Header user={user} onLogout={logout} />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative py-20 sm:py-28 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#EFF6FF] via-[#F8FAFC] to-[#F8FAFC] dark:from-[#0F172A] dark:via-[#0B0F19] dark:to-[#0B0F19] pointer-events-none" />
          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EFF6FF] dark:bg-[#1E3A8A]/20 border border-[#BFDBFE] dark:border-[#1E3A8A] text-xs font-medium text-[#2563EB] dark:text-[#93C5FD] mb-6">
              <Briefcase className="h-3.5 w-3.5" aria-hidden="true" />
              Your career starts here
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold tracking-tight text-[#0F172A] dark:text-[#E5E7EB] leading-tight mb-5">
              Find Your Next Job or{' '}
              <span className="text-[#2563EB] dark:text-[#60A5FA]">Perfect Hire</span>
            </h1>
            <p className="text-lg text-[#64748B] dark:text-[#9CA3AF] max-w-2xl mx-auto mb-8 leading-relaxed">
              Employrix connects talented professionals with great companies.
              Simple, fast, and built for real results.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              {!user ? (
                <>
                  <Button size="lg" asChild>
                    <Link href={ROUTES.REGISTER}>
                      Get Started <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link href={ROUTES.JOBS}>Browse Jobs</Link>
                  </Button>
                </>
              ) : (
                <>
                  <Button size="lg" asChild>
                    <Link href={user.role === 'job-seeker' ? ROUTES.DASHBOARD_JOB_SEEKER : ROUTES.DASHBOARD_EMPLOYER}>
                      Go to Dashboard <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link href={ROUTES.JOBS}>{user.role === 'job-seeker' ? 'Find Jobs' : 'View Jobs'}</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-10 border-y border-[#E2E8F0] dark:border-[#1F2937] bg-white dark:bg-[#0F172A]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
              {[
                { value: '1+', label: 'Active Jobs' },
                { value: '1+', label: 'Job Seekers' },
                { value: '1+', label: 'Companies' },
                { value: '95%', label: 'Success Rate' },
              ].map(stat => (
                <div key={stat.label}>
                  <div className="text-3xl font-bold text-[#2563EB] dark:text-[#60A5FA]">{stat.value}</div>
                  <div className="text-sm text-[#64748B] dark:text-[#9CA3AF] mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-[#F8FAFC] dark:bg-[#0B0F19]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A] dark:text-[#E5E7EB] mb-3">
                Why Employrix?
              </h2>
              <p className="text-[#64748B] dark:text-[#9CA3AF] max-w-xl mx-auto">
                Everything you need to find a job or hire great talent — nothing you don't.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {features.map(f => (
                <div key={f.title} className="bg-white dark:bg-[#111827] rounded-xl border border-[#E2E8F0] dark:border-[#1F2937] p-5 hover:shadow-card transition-shadow">
                  <div className={`w-10 h-10 rounded-lg ${f.color} flex items-center justify-center mb-4`}>
                    <f.icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="text-sm font-semibold text-[#0F172A] dark:text-[#E5E7EB] mb-1.5">{f.title}</h3>
                  <p className="text-sm text-[#64748B] dark:text-[#9CA3AF] leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-white dark:bg-[#0F172A]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A] dark:text-[#E5E7EB] mb-3">How It Works</h2>
              <p className="text-[#64748B] dark:text-[#9CA3AF]">Get started in three simple steps</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {(['seeker', 'employer'] as const).map(type => (
                <div key={type}>
                  <h3 className="text-base font-semibold text-[#0F172A] dark:text-[#E5E7EB] mb-5 flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${type === 'seeker' ? 'bg-[#2563EB]' : 'bg-[#16A34A]'}`} />
                    {type === 'seeker' ? 'For Job Seekers' : 'For Employers'}
                  </h3>
                  <div className="space-y-4">
                    {steps[type].map(step => (
                      <div key={step.n} className="flex items-start gap-4">
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0 ${type === 'seeker' ? 'bg-[#2563EB]' : 'bg-[#16A34A]'}`}>
                          {step.n}
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-[#0F172A] dark:text-[#E5E7EB]">{step.title}</h4>
                          <p className="text-sm text-[#64748B] dark:text-[#9CA3AF] mt-0.5">{step.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-[#2563EB] dark:bg-[#1D4ED8]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">Ready to get started?</h2>
            <p className="text-[#BFDBFE] mb-7 max-w-xl mx-auto">
              Join professionals who have found success with Employrix. Your next opportunity is one click away.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              {!user ? (
                <>
                  <Button variant="secondary" size="lg" asChild>
                    <Link href={ROUTES.REGISTER}>Sign Up Free</Link>
                  </Button>
                  <Button size="lg" className="bg-white/10 text-white border border-white/30 hover:bg-white/20" asChild>
                    <Link href={ROUTES.LOGIN}>Sign In</Link>
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
