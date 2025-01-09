import type {
  Todo,
  Category,
  TodoFilters,
  PaginationParams,
  PaginatedResponse,
  AuthResponse,
  ApiResponse,
  ApiError,
} from './api-types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1';

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json();
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
  const token = localStorage.getItem('auth_token');
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  return handleResponse<T>(response);
}

// Auth API
export const auth = {
  register: (email: string, password: string): Promise<ApiResponse<AuthResponse>> =>
    fetchApi('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  login: (email: string, password: string): Promise<ApiResponse<AuthResponse>> =>
    fetchApi('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  refreshToken: (): Promise<ApiResponse<{ token: string }>> =>
    fetchApi('/auth/refresh', {
      method: 'POST',
    }),
};

// Todos API
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

// Categories API
export const categories = {
  list: (): Promise<ApiResponse<Category[]>> =>
    fetchApi('/categories'),

  create: (name: string): Promise<ApiResponse<Category>> =>
    fetchApi('/categories', {
      method: 'POST',
      body: JSON.stringify({ name }),
    }),
};