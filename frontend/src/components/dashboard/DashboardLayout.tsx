'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Header } from '@/components/common/Header';
import { DashboardSidebar } from './DashboardSidebar';
import { cn } from '@/lib/utils';
import { useScreenReader } from '@/hooks/useAccessibility';
import { Menu } from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function DashboardLayout({ children, className }: DashboardLayoutProps) {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const { announce } = useScreenReader();
  const mainContentRef = React.useRef<HTMLElement>(null);

  const handleSidebarToggle = () => {
    const next = !sidebarOpen;
    setSidebarOpen(next);
    announce(next ? 'Sidebar opened' : 'Sidebar closed');
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F8FAFC] dark:bg-[#0B0F19]">
        <div className="text-center">
          <h1 className="text-lg font-semibold text-[#0F172A] dark:text-[#E5E7EB]">Authentication Required</h1>
          <p className="text-sm text-[#64748B] dark:text-[#9CA3AF] mt-1">Please log in to access the dashboard.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0B0F19]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#2563EB] focus:text-white focus:rounded-lg focus:shadow-lg"
      >
        Skip to main content
      </a>

      <Header user={user} onLogout={logout} />

      <div className="flex">
        <DashboardSidebar user={user} isOpen={sidebarOpen} onToggle={handleSidebarToggle} />

        <main
          id="main-content"
          ref={mainContentRef}
          className={cn('flex-1 lg:ml-60 min-h-[calc(100vh-3.5rem)]', className)}
          role="main"
          tabIndex={-1}
        >
          {/* Mobile sidebar toggle */}
          <div className="lg:hidden flex items-center gap-3 px-4 py-3 border-b border-[#E2E8F0] dark:border-[#1F2937] bg-white dark:bg-[#0F172A]">
            <button
              onClick={handleSidebarToggle}
              className="p-1.5 rounded-lg text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F5F9] dark:text-[#9CA3AF] dark:hover:bg-[#1F2937] focus:outline-none focus:ring-2 focus:ring-primary-500"
              aria-label="Open sidebar"
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>
            <span className="text-sm font-medium text-[#64748B] dark:text-[#9CA3AF]">Menu</span>
          </div>

          <div className="p-4 sm:p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
