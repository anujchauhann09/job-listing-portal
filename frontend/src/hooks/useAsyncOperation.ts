import { useState, useCallback, useRef } from 'react';
import { useNetworkError, NetworkError } from './useNetworkError';

interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: NetworkError | null;
  isRetrying: boolean;
  retryCount: number;
}

interface AsyncOperationOptions {
  onSuccess?: (data: any) => void;
  onError?: (error: NetworkError) => void;
  retryConfig?: {
    maxRetries?: number;
    retryDelay?: number;
    backoffMultiplier?: number;
  };
}

export const useAsyncOperation = <T = any>(options: AsyncOperationOptions = {}) => {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    loading: false,
    error: null,
    isRetrying: false,
    retryCount: 0,
  });

  const { executeWithRetry, error: networkError, isRetrying, retryCount, clearError } = useNetworkError(options.retryConfig);
  const abortControllerRef = useRef<AbortController | null>(null);

  const execute = useCallback(async (
    operation: (signal?: AbortSignal) => Promise<T>
  ): Promise<T | null> => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    setState(prev => ({
      ...prev,
      loading: true,
      error: null,
    }));

    try {
      const result = await executeWithRetry(() => operation(signal));
      
      if (signal.aborted) {
        return null;
      }

      setState(prev => ({
        ...prev,
        data: result,
        loading: false,
        error: null,
        isRetrying: false,
        retryCount: 0,
      }));

      options.onSuccess?.(result);
      return result;
    } catch (err) {
      if (signal.aborted) {
        return null;
      }

      const error = networkError || {
        message: err instanceof Error ? err.message : 'An unexpected error occurred',
        retryable: false,
      };

      setState(prev => ({
        ...prev,
        loading: false,
        error,
        isRetrying,
        retryCount,
      }));

      options.onError?.(error);
      return null;
    }
  }, [executeWithRetry, networkError, isRetrying, retryCount, options]);

  const retry = useCallback(() => {
    clearError();
    setState(prev => ({
      ...prev,
      error: null,
    }));
  }, [clearError]);

  const reset = useCallback(() => {
    // Cancel any ongoing operation
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    setState({
      data: null,
      loading: false,
      error: null,
      isRetrying: false,
      retryCount: 0,
    });
    clearError();
  }, [clearError]);

  const cancel = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    
    setState(prev => ({
      ...prev,
      loading: false,
      isRetrying: false,
    }));
  }, []);

  return {
    ...state,
    execute,
    retry,
    reset,
    cancel,
  };
};

export const useAsyncOperations = () => {
  const [operations, setOperations] = useState<Map<string, AsyncState<any>>>(new Map());

  const getOperation = useCallback((key: string) => {
    return operations.get(key) || {
      data: null,
      loading: false,
      error: null,
      isRetrying: false,
      retryCount: 0,
    };
  }, [operations]);

  const setOperationState = useCallback((key: string, state: Partial<AsyncState<any>>) => {
    setOperations(prev => {
      const newMap = new Map(prev);
      const currentState = newMap.get(key) || {
        data: null,
        loading: false,
        error: null,
        isRetrying: false,
        retryCount: 0,
      };
      newMap.set(key, { ...currentState, ...state });
      return newMap;
    });
  }, []);

  const executeOperation = useCallback(async <T>(
    key: string,
    operation: () => Promise<T>,
    options: AsyncOperationOptions = {}
  ): Promise<T | null> => {
    setOperationState(key, { loading: true, error: null });

    try {
      const result = await operation();
      setOperationState(key, { 
        data: result, 
        loading: false, 
        error: null,
        isRetrying: false,
        retryCount: 0,
      });
      options.onSuccess?.(result);
      return result;
    } catch (err) {
      const error = {
        message: err instanceof Error ? err.message : 'An unexpected error occurred',
        retryable: false,
      };
      setOperationState(key, { loading: false, error });
      options.onError?.(error);
      return null;
    }
  }, [setOperationState]);

  const resetOperation = useCallback((key: string) => {
    setOperations(prev => {
      const newMap = new Map(prev);
      newMap.delete(key);
      return newMap;
    });
  }, []);

  const resetAllOperations = useCallback(() => {
    setOperations(new Map());
  }, []);

  return {
    getOperation,
    executeOperation,
    resetOperation,
    resetAllOperations,
    isAnyLoading: Array.from(operations.values()).some(op => op.loading),
    hasAnyError: Array.from(operations.values()).some(op => op.error),
  };
};

export default useAsyncOperation;