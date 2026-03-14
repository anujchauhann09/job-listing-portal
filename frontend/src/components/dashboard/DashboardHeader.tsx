'use client';

import React from 'react';
import { User } from '@/types/auth';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import {
  Bell,
  Search,
  Plus,
  Menu,
  MessageSquare,
  Calendar,
} from 'lucide-react';

interface DashboardHeaderProps {
  user: User;
  title: string;
  subtitle?: string;
  onMenuToggle?: () => void;
  className?: string;
}

export function DashboardHeader({ 
  user, 
  title, 
  subtitle, 
  onMenuToggle,
  className 
}: DashboardHeaderProps) {
  const [notificationCount] = React.useState(3); 

  const getQuickActions = () => {
    if (user.role === 'job-seeker') {
      return [
        {
          label: 'Search Jobs',
          icon: Search,
          href: '/jobs',
          variant: 'outline' as const,
        },
        {
          label: 'Update Profile',
          icon: Plus,
          href: '/profile',
          variant: 'primary' as const,
        },
      ];
    } else {
      return [
        {
          label: 'Post Job',
          icon: Plus,
          href: '/dashboard/employer/jobs/new',
          variant: 'primary' as const,
        },
        {
          label: 'View Applications',
          icon: MessageSquare,
          href: '/dashboard/applications',
          variant: 'outline' as const,
        },
      ];
    }
  };

  const quickActions = getQuickActions();

  return (
    <div className={cn(
      'bg-white dark:bg-secondary-800 border-b border-secondary-200 dark:border-secondary-700',
      className
    )}>
      <div className="px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onMenuToggle}
              className="lg:hidden p-2"
              aria-label="Toggle sidebar"
            >
              <Menu className="h-5 w-5" />
            </Button>

            <div>
              <h1 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100">
                {title}
              </h1>
              {subtitle && (
                <p className="text-sm text-secondary-600 dark:text-secondary-400 mt-1">
                  {subtitle}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="hidden sm:flex items-center space-x-2">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant={action.variant}
                  size="sm"
                  className="flex items-center space-x-2"
                  onClick={() => window.location.href = action.href}
                >
                  <action.icon className="h-4 w-4" />
                  <span className="hidden md:inline">{action.label}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="sm:hidden mt-4 flex space-x-2">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              variant={action.variant}
              size="sm"
              className="flex items-center space-x-2 flex-1"
              onClick={() => window.location.href = action.href}
            >
              <action.icon className="h-4 w-4" />
              <span>{action.label}</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}