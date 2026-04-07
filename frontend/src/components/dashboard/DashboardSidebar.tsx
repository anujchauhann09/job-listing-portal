'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { User } from '@/types/auth';
import { ROUTES } from '@/lib/constants';
import { useScreenReader } from '@/hooks/useAccessibility';
import {
  LayoutDashboard, User as UserIcon, Briefcase, FileText,
  Settings, Search, PlusCircle, Users, X,
} from 'lucide-react';

interface DashboardSidebarProps {
  user: User;
  isOpen: boolean;
  onToggle: () => void;
}

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  roles?: ('job-seeker' | 'employer')[];
}

const navigationItems: NavItem[] = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Profile', href: ROUTES.PROFILE, icon: UserIcon },
  { name: 'Find Jobs', href: ROUTES.JOBS, icon: Search, roles: ['job-seeker'] },
  { name: 'My Applications', href: '/dashboard/applications', icon: FileText, roles: ['job-seeker'] },
  { name: 'Post Job', href: '/dashboard/employer/jobs/new', icon: PlusCircle, roles: ['employer'] },
  { name: 'My Jobs', href: '/dashboard/jobs', icon: Briefcase, roles: ['employer'] },
  { name: 'Applications', href: '/dashboard/applications', icon: Users, roles: ['employer'] },
  { name: 'Settings', href: ROUTES.SETTINGS, icon: Settings },
];

export function DashboardSidebar({ user, isOpen, onToggle }: DashboardSidebarProps) {
  const pathname = usePathname() || '/';
  const { announce } = useScreenReader();

  const getDashboardPath = () =>
    user.role === 'job-seeker' ? ROUTES.DASHBOARD_JOB_SEEKER : ROUTES.DASHBOARD_EMPLOYER;

  const filteredItems = navigationItems
    .filter(item => !item.roles || item.roles.includes(user.role))
    .map(item => item.href === '/dashboard' ? { ...item, href: getDashboardPath() } : item);

  const getUserDisplayName = () => {
    if (user.role === 'job-seeker' && 'firstName' in user.profile) {
      const { firstName, lastName } = user.profile;
      return firstName && lastName ? `${firstName} ${lastName}` : firstName || user.email;
    }
    if (user.role === 'employer' && 'companyName' in user.profile) {
      return (user.profile as any).companyName || user.email;
    }
    return user.email;
  };

  const isActive = (href: string) =>
    pathname === href || (href === getDashboardPath() && pathname.startsWith('/dashboard') && pathname !== '/dashboard/applications' && pathname !== '/dashboard/jobs');

  const handleNavClick = (name: string) => {
    announce(`Navigating to ${name}`);
    if (typeof window !== 'undefined' && window.innerWidth < 1024 && isOpen) onToggle();
  };

  return (
    <>
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-60 flex flex-col bg-white dark:bg-[#0F172A] border-r border-[#E2E8F0] dark:border-[#1F2937]',
          'transform transition-transform duration-200 ease-in-out will-change-transform lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
        role="navigation"
        aria-label="Dashboard navigation"
      >
        {/* User info */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-[#F1F5F9] dark:border-[#1F2937]">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 rounded-full bg-[#2563EB] flex items-center justify-center shrink-0">
              <UserIcon className="w-4 h-4 text-white" aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-[#0F172A] dark:text-[#E5E7EB] truncate leading-tight">
                {getUserDisplayName()}
              </p>
              <p className="text-xs text-[#64748B] dark:text-[#9CA3AF] leading-tight mt-0.5">
                {user.role === 'job-seeker' ? 'Job Seeker' : 'Employer'}
              </p>
            </div>
          </div>
          <button
            onClick={onToggle}
            className="lg:hidden p-1.5 rounded-md text-[#94A3B8] hover:text-[#64748B] hover:bg-[#F1F5F9] dark:hover:bg-[#1F2937] focus:outline-none focus:ring-2 focus:ring-primary-500"
            aria-label="Close sidebar"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        <nav className="flex-1 px-3 py-3 space-y-0.5 overflow-y-auto" aria-label="Main navigation">
          {filteredItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1',
                  active
                    ? 'bg-[#EFF6FF] text-[#2563EB] dark:bg-[#1E3A8A]/20 dark:text-[#60A5FA]'
                    : 'text-[#475569] hover:text-[#0F172A] hover:bg-[#F8FAFC] dark:text-[#9CA3AF] dark:hover:text-[#E5E7EB] dark:hover:bg-[#1F2937]'
                )}
                onClick={() => handleNavClick(item.name)}
                aria-current={active ? 'page' : undefined}
              >
                <item.icon
                  className={cn('h-4 w-4 shrink-0', active ? 'text-[#2563EB] dark:text-[#60A5FA]' : 'text-[#94A3B8] dark:text-[#6B7280]')}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="px-4 py-3 border-t border-[#F1F5F9] dark:border-[#1F2937]">
          <p className="text-xs text-[#CBD5E1] dark:text-[#374151] text-center">Employrix</p>
        </div>
      </aside>
    </>
  );
}
