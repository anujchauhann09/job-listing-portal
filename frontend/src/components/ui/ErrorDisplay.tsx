import React from 'react';
import { AlertTriangle, RefreshCw, X, Wifi, WifiOff } from 'lucide-react';
import { Button } from './Button';
import { cn } from '@/lib/utils';

interface ErrorDisplayProps {
  error?: {
    message: string;
    status?: number;
    code?: string;
    retryable?: boolean;
  };
  title?: string;
  variant?: 'inline' | 'card' | 'banner';
  size?: 'sm' | 'md' | 'lg';
  showRetry?: boolean;
  showDismiss?: boolean;
  onRetry?: () => void;
  onDismiss?: () => void;
  className?: string;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
  error,
  title,
  variant = 'card',
  size = 'md',
  showRetry = true,
  showDismiss = false,
  onRetry,
  onDismiss,
  className,
}) => {
  if (!error) return null;

  const isNetworkError = error.code === 'NETWORK_ERROR' || error.status === 0;
  const canRetry = showRetry && (error.retryable || isNetworkError) && onRetry;

  const getIcon = () => {
    if (isNetworkError) {
      return <WifiOff className="h-5 w-5 text-error-500" />;
    }
    return <AlertTriangle className="h-5 w-5 text-error-500" />;
  };

  const getTitle = () => {
    if (title) return title;
    if (isNetworkError) return 'Connection Error';
    if (error.status === 404) return 'Not Found';
    if (error.status === 403) return 'Access Denied';
    if (error.status === 401) return 'Authentication Required';
    if (error.status && error.status >= 500) return 'Server Error';
    return 'Error';
  };

  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  const variantClasses = {
    inline: 'flex items-start gap-3',
    card: 'p-4 border border-error-200 dark:border-error-800 rounded-lg bg-error-50 dark:bg-error-900/20',
    banner: 'p-3 bg-error-100 dark:bg-error-900/30 border-l-4 border-error-500',
  };

  return (
    <div className={cn(variantClasses[variant], sizeClasses[size], className)}>
      <div className="flex-shrink-0">
        {getIcon()}
      </div>
      
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-error-800 dark:text-error-200 mb-1">
          {getTitle()}
        </h3>
        <p className="text-error-700 dark:text-error-300">
          {error.message}
        </p>
        
        {(canRetry || showDismiss) && (
          <div className="flex gap-2 mt-3">
            {canRetry && (
              <Button
                size="sm"
                variant="outline"
                onClick={onRetry}
                className="text-error-700 border-error-300 hover:bg-error-100 dark:text-error-300 dark:border-error-600 dark:hover:bg-error-800"
              >
                <RefreshCw className="h-3 w-3 mr-1" />
                Try Again
              </Button>
            )}
            {showDismiss && onDismiss && (
              <Button
                size="sm"
                variant="ghost"
                onClick={onDismiss}
                className="text-error-600 hover:text-error-800 dark:text-error-400 dark:hover:text-error-200"
              >
                <X className="h-3 w-3 mr-1" />
                Dismiss
              </Button>
            )}
          </div>
        )}
      </div>
      
      {showDismiss && onDismiss && variant !== 'inline' && (
        <button
          onClick={onDismiss}
          className="flex-shrink-0 text-error-400 hover:text-error-600 dark:text-error-500 dark:hover:text-error-300"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

// Network status indicator component
interface NetworkStatusProps {
  isOnline?: boolean;
  className?: string;
}

const NetworkStatus: React.FC<NetworkStatusProps> = ({ 
  isOnline = navigator.onLine, 
  className 
}) => {
  if (isOnline) return null;

  return (
    <div className={cn(
      'fixed top-0 left-0 right-0 z-50 bg-error-600 text-white text-center py-2 text-sm font-medium',
      className
    )}>
      <div className="flex items-center justify-center gap-2">
        <WifiOff className="h-4 w-4" />
        You are currently offline. Some features may not be available.
      </div>
    </div>
  );
};

// Empty state component for when there's no data
interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
  className,
}) => {
  return (
    <div className={cn(
      'flex flex-col items-center justify-center py-12 px-4 text-center',
      className
    )}>
      {icon && (
        <div className="mb-4 text-secondary-400 dark:text-secondary-500">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-medium text-secondary-900 dark:text-secondary-100 mb-2">
        {title}
      </h3>
      {description && (
        <p className="text-secondary-600 dark:text-secondary-400 mb-6 max-w-sm">
          {description}
        </p>
      )}
      {action && (
        <Button onClick={action.onClick} variant="primary">
          {action.label}
        </Button>
      )}
    </div>
  );
};

export { ErrorDisplay, NetworkStatus, EmptyState };
export type { ErrorDisplayProps, NetworkStatusProps, EmptyStateProps };