export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface ApiError {
  message: string;
  code?: string;
  details?: any;
}

export class ApiClient {
  private baseUrl: string;
  private defaultHeaders: Record<string, string>;
  private isRefreshing = false;
  private refreshQueue: Array<{ resolve: () => void; reject: (e: Error) => void }> = [];

  constructor(baseUrl: string = '/api') {
    this.baseUrl = baseUrl;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
  }

  private async tryRefresh(): Promise<void> {
    if (this.isRefreshing) {
      return new Promise((resolve, reject) => {
        this.refreshQueue.push({ resolve, reject });
      });
    }

    this.isRefreshing = true;

    try {
      const response = await fetch(`${this.baseUrl}/auth/refresh`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error('Refresh failed');
      }

      this.refreshQueue.forEach(p => p.resolve());
    } catch (err) {
      this.refreshQueue.forEach(p => p.reject(new Error('Session expired')));
      throw err;
    } finally {
      this.isRefreshing = false;
      this.refreshQueue = [];
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
    isRetry = false
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const config: RequestInit = {
      ...options,
      headers: {
        ...this.defaultHeaders,
        ...options.headers,
      },
      credentials: 'include', 
    };

    try {
      const response = await fetch(url, config);
      
      const data = await response.json().catch(() => null);
      
      if (!response.ok) {
        const errorMessage = data?.message || `HTTP ${response.status}: ${response.statusText}`;

        if (
          response.status === 401 &&
          !isRetry &&
          endpoint !== '/auth/refresh' &&
          endpoint !== '/auth/login' &&
          endpoint !== '/auth/me'
        ) {
          try {
            await this.tryRefresh();
            return this.request<T>(endpoint, options, true);
          } catch {
            if (typeof window !== 'undefined') {
              const isAuthPage = window.location.pathname.startsWith('/auth/');
              if (!isAuthPage) {
                window.dispatchEvent(new CustomEvent('auth:unauthorized'));
              }
            }
            throw new Error(errorMessage);
          }
        }

        // 401 on /auth/me (init check) — just throw, AuthContext handles it
        if (!(response.status === 401 && endpoint === '/auth/me')) {
          console.error('API Error:', errorMessage);
        }
        
        throw new Error(errorMessage);
      }

      return data;
    } catch (error) {
      if (!(error instanceof Error && error.message.includes('Authentication token') && endpoint === '/auth/me')) {
      }
      throw error;
    }
  }

  async get<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET', ...options });
  }

  async post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async patch<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }

  async uploadFile<T>(endpoint: string, file: File, fieldName: string = 'file', additionalData?: Record<string, any>): Promise<ApiResponse<T>> {
    const formData = new FormData();
    formData.append(fieldName, file);
    
    if (additionalData) {
      Object.entries(additionalData).forEach(([key, value]) => {
        formData.append(key, value);
      });
    }

    const url = `${this.baseUrl}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });
      
      const data = await response.json().catch(() => null);
      
      if (!response.ok) {
        const errorMessage = data?.message || `HTTP ${response.status}: ${response.statusText}`;
        console.error('API File Upload Error:', errorMessage);
        throw new Error(errorMessage);
      }

      return data;
    } catch (error) {
      console.error('API file upload failed:', error);
      throw error;
    }
  }
}

export const apiClient = new ApiClient();