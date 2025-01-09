// API Types
export interface Todo {
  id: string;
  title: string;
  description?: string;
  status: 'pending' | 'in_progress' | 'completed';
  priority: number;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
  categories?: string[];
  userId: string;
}

export interface Category {
  id: string;
  name: string;
  createdAt: string;
  userId: string;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  createdAt: string;
}

export interface TodoFilters {
  status?: Todo['status'];
  priority?: number;
  category?: string;
  search?: string;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export interface AuthResponse {
  user: User;
  token: string;
}

// API Error Types
export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public code: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  message?: string;
}