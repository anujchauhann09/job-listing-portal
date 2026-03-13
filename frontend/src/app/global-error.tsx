'use client';

import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  React.useEffect(() => {
    console.error('Global application error:', error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="min-h-screen bg-red-50 flex items-center justify-center px-4">
          <div className="max-w-md w-full text-center">
            <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-6" />
            
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Application Error
            </h1>
            <p className="text-gray-600 mb-6">
              A critical error occurred that prevented the application from loading properly.
            </p>

            <button
              onClick={reset}
              className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <RefreshCw className="h-4 w-4" />
              Reload Application
            </button>

            {process.env.NODE_ENV === 'development' && (
              <details className="mt-6 text-left bg-gray-100 p-4 rounded-lg">
                <summary className="cursor-pointer font-medium text-gray-900 mb-2">
                  Error Details
                </summary>
                <pre className="text-xs text-red-600 overflow-auto">
                  {error.message}
                  {error.stack && `\n\n${error.stack}`}
                </pre>
              </details>
            )}
          </div>
        </div>
      </body>
    </html>
  );
}