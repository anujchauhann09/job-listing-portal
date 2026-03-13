import { useState, useCallback } from 'react';

export interface NetworkError {
  message: string;
  status?: number;
  code?: string;
  retryable: boolean;
}

export interface RetryConfig {
  maxRetries: number;
  retryDelay: number;
  backoffMultiplier: number;
}

const defaultRetryConfig: RetryConfig = {
  maxRetries: 3,
  retryDelay: 1000,
  backoffMultiplier: 2,
};

export const useNetworkError = (retryConfig: Partial<RetryConfig> = {}) => {
  const [error, setError] = useState<NetworkError | null>(null);
  const [isRetrying, setIsRetrying] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  const config = { ...defaultRetryConfig, ...retryConfig };

  const clearError = useCallback(() => {
    setError(null);
    setRetryCount(0);
    setIsRetrying(false);
  }, []);

  const handleError = useCallback((err: unknown): NetworkError => {
    let networkError: NetworkError;

    if (err instanceof Error) {
      if (err.name === 'TypeError' && err.message.includes('fetch')) {
        networkError = {
          message: 'Network connection failed. Please check your internet connection.',
          code: 'NETWORK_ERROR',
          retryable: true,
        };
      } else {
        networkError = {
          message: err.message,
          retryable: false,
        };
      }
    } else if (typeof err === 'object' && err !== null) {
      const httpError = err as { status?: number; message?: string };
      const status = httpError.status || 0;
      
      networkError = {
        message: httpError.message || getStatusMessage(status),
        status,
        retryable: isRetryableStatus(status),
      };
    } else {
      networkError = {
        message: 'An unexpected error occurred',
        retryable: false,
      };
    }

    setError(networkError);
    return networkError;
  }, []);

  const executeWithRetry = useCallback(async <T>(
    operation: () => Promise<T>,
    onRetry?: (attempt: number) => void
  ): Promise<T> => {
    let lastError: unknown;
    
    for (let attempt = 0; attempt <= config.maxRetries; attempt++) {
      try {
        if (attempt > 0) {
          setIsRetrying(true);
          setRetryCount(attempt);
          onRetry?.(attempt);
          
          const delay = config.retryDelay * Math.pow(config.backoffMultiplier, attempt - 1);
          await new Promise(resolve => setTimeout(resolve, delay));
        }

        const result = await operation();
        clearError();
        return result;
      } catch (err) {
        lastError = err;
        const networkError = handleError(err);
        
        if (!networkError.retryable || attempt === config.maxRetries) {
          setIsRetrying(false);
          throw err;
        }
      }
    }

    setIsRetrying(false);
    throw lastError;
  }, [config, handleError, clearError]);

  return {
    error,
    isRetrying,
    retryCount,
    clearError,
    handleError,
    executeWithRetry,
  };
};

const getStatusMessage = (status: number): string => {
  switch (status) {
    case 400:
      return 'Bad request. Please check your input and try again.';
    case 401:
      return 'Authentication required. Please log in and try again.';
    case 403:
      return 'Access denied. You don\'t have permission to perform this action.';
    case 404:
      return 'The requested resource was not found.';
    case 408:
      return 'Request timeout. Please try again.';
    case 429:
      return 'Too many requests. Please wait a moment and try again.';
    case 500:
      return 'Internal server error. Please try again later.';
    case 502:
      return 'Bad gateway. The server is temporarily unavailable.';
    case 503:
      return 'Service unavailable. Please try again later.';
    case 504:
      return 'Gateway timeout. The server took too long to respond.';
    default:
      if (status >= 400 && status < 500) {
        return 'Client error occurred. Please check your request.';
      } else if (status >= 500) {
        return 'Server error occurred. Please try again later.';
      }
      return 'An unexpected error occurred.';
  }
};

const isRetryableStatus = (status: number): boolean => {
  return status >= 500 || status === 408 || status === 429 || status === 0;
};

export default useNetworkError;