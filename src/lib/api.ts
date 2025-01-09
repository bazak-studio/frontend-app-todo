import type {
  Todo,
  Category,
  TodoFilters,
  PaginationParams,
  PaginatedResponse,
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  ApiResponse,
} from './api-types';
import { useAuthStore } from '@/stores/auth-store';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1';

class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public code: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json();
    if (response.status === 401) {
      // Clear auth state on unauthorized
      useAuthStore.getState().clearAuth();
    }
    throw new ApiError(
      error.message || 'An error occurred',
      response.status,
      error.code || 'UNKNOWN_ERROR'
    );
  }
  return response.json();
}

async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const { token } = useAuthStore.getState();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });

    return handleResponse<T>(response);
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) {
      // Try to refresh token
      const { refreshToken } = useAuthStore.getState();
      if (refreshToken) {
        try {
          const { token: newToken } = await auth.refreshToken(refreshToken);
          useAuthStore.getState().setAuth(
            useAuthStore.getState().user!,
            newToken,
            refreshToken
          );
          
          // Retry original request with new token
          const retryResponse = await fetch(`${API_URL}${endpoint}`, {
            ...options,
            headers: {
              ...headers,
              Authorization: `Bearer ${newToken}`,
            },
          });
          
          return handleResponse<T>(retryResponse);
        } catch (refreshError) {
          // If refresh fails, clear auth and throw original error
          useAuthStore.getState().clearAuth();
          throw error;
        }
      }
    }
    throw error;
  }
}

// Auth endpoints
export const auth = {
  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await fetchApi<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return response;
  },

  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await fetchApi<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return response;
  },

  refreshToken: async (refreshToken: string): Promise<{ token: string }> => {
    const response = await fetchApi<{ token: string }>('/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
    });
    return response;
  },

  logout: async (refreshToken: string): Promise<void> => {
    await fetchApi('/auth/logout', {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
    });
    useAuthStore.getState().clearAuth();
  },
};

// Todos endpoints
export const todos = {
  list: (
    filters?: TodoFilters,
    pagination?: PaginationParams
  ): Promise<ApiResponse<PaginatedResponse<Todo>>> => {
    const params = new URLSearchParams();
    if (filters?.status) params.append('status', filters.status);
    if (filters?.priority) params.append('priority', filters.priority.toString());
    if (filters?.search) params.append('search', filters.search);
    if (filters?.category) params.append('category', filters.category);
    if (pagination?.page) params.append('page', pagination.page.toString());
    if (pagination?.limit) params.append('limit', pagination.limit.toString());

    return fetchApi(`/todos?${params.toString()}`);
  },

  create: (todo: Omit<Todo, 'id' | 'createdAt' | 'updatedAt' | 'userId'>): Promise<ApiResponse<Todo>> =>
    fetchApi('/todos', {
      method: 'POST',
      body: JSON.stringify(todo),
    }),

  get: (id: string): Promise<ApiResponse<Todo>> =>
    fetchApi(`/todos/${id}`),

  update: (id: string, todo: Partial<Todo>): Promise<ApiResponse<Todo>> =>
    fetchApi(`/todos/${id}`, {
      method: 'PUT',
      body: JSON.stringify(todo),
    }),

  delete: (id: string): Promise<ApiResponse<void>> =>
    fetchApi(`/todos/${id}`, {
      method: 'DELETE',
    }),
};

// Categories endpoints
export const categories = {
  list: (): Promise<ApiResponse<Category[]>> =>
    fetchApi('/categories'),

  create: (name: string): Promise<ApiResponse<Category>> =>
    fetchApi('/categories', {
      method: 'POST',
      body: JSON.stringify({ name }),
    }),

  update: (id: string, category: Partial<Category>): Promise<ApiResponse<Category>> =>
    fetchApi(`/categories/${id}`, {
      method: 'PUT',
      body: JSON.stringify(category),
    }),

  delete: (id: string): Promise<ApiResponse<void>> =>
    fetchApi(`/categories/${id}`, {
      method: 'DELETE',
    }),
};