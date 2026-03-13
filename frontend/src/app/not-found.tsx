'use client';

import React from 'react';
import Link from 'next/link';
import { Search, Home, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const dynamic = 'force-dynamic';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="relative mb-6">
            <div className="text-8xl font-bold text-secondary-200 dark:text-secondary-700 select-none">
              404
            </div>
            <Search className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-12 w-12 text-secondary-400 dark:text-secondary-500" />
          </div>
          
          <h1 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100 mb-2">
            Page Not Found
          </h1>
          <p className="text-secondary-600 dark:text-secondary-400 mb-8">
            The page you're looking for doesn't exist or has been moved. 
            Let's get you back on track.
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link 
              href="/" 
              className="inline-flex items-center justify-center gap-2 h-10 px-4 text-base rounded-lg font-medium transition-colors bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
            >
              <Home className="h-4 w-4" />
              Go Home
            </Link>
            <Link 
              href="/jobs" 
              className="inline-flex items-center justify-center gap-2 h-10 px-4 text-base rounded-lg font-medium transition-colors border border-secondary-300 bg-transparent text-secondary-700 hover:bg-secondary-50 active:bg-secondary-100 dark:border-secondary-600 dark:text-secondary-300 dark:hover:bg-secondary-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-500 focus-visible:ring-offset-2"
            >
              <Search className="h-4 w-4" />
              Browse Jobs
            </Link>
          </div>
          
          <button
            className="flex items-center gap-2 mx-auto px-4 py-2 text-secondary-600 hover:text-secondary-800 dark:text-secondary-400 dark:hover:text-secondary-200 transition-colors"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </button>
        </div>

        <div className="mt-12 pt-8 border-t border-secondary-200 dark:border-secondary-700">
          <p className="text-sm text-secondary-500 dark:text-secondary-400 mb-4">
            Looking for something specific?
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link 
              href="/dashboard" 
              className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
            >
              Dashboard
            </Link>
            <Link 
              href="/profile" 
              className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
            >
              Profile
            </Link>
            <Link 
              href="/settings" 
              className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
            >
              Settings
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}