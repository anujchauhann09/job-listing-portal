'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { Menu, X, User, LogOut, Settings, Briefcase } from 'lucide-react';
import { APP_NAME, ROUTES } from '@/lib/constants';
import { useKeyboardNavigation, useScreenReader } from '@/hooks/useAccessibility';
import { KeyboardNavigable, NavigableItem } from '@/components/ui/KeyboardNavigable';

interface HeaderProps {
  user?: {
    id: string;
    email: string;
    role: 'job-seeker' | 'employer';
    profile: {
      firstName?: string;
      lastName?: string;
      companyName?: string;
    };
  } | null;
  onLogout?: () => void;
  className?: string;
}

export function Header({ user, onLogout, className }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = React.useState(false);
  const router = useRouter();
  const { announce } = useScreenReader();
  const mobileMenuRef = React.useRef<HTMLDivElement>(null);
  const userMenuRef = React.useRef<HTMLDivElement>(null);

  const toggleMobileMenu = () => {
    const newState = !isMobileMenuOpen;
    setIsMobileMenuOpen(newState);
    announce(newState ? 'Mobile menu opened' : 'Mobile menu closed');
  };

  const toggleUserMenu = () => {
    const newState = !isUserMenuOpen;
    setIsUserMenuOpen(newState);
    announce(newState ? 'User menu opened' : 'User menu closed');
  };

  const handleNavigation = (path: string) => {
    router.push(path);
    setIsMobileMenuOpen(false);
    setIsUserMenuOpen(false);
  };

  const getUserDisplayName = () => {
    if (!user) return '';
    
    if (user.role === 'job-seeker') {
      const jobSeekerProfile = user.profile as any;
      if (jobSeekerProfile.firstName && jobSeekerProfile.firstName.trim()) {
        return jobSeekerProfile.firstName;
      }
    }
    
    if (user.role === 'employer') {
      const employerProfile = user.profile as any;
      if (employerProfile.companyName && employerProfile.companyName.trim()) {
        return employerProfile.companyName;
      }
    }
    
    return user.email;
  };

  const getDashboardPath = () => {
    if (!user) return ROUTES.LOGIN;
    return user.role === 'job-seeker' ? ROUTES.DASHBOARD_JOB_SEEKER : ROUTES.DASHBOARD_EMPLOYER;
  };

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };

    if (isMobileMenuOpen || isUserMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isMobileMenuOpen, isUserMenuOpen]);

  React.useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (isMobileMenuOpen) {
          setIsMobileMenuOpen(false);
          announce('Mobile menu closed');
        }
        if (isUserMenuOpen) {
          setIsUserMenuOpen(false);
          announce('User menu closed');
        }
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMobileMenuOpen, isUserMenuOpen, announce]);

  const userMenuItems = user ? [
    {
      label: 'Dashboard',
      value: 'dashboard',
      onClick: () => handleNavigation(getDashboardPath()),
      icon: Briefcase,
    },
    {
      label: 'Profile',
      value: 'profile',
      onClick: () => handleNavigation(ROUTES.PROFILE),
      icon: User,
    },
    {
      label: 'Settings',
      value: 'settings',
      onClick: () => handleNavigation(ROUTES.SETTINGS),
      icon: Settings,
    },
    {
      label: 'Sign out',
      value: 'logout',
      onClick: onLogout,
      icon: LogOut,
    },
  ] : [];

  return (
    <header 
      className={cn(
        'sticky top-0 z-50 w-full border-b border-secondary-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-secondary-800 dark:bg-secondary-900/95 dark:supports-[backdrop-filter]:bg-secondary-900/60',
        className
      )}
      role="banner"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 sm:h-16 items-center justify-between">
          <div className="flex items-center">
            <Link 
              href={ROUTES.HOME}
              className="flex items-center space-x-2 text-lg sm:text-xl font-bold text-primary-600 hover:text-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-lg"
              aria-label={`${APP_NAME} - Go to homepage`}
            >
              <Briefcase className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
              <span className="hidden xs:inline">{APP_NAME}</span>
            </Link>
          </div>

          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8" role="navigation" aria-label="Main navigation">
            <Link
              href={ROUTES.JOBS}
              className="text-secondary-700 hover:text-primary-600 font-medium transition-colors dark:text-secondary-300 dark:hover:text-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-lg px-2 py-1"
            >
              Find Jobs
            </Link>
            {user?.role === 'employer' && (
              <>
                <Link
                  href="/jobs/post"
                  className="text-secondary-700 hover:text-primary-600 font-medium transition-colors dark:text-secondary-300 dark:hover:text-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-lg px-2 py-1"
                >
                  Post Job
                </Link>
                <Link
                  href={ROUTES.HIRING_SOLUTIONS}
                  className="text-secondary-700 hover:text-primary-600 font-medium transition-colors dark:text-secondary-300 dark:hover:text-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-lg px-2 py-1"
                >
                  Hiring Solutions
                </Link>
              </>
            )}
            <Link
              href={ROUTES.ABOUT}
              className="text-secondary-700 hover:text-primary-600 font-medium transition-colors dark:text-secondary-300 dark:hover:text-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-lg px-2 py-1"
            >
              About
            </Link>
          </nav>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <ThemeToggle variant="compact" />

            {user ? (
              <div className="relative" ref={userMenuRef}>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleUserMenu}
                  className="flex items-center space-x-2 h-9"
                  aria-expanded={isUserMenuOpen}
                  aria-haspopup="menu"
                  aria-label={`User menu for ${getUserDisplayName()}`}
                >
                  <User className="h-4 w-4" aria-hidden="true" />
                  <span className="hidden sm:inline-block max-w-32 truncate">
                    {getUserDisplayName()}
                  </span>
                </Button>

                {isUserMenuOpen && (
                  <div 
                    className="absolute right-0 mt-2 w-48 rounded-lg border border-secondary-200 bg-white shadow-medium dark:border-secondary-800 dark:bg-secondary-900"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                  >
                    <div className="py-1">
                      {userMenuItems.map((item, index) => {
                        const Icon = item.icon;
                        const isLogout = item.value === 'logout';
                        return (
                          <button
                            key={item.value}
                            onClick={item.onClick}
                            className={cn(
                              'flex w-full items-center px-4 py-2 text-sm text-left transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-inset',
                              isLogout
                                ? 'text-error-600 hover:bg-error-50 dark:text-error-400 dark:hover:bg-error-900/20'
                                : 'text-secondary-700 hover:bg-secondary-100 dark:text-secondary-300 dark:hover:bg-secondary-800'
                            )}
                            role="menuitem"
                            tabIndex={-1}
                          >
                            <Icon className="mr-3 h-4 w-4" aria-hidden="true" />
                            {item.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden sm:flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleNavigation(ROUTES.LOGIN)}
                >
                  Sign in
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleNavigation(ROUTES.REGISTER)}
                >
                  Sign up
                </Button>
              </div>
            )}

            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMobileMenu}
              className="lg:hidden h-9 w-9 p-0"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Menu className="h-4 w-4" aria-hidden="true" />
              )}
            </Button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div 
            id="mobile-menu"
            className="lg:hidden border-t border-secondary-200 dark:border-secondary-800"
            ref={mobileMenuRef}
            role="navigation"
            aria-label="Mobile navigation"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                href={ROUTES.JOBS}
                className="block px-3 py-2 text-base font-medium text-secondary-700 hover:text-primary-600 hover:bg-secondary-100 rounded-md transition-colors dark:text-secondary-300 dark:hover:text-primary-400 dark:hover:bg-secondary-800 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-inset"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Find Jobs
              </Link>
              {user?.role === 'employer' && (
                <>
                  <Link
                    href="/jobs/post"
                    className="block px-3 py-2 text-base font-medium text-secondary-700 hover:text-primary-600 hover:bg-secondary-100 rounded-md transition-colors dark:text-secondary-300 dark:hover:text-primary-400 dark:hover:bg-secondary-800 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-inset"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Post Job
                  </Link>
                  <Link
                    href={ROUTES.HIRING_SOLUTIONS}
                    className="block px-3 py-2 text-base font-medium text-secondary-700 hover:text-primary-600 hover:bg-secondary-100 rounded-md transition-colors dark:text-secondary-300 dark:hover:text-primary-400 dark:hover:bg-secondary-800 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-inset"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Hiring Solutions
                  </Link>
                </>
              )}
              <Link
                href={ROUTES.ABOUT}
                className="block px-3 py-2 text-base font-medium text-secondary-700 hover:text-primary-600 hover:bg-secondary-100 rounded-md transition-colors dark:text-secondary-300 dark:hover:text-primary-400 dark:hover:bg-secondary-800 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-inset"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              
              {!user && (
                <div className="pt-4 border-t border-secondary-200 dark:border-secondary-800">
                  <div className="space-y-2">
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={() => handleNavigation(ROUTES.LOGIN)}
                    >
                      Sign in
                    </Button>
                    <Button
                      variant="primary"
                      className="w-full justify-start"
                      onClick={() => handleNavigation(ROUTES.REGISTER)}
                    >
                      Sign up
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}