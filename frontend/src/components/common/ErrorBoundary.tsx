'use client';

import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<ErrorFallbackProps>;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface ErrorFallbackProps {
  error?: Error;
  resetError: () => void;
  goHome: () => void;
}

const DefaultErrorFallback: React.FC<ErrorFallbackProps> = ({ error, resetError, goHome }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary-50 dark:bg-secondary-900 px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-6">
          <AlertTriangle className="h-16 w-16 text-error-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100 mb-2">
            Something went wrong
          </h1>
          <p className="text-secondary-600 dark:text-secondary-400 mb-6">
            We encountered an unexpected error. Please try refreshing the page or go back to the homepage.
          </p>
          {process.env.NODE_ENV === 'development' && error && (
            <details className="text-left bg-secondary-100 dark:bg-secondary-800 p-4 rounded-lg mb-6">
              <summary className="cursor-pointer font-medium text-secondary-900 dark:text-secondary-100 mb-2">
                Error Details
              </summary>
              <pre className="text-xs text-error-600 dark:text-error-400 overflow-auto">
                {error.message}
                {error.stack && `\n\n${error.stack}`}
              </pre>
            </details>
          )}
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            onClick={resetError}
            variant="primary"
            className="flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Try Again
          </Button>
          <Button
            onClick={goHome}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Home className="h-4 w-4" />
            Go Home
          </Button>
        </div>
      </div>
    </div>
  );
};

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    // Call the onError callback if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    this.setState({
      error,
      errorInfo,
    });
  }

  resetError = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  goHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback;
      return (
        <FallbackComponent
          error={this.state.error}
          resetError={this.resetError}
          goHome={this.goHome}
        />
      );
    }

    return this.props.children;
  }
}

export { ErrorBoundary, DefaultErrorFallback };
export type { ErrorBoundaryProps, ErrorFallbackProps };