'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Container } from '@/components/ui/Container';
import { 
  User, 
  Lock, 
  Bell, 
  Shield, 
  Eye, 
  Smartphone,
  Trash2,
  Settings as SettingsIcon
} from 'lucide-react';

interface SettingsLayoutProps {
  children: React.ReactNode;
}

const settingsNavigation = [
  {
    name: 'General',
    href: '/settings',
    icon: User,
    description: 'Update your personal information and email'
  },
  {
    name: 'Password & Security',
    href: '/settings/security',
    icon: Lock,
    description: 'Change password and security settings'
  },
  {
    name: 'Notifications',
    href: '/settings/notifications',
    icon: Bell,
    description: 'Manage your notification preferences'
  },
  {
    name: 'Privacy',
    href: '/settings/privacy',
    icon: Eye,
    description: 'Control your profile visibility and privacy'
  },
  {
    name: 'Sessions',
    href: '/settings/sessions',
    icon: Smartphone,
    description: 'Manage your active sessions and devices'
  },
  {
    name: 'Advanced',
    href: '/settings/advanced',
    icon: Shield,
    description: 'Advanced security and account options'
  },
];

export function SettingsLayout({ children }: SettingsLayoutProps) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900">
      <Container className="py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-secondary-900 dark:text-secondary-100 mb-2">
            Account Settings
          </h1>
          <p className="text-secondary-600 dark:text-secondary-400">
            Manage your account preferences and security settings
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <nav className="space-y-2">
              {settingsNavigation.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      'flex items-start space-x-3 px-4 py-3 rounded-lg transition-colors',
                      isActive
                        ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300'
                        : 'text-secondary-700 hover:bg-secondary-100 dark:text-secondary-300 dark:hover:bg-secondary-800'
                    )}
                  >
                    <Icon className={cn(
                      'h-5 w-5 mt-0.5 flex-shrink-0',
                      isActive 
                        ? 'text-primary-600 dark:text-primary-400' 
                        : 'text-secondary-500 dark:text-secondary-400'
                    )} />
                    <div className="flex-1 min-w-0">
                      <div className={cn(
                        'text-sm font-medium',
                        isActive 
                          ? 'text-primary-700 dark:text-primary-300' 
                          : 'text-secondary-900 dark:text-secondary-100'
                      )}>
                        {item.name}
                      </div>
                      <div className="text-xs text-secondary-600 dark:text-secondary-400 mt-1">
                        {item.description}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-secondary-800 rounded-lg border border-secondary-200 dark:border-secondary-700">
              {children}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}