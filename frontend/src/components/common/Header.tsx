'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { Menu, X, User, LogOut, Settings, Briefcase, ChevronDown } from 'lucide-react';
import { APP_NAME, ROUTES } from '@/lib/constants';
import { useScreenReader } from '@/hooks/useAccessibility';

interface HeaderProps {
  user?: {
    id: string;
    email: string;
    role: 'job-seeker' | 'employer';
    profile: { firstName?: string; lastName?: string; companyName?: string };
  } | null;
  onLogout?: () => void;
  className?: string;
}

export function Header({ user, onLogout, className }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = React.useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { announce } = useScreenReader();
  const mobileMenuRef = React.useRef<HTMLDivElement>(null);
  const userMenuRef = React.useRef<HTMLDivElement>(null);

  const toggleMobileMenu = () => {
    const next = !isMobileMenuOpen;
    setIsMobileMenuOpen(next);
    announce(next ? 'Mobile menu opened' : 'Mobile menu closed');
  };

  const toggleUserMenu = () => setIsUserMenuOpen(v => !v);

  const handleNavigation = (path: string) => {
    router.push(path);
    setIsMobileMenuOpen(false);
    setIsUserMenuOpen(false);
  };

  const getUserDisplayName = () => {
    if (!user) return '';
    const p = user.profile as any;
    if (user.role === 'job-seeker' && p.firstName?.trim()) return p.firstName;
    if (user.role === 'employer' && p.companyName?.trim()) return p.companyName;
    return user.email;
  };

  const getDashboardPath = () =>
    user?.role === 'job-seeker' ? ROUTES.DASHBOARD_JOB_SEEKER : ROUTES.DASHBOARD_EMPLOYER;

  const isActive = (href: string) => pathname === href;

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target as Node))
        setIsMobileMenuOpen(false);
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node))
        setIsUserMenuOpen(false);
    };
    if (isMobileMenuOpen || isUserMenuOpen)
      document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen, isUserMenuOpen]);

  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setIsMobileMenuOpen(false); setIsUserMenuOpen(false); }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const navLinks = [
    { label: 'Find Jobs', href: ROUTES.JOBS, roles: ['job-seeker', null] as const },
    { label: 'Resume Analyzer', href: ROUTES.RESUME_ANALYZER, roles: ['job-seeker', 'employer', null] as const },
    { label: 'Post Job', href: '/dashboard/employer/jobs/new', roles: ['employer'] as const },
    { label: 'Hiring Solutions', href: ROUTES.HIRING_SOLUTIONS, roles: ['employer'] as const },
    { label: 'About', href: ROUTES.ABOUT, roles: ['job-seeker', 'employer', null] as const },
  ].filter((l) => (l.roles as ReadonlyArray<string | null>).includes(user?.role ?? null));

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full border-b border-[#E2E8F0] bg-white/95 backdrop-blur-sm dark:border-[#1F2937] dark:bg-[#0B0F19]/95',
        className
      )}
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between gap-4">

          <Link
            href={ROUTES.HOME}
            className="flex items-center gap-2 hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-md shrink-0"
            aria-label={`${APP_NAME} — homepage`}
          >
            <div className="w-7 h-7 bg-[#2563EB] rounded-lg flex items-center justify-center">
              <Briefcase className="h-4 w-4 text-white" aria-hidden="true" />
            </div>
            <span className="hidden xs:inline text-[15px] font-bold tracking-tight text-[#0F172A] dark:text-[#E5E7EB]">
              {APP_NAME}
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1" role="navigation" aria-label="Main navigation">
            {navLinks.map((link: any) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'px-3 py-1.5 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
                  isActive(link.href)
                    ? 'text-[#2563EB] bg-[#EFF6FF] dark:bg-[#1E3A8A]/20 dark:text-[#60A5FA]'
                    : 'text-[#475569] hover:text-[#0F172A] hover:bg-[#F1F5F9] dark:text-[#9CA3AF] dark:hover:text-[#E5E7EB] dark:hover:bg-[#1F2937]'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle variant="compact" />

            {user ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={toggleUserMenu}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-sm font-medium text-[#475569] hover:text-[#0F172A] hover:bg-[#F1F5F9] dark:text-[#9CA3AF] dark:hover:text-[#E5E7EB] dark:hover:bg-[#1F2937] transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                  aria-expanded={isUserMenuOpen}
                  aria-haspopup="menu"
                >
                  <div className="w-6 h-6 rounded-full bg-[#2563EB] flex items-center justify-center shrink-0">
                    <User className="h-3.5 w-3.5 text-white" aria-hidden="true" />
                  </div>
                  <span className="hidden sm:block max-w-[120px] truncate">{getUserDisplayName()}</span>
                  <ChevronDown className={cn('h-3.5 w-3.5 transition-transform hidden sm:block', isUserMenuOpen && 'rotate-180')} aria-hidden="true" />
                </button>

                {isUserMenuOpen && (
                  <div
                    className="absolute right-0 mt-1.5 w-48 rounded-xl border border-[#E2E8F0] bg-white shadow-medium dark:border-[#1F2937] dark:bg-[#111827] animate-scale-in"
                    role="menu"
                  >
                    <div className="px-3 py-2.5 border-b border-[#F1F5F9] dark:border-[#1F2937]">
                      <p className="text-xs font-medium text-[#0F172A] dark:text-[#E5E7EB] truncate">{getUserDisplayName()}</p>
                      <p className="text-xs text-[#64748B] dark:text-[#9CA3AF] truncate">{user.email}</p>
                    </div>
                    <div className="py-1">
                      {[
                        { label: 'Dashboard', icon: Briefcase, path: getDashboardPath() },
                        { label: 'Profile', icon: User, path: ROUTES.PROFILE },
                        { label: 'Settings', icon: Settings, path: ROUTES.SETTINGS },
                      ].map(item => (
                        <button
                          key={item.label}
                          onClick={() => handleNavigation(item.path)}
                          className="flex w-full items-center gap-2.5 px-3 py-2 text-sm text-[#374151] hover:bg-[#F8FAFC] dark:text-[#D1D5DB] dark:hover:bg-[#1F2937] transition-colors"
                          role="menuitem"
                        >
                          <item.icon className="h-4 w-4 text-[#64748B] dark:text-[#9CA3AF]" aria-hidden="true" />
                          {item.label}
                        </button>
                      ))}
                      <div className="border-t border-[#F1F5F9] dark:border-[#1F2937] mt-1 pt-1">
                        <button
                          onClick={onLogout}
                          className="flex w-full items-center gap-2.5 px-3 py-2 text-sm text-[#DC2626] hover:bg-[#FEF2F2] dark:text-[#F87171] dark:hover:bg-[#7F1D1D]/20 transition-colors"
                          role="menuitem"
                        >
                          <LogOut className="h-4 w-4" aria-hidden="true" />
                          Sign out
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={() => handleNavigation('/auth')}>
                  Sign in
                </Button>
                <Button variant="primary" size="sm" onClick={() => handleNavigation('/auth')}>
                  Sign up
                </Button>
              </div>
            )}

            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 rounded-lg text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F5F9] dark:text-[#9CA3AF] dark:hover:text-[#E5E7EB] dark:hover:bg-[#1F2937] transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div
            id="mobile-menu"
            ref={mobileMenuRef}
            className="lg:hidden border-t border-[#E2E8F0] dark:border-[#1F2937] py-3 animate-slide-up"
            role="navigation"
            aria-label="Mobile navigation"
          >
            <div className="space-y-0.5">
              {navLinks.map((link: any) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-3 py-2.5 rounded-lg text-sm font-medium text-[#374151] hover:text-[#0F172A] hover:bg-[#F1F5F9] dark:text-[#9CA3AF] dark:hover:text-[#E5E7EB] dark:hover:bg-[#1F2937] transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              {!user && (
                <div className="pt-3 mt-2 border-t border-[#E2E8F0] dark:border-[#1F2937] flex flex-col gap-2">
                  <Button variant="ghost" className="w-full justify-center" onClick={() => handleNavigation('/auth')}>
                    Sign in
                  </Button>
                  <Button variant="primary" className="w-full justify-center" onClick={() => handleNavigation('/auth')}>
                    Sign up
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
