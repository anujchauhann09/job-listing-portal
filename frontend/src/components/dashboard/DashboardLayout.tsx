'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Header } from '@/components/common/Header';
import { DashboardSidebar } from './DashboardSidebar';
import { cn } from '@/lib/utils';
import { useScreenReader } from '@/hooks/useAccessibility';

interface DashboardLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function DashboardLayout({ children, className }: DashboardLayoutProps) {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const { announce } = useScreenReader();
  const mainContentRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    if (user) {
      announce(`Dashboard loaded for ${user.role === 'job-seeker' ? 'job seeker' : 'employer'}`);
    }
  }, [user, announce]);

  const handleSidebarToggle = () => {
    const newState = !sidebarOpen;
    setSidebarOpen(newState);
    announce(newState ? 'Sidebar opened' : 'Sidebar closed');
  };

  const skipToMainContent = () => {
    if (mainContentRef.current) {
      mainContentRef.current.focus();
      mainContentRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-xl font-semibold text-secondary-900 dark:text-secondary-100">
            Authentication Required
          </h1>
          <p className="text-secondary-600 dark:text-secondary-400 mt-2">
            Please log in to access the dashboard.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900">
      <a
        href="#main-content"
        onClick={(e) => {
          e.preventDefault();
          skipToMainContent();
        }}
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary-600 focus:text-white focus:rounded-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-300 focus:ring-offset-2"
      >
        Skip to main content
      </a>

      <Header user={user} onLogout={logout} />
      
      <div className="flex">
        <DashboardSidebar 
          user={user}
          isOpen={sidebarOpen}
          onToggle={handleSidebarToggle}
        />
        
        <main 
          id="main-content"
          ref={mainContentRef}
          className={cn(
            'flex-1 transition-all duration-300 ease-in-out',
            'lg:ml-64', 
            className
          )}
          role="main"
          aria-label="Dashboard main content"
          tabIndex={-1}
        >
          <div className="p-4 sm:p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>
      
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          role="presentation"
          aria-hidden="true"
        />
      )}
    </div>
  );
}