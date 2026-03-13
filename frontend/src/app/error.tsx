'use client';

import React from 'react';
import { AlertTriangle, RefreshCw, Home, Bug } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  React.useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  const isDevelopment = process.env.NODE_ENV === 'development';

  return (
    <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900 flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        <div className="mb-8">
          <AlertTriangle className="h-16 w-16 text-error-500 mx-auto mb-6" />
          
          <h1 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100 mb-2">
            Something went wrong
          </h1>
          <p className="text-secondary-600 dark:text-secondary-400 mb-6">
            We encountered an unexpected error while processing your request. 
            This has been logged and we'll look into it.
          </p>

          {isDevelopment && (
            <details className="text-left bg-secondary-100 dark:bg-secondary-800 p-4 rounded-lg mb-6">
              <summary className="cursor-pointer font-medium text-secondary-900 dark:text-secondary-100 mb-2">
                Error Details (Development Only)
              </summary>
              <div className="space-y-2">
                <div>
                  <strong className="text-error-600 dark:text-error-400">Message:</strong>
                  <pre className="text-xs text-secondary-700 dark:text-secondary-300 mt-1 overflow-auto">
                    {error.message}
                  </pre>
                </div>
                {error.digest && (
                  <div>
                    <strong className="text-error-600 dark:text-error-400">Digest:</strong>
                    <pre className="text-xs text-secondary-700 dark:text-secondary-300 mt-1">
                      {error.digest}
                    </pre>
                  </div>
                )}
                {error.stack && (
                  <div>
                    <strong className="text-error-600 dark:text-error-400">Stack Trace:</strong>
                    <pre className="text-xs text-secondary-700 dark:text-secondary-300 mt-1 overflow-auto max-h-40">
                      {error.stack}
                    </pre>
                  </div>
                )}
              </div>
            </details>
          )}
        </div>

        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              onClick={reset}
              variant="primary"
              className="flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Try Again
            </Button>
            <Button
              onClick={() => window.location.href = '/'}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Home className="h-4 w-4" />
              Go Home
            </Button>
          </div>

          {!isDevelopment && (
            <div className="pt-6 border-t border-secondary-200 dark:border-secondary-700">
              <p className="text-sm text-secondary-500 dark:text-secondary-400 mb-3">
                If this problem persists, please contact support
              </p>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  const subject = encodeURIComponent('Error Report');
                  const body = encodeURIComponent(
                    `I encountered an error on the page.\n\nError: ${error.message}\nDigest: ${error.digest || 'N/A'}\nTime: ${new Date().toISOString()}`
                  );
                  window.location.href = `mailto:support@employrix.com?subject=${subject}&body=${body}`;
                }}
                className="flex items-center gap-2"
              >
                <Bug className="h-4 w-4" />
                Report Issue
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}