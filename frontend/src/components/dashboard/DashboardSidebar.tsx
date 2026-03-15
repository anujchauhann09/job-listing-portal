'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { User } from '@/types/auth';
import { ROUTES } from '@/lib/constants';
import { useScreenReader } from '@/hooks/useAccessibility';
import {
  LayoutDashboard,
  User as UserIcon,
  Briefcase,
  FileText,
  Settings,
  Search,
  PlusCircle,
  Users,
  X,
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
  description?: string;
}

const navigationItems: NavItem[] = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    description: 'Overview and main dashboard',
  },
  {
    name: 'Profile',
    href: ROUTES.PROFILE,
    icon: UserIcon,
    description: 'Manage your profile information',
  },
  {
    name: 'Find Jobs',
    href: ROUTES.JOBS,
    icon: Search,
    roles: ['job-seeker'],
    description: 'Search and browse job opportunities',
  },
  {
    name: 'My Applications',
    href: '/dashboard/applications',
    icon: FileText,
    roles: ['job-seeker'],
    description: 'Track your job applications',
  },
  {
    name: 'Post Job',
    href: '/dashboard/employer/jobs/new',
    icon: PlusCircle,
    roles: ['employer'],
    description: 'Create a new job posting',
  },
  {
    name: 'My Jobs',
    href: '/dashboard/jobs',
    icon: Briefcase,
    roles: ['employer'],
    description: 'Manage your job listings',
  },
  {
    name: 'Applications',
    href: '/dashboard/applications',
    icon: Users,
    roles: ['employer'],
    description: 'Review candidate applications',
  },
  {
    name: 'Settings',
    href: ROUTES.SETTINGS,
    icon: Settings,
    description: 'Account and application settings',
  },
];

export function DashboardSidebar({ user, isOpen, onToggle }: DashboardSidebarProps) {
  const pathname = usePathname() || '/';
  const { announce } = useScreenReader();
  const sidebarRef = React.useRef<HTMLDivElement>(null);

  const filteredNavItems = navigationItems.filter(item => 
    !item.roles || item.roles.includes(user.role)
  );

  const getDashboardPath = () => {
    return user.role === 'job-seeker' ? ROUTES.DASHBOARD_JOB_SEEKER : ROUTES.DASHBOARD_EMPLOYER;
  };

  const navItems = filteredNavItems.map(item => 
    item.href === '/dashboard' 
      ? { ...item, href: getDashboardPath() }
      : item
  );

  const getUserDisplayName = () => {
    if (user.role === 'job-seeker' && 'firstName' in user.profile) {
      const { firstName, lastName } = user.profile;
      return firstName && lastName ? `${firstName} ${lastName}` : user.email;
    } else if (user.role === 'employer' && 'companyName' in user.profile) {
      return user.profile.companyName || user.email;
    }
    return user.email;
  };

  const getUserRole = () => {
    return user.role === 'job-seeker' ? 'Job Seeker' : 'Employer';
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape' && isOpen) {
      onToggle();
      announce('Sidebar closed');
    }
  };

  const handleNavClick = (itemName: string) => {
    announce(`Navigating to ${itemName}`);
    if (window.innerWidth < 1024 && isOpen) {
      onToggle();
    }
  };

  return (
    <>
      <aside
        ref={sidebarRef}
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-secondary-800 border-r border-secondary-200 dark:border-secondary-700 transform transition-transform duration-300 ease-in-out will-change-transform lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
        role="navigation"
        aria-label="Dashboard navigation"
        onKeyDown={handleKeyDown}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-secondary-200 dark:border-secondary-700">
            <div className="flex items-center space-x-3">
              <div 
                className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center"
                role="img"
                aria-label={`${getUserRole()} avatar`}
              >
                <UserIcon className="w-4 h-4 text-white" aria-hidden="true" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-secondary-900 dark:text-secondary-100 truncate">
                  {getUserDisplayName()}
                </p>
                <p className="text-xs text-secondary-500 dark:text-secondary-400">
                  {getUserRole()}
                </p>
              </div>
            </div>
            <button
              onClick={onToggle}
              className="lg:hidden p-2 rounded-md text-secondary-400 hover:text-secondary-500 hover:bg-secondary-100 dark:hover:bg-secondary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>

          <nav 
            className="flex-1 px-4 py-4 space-y-1 overflow-y-auto"
            role="navigation"
            aria-label="Main navigation"
          >
            {navItems.map((item) => {
              const isActive = pathname === item.href || 
                (item.href === getDashboardPath() && pathname.startsWith('/dashboard'));
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors group focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-secondary-800',
                    isActive
                      ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400'
                      : 'text-secondary-700 hover:text-secondary-900 hover:bg-secondary-100 dark:text-secondary-300 dark:hover:text-secondary-100 dark:hover:bg-secondary-700'
                  )}
                  onClick={() => handleNavClick(item.name)}
                  aria-current={isActive ? 'page' : undefined}
                  title={item.description}
                >
                  <item.icon 
                    className="mr-3 h-5 w-5 flex-shrink-0" 
                    aria-hidden="true"
                  />
                  <span>{item.name}</span>
                  {isActive && (
                    <span className="sr-only">(current page)</span>
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-secondary-200 dark:border-secondary-700">
            <div className="text-xs text-secondary-500 dark:text-secondary-400 text-center">
              Employrix Dashboard
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}