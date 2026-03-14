'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { 
  Home, 
  Search, 
  Briefcase, 
  User, 
  Settings, 
  FileText, 
  Users, 
  BarChart3,
  PlusCircle,
  Heart,
  Bell
} from 'lucide-react';

interface NavigationItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
  description?: string;
}

interface NavigationProps {
  userRole?: 'job-seeker' | 'employer';
  className?: string;
  orientation?: 'horizontal' | 'vertical';
  variant?: 'sidebar' | 'tabs' | 'breadcrumb';
}

export function Navigation({ 
  userRole, 
  className, 
  orientation = 'vertical',
  variant = 'sidebar' 
}: NavigationProps) {
  const pathname = usePathname();

  const jobSeekerNavigation: NavigationItem[] = [
    {
      name: 'Dashboard',
      href: '/dashboard/job-seeker',
      icon: Home,
      description: 'Overview of your job search'
    },
    {
      name: 'Find Jobs',
      href: '/jobs',
      icon: Search,
      description: 'Browse and search job opportunities'
    },
    {
      name: 'Applications',
      href: '/applications',
      icon: FileText,
      badge: 3,
      description: 'Track your job applications'
    },
    {
      name: 'Saved Jobs',
      href: '/saved-jobs',
      icon: Heart,
      badge: 5,
      description: 'Jobs you\'ve bookmarked'
    },
    {
      name: 'Profile',
      href: '/profile',
      icon: User,
      description: 'Manage your professional profile'
    },
    {
      name: 'Notifications',
      href: '/notifications',
      icon: Bell,
      badge: 2,
      description: 'Job alerts and updates'
    },
    {
      name: 'Settings',
      href: '/settings',
      icon: Settings,
      description: 'Account and privacy settings'
    }
  ];

  const employerNavigation: NavigationItem[] = [
    {
      name: 'Dashboard',
      href: '/dashboard/employer',
      icon: Home,
      description: 'Overview of your hiring activity'
    },
    {
      name: 'Job Listings',
      href: '/jobs/manage',
      icon: Briefcase,
      description: 'Manage your job postings'
    },
    {
      name: 'Post New Job',
      href: '/dashboard/employer/jobs/new',
      icon: PlusCircle,
      description: 'Create a new job listing'
    },
    {
      name: 'Applications',
      href: '/applications/received',
      icon: FileText,
      badge: 12,
      description: 'Review candidate applications'
    },
    {
      name: 'Candidates',
      href: '/candidates',
      icon: Users,
      description: 'Search and manage candidates'
    },
    {
      name: 'Analytics',
      href: '/analytics',
      icon: BarChart3,
      description: 'Hiring metrics and insights'
    },
    {
      name: 'Company Profile',
      href: '/profile',
      icon: User,
      description: 'Manage your company profile'
    },
    {
      name: 'Settings',
      href: '/settings',
      icon: Settings,
      description: 'Account and company settings'
    }
  ];

  const publicNavigation: NavigationItem[] = [
    {
      name: 'Home',
      href: '/',
      icon: Home,
      description: 'Return to homepage'
    },
    {
      name: 'Find Jobs',
      href: '/jobs',
      icon: Search,
      description: 'Browse job opportunities'
    },
    {
      name: 'About',
      href: '/about',
      icon: FileText,
      description: 'Learn about our platform'
    }
  ];

  const getNavigationItems = (): NavigationItem[] => {
    if (userRole === 'job-seeker') return jobSeekerNavigation;
    if (userRole === 'employer') return employerNavigation;
    return publicNavigation;
  };

  const isActive = (href: string): boolean => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  const navigationItems = getNavigationItems();

  if (variant === 'breadcrumb') {
    const currentItem = navigationItems.find(item => isActive(item.href));
    
    return (
      <nav className={cn('flex items-center space-x-2 text-sm', className)} aria-label="Breadcrumb">
        <Link
          href="/"
          className="text-secondary-500 hover:text-secondary-700 dark:text-secondary-400 dark:hover:text-secondary-200"
        >
          Home
        </Link>
        {currentItem && (
          <>
            <span className="text-secondary-400 dark:text-secondary-600">/</span>
            <span className="text-secondary-900 font-medium dark:text-secondary-100">
              {currentItem.name}
            </span>
          </>
        )}
      </nav>
    );
  }

  if (variant === 'tabs') {
    return (
      <nav className={cn(
        'flex space-x-8 border-b border-secondary-200 dark:border-secondary-800',
        orientation === 'vertical' && 'flex-col space-x-0 space-y-1 border-b-0 border-r',
        className
      )}>
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center px-1 py-4 text-sm font-medium border-b-2 transition-colors',
                active
                  ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'border-transparent text-secondary-500 hover:text-secondary-700 hover:border-secondary-300 dark:text-secondary-400 dark:hover:text-secondary-200',
                orientation === 'vertical' && 'border-b-0 border-r-2 py-2 px-3'
              )}
            >
              <Icon className="mr-2 h-4 w-4" />
              {item.name}
              {item.badge && (
                <span className="ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-primary-600 rounded-full">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
    );
  }

  return (
    <nav className={cn('space-y-1', className)} aria-label="Main navigation">
      {navigationItems.map((item) => {
        const Icon = item.icon;
        const active = isActive(item.href);
        
        return (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              'group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors',
              active
                ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400'
                : 'text-secondary-700 hover:text-secondary-900 hover:bg-secondary-100 dark:text-secondary-300 dark:hover:text-secondary-100 dark:hover:bg-secondary-800'
            )}
            title={item.description}
          >
            <Icon className={cn(
              'mr-3 h-5 w-5 flex-shrink-0',
              active
                ? 'text-primary-600 dark:text-primary-400'
                : 'text-secondary-500 group-hover:text-secondary-700 dark:text-secondary-400 dark:group-hover:text-secondary-200'
            )} />
            <span className="flex-1">{item.name}</span>
            {item.badge && (
              <span className={cn(
                'ml-3 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none rounded-full',
                active
                  ? 'bg-primary-200 text-primary-800 dark:bg-primary-800 dark:text-primary-200'
                  : 'bg-secondary-200 text-secondary-800 dark:bg-secondary-700 dark:text-secondary-200'
              )}>
                {item.badge}
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}

interface SidebarProps {
  userRole?: 'job-seeker' | 'employer';
  className?: string;
  children?: React.ReactNode;
}

export function Sidebar({ userRole, className, children }: SidebarProps) {
  return (
    <div className={cn(
      'flex flex-col w-64 bg-white border-r border-secondary-200 dark:bg-secondary-900 dark:border-secondary-800',
      className
    )}>
      <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
        <div className="flex-1 px-3 space-y-1">
          <Navigation userRole={userRole} />
        </div>
        {children}
      </div>
    </div>
  );
}