'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Briefcase, User } from 'lucide-react';
import { APP_NAME } from '@/lib/constants';

export const dynamic = 'force-dynamic';

export default function RoleSelectionPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) router.push('/');
  }, [user, router]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0B0F19] flex flex-col items-center justify-center px-4 py-16">

      <div className="mb-10 text-center">
        <div className="inline-flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-[#2563EB] rounded-lg flex items-center justify-center">
            <Briefcase className="h-4 w-4 text-white" aria-hidden="true" />
          </div>
          <span className="text-lg font-bold text-[#0F172A] dark:text-[#E5E7EB]">{APP_NAME}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#0F172A] dark:text-[#E5E7EB]">
          Choose your role to continue
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full max-w-2xl">
        <RoleCard
          icon={User}
          badge="Job Seeker"
          title="For Candidates"
          description="Find your next opportunity, track applications, and grow your career."
          role="job-seeker"
        />
        <RoleCard
          icon={Briefcase}
          badge="Employer"
          title="For Companies"
          description="Post jobs, review applications, and hire top talent faster."
          role="employer"
        />
      </div>
    </div>
  );
}

interface RoleCardProps {
  icon: React.ElementType;
  badge: string;
  title: string;
  description: string;
  role: 'job-seeker' | 'employer';
}

function RoleCard({ icon: Icon, badge, title, description, role }: RoleCardProps) {
  return (
    <div className="flex flex-col gap-5 bg-white dark:bg-[#111827] rounded-2xl border border-[#E2E8F0] dark:border-[#1F2937] p-7">
      <div className="flex items-start justify-between">
        <div className="w-11 h-11 rounded-xl bg-[#EFF6FF] dark:bg-[#1E3A8A]/20 flex items-center justify-center">
          <Icon className="h-5 w-5 text-[#2563EB] dark:text-[#60A5FA]" aria-hidden="true" />
        </div>
        <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-[#F1F5F9] text-[#475569] dark:bg-[#1F2937] dark:text-[#9CA3AF]">
          {badge}
        </span>
      </div>

      <div className="flex-1">
        <h2 className="text-base font-semibold text-[#0F172A] dark:text-[#E5E7EB] mb-1.5">
          {title}
        </h2>
        <p className="text-sm text-[#64748B] dark:text-[#9CA3AF] leading-relaxed">
          {description}
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <Link
          href={`/auth/register?role=${role}`}
          className="flex items-center justify-center h-10 px-4 rounded-lg bg-[#2563EB] text-white text-sm font-medium hover:bg-[#1D4ED8] transition-colors"
        >
          Sign up
        </Link>
        <Link
          href={`/auth/login?role=${role}`}
          className="flex items-center justify-center h-10 px-4 rounded-lg border border-[#E2E8F0] dark:border-[#374151] text-[#374151] dark:text-[#D1D5DB] text-sm font-medium hover:bg-[#F8FAFC] dark:hover:bg-[#1F2937] transition-colors"
        >
          Sign in
        </Link>
      </div>
    </div>
  );
}
