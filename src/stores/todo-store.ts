import { create } from 'zustand';
import { todos as todosApi } from '@/lib/api';
import type { Todo, TodoFilters, PaginationParams } from '@/lib/api-types';

interface TodoState {
  todos: Todo[];
  isLoading: boolean;
  error: string | null;
  filters: TodoFilters;
  pagination: Required<PaginationParams>;
  total: number;
  fetchTodos: () => Promise<void>;
  addTodo: (todo: Omit<Todo, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateTodo: (id: string, updates: Partial<Todo>) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
  setFilters: (filters: TodoFilters) => void;
  setPagination: (pagination: Partial<PaginationParams>) => void;
}

export const useTodoStore = create<TodoState>((set, get) => ({
  todos: [],
  isLoading: false,
  error: null,
  filters: {},
  pagination: {
    page: 1,
    limit: 10,
  },
  total: 0,

  fetchTodos: async () => {
    try {
      set({ isLoading: true, error: null });
      const { data, total, page, limit } = await todosApi.list(
        get().filters,
        get().pagination
      );
      set({
        todos: data,
        total,
        pagination: { page, limit },
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch todos',
        isLoading: false,
      });
    }
  },

  addTodo: async (todo) => {
    try {
      set({ isLoading: true, error: null });
      await todosApi.create(todo);
      await get().fetchTodos();
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to add todo',
        isLoading: false,
      });
    }
  },

  updateTodo: async (id, updates) => {
    try {
      set({ isLoading: true, error: null });
      await todosApi.update(id, updates);
      await get().fetchTodos();
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to update todo',
        isLoading: false,
      });
    }
  },

  deleteTodo: async (id) => {
    try {
      set({ isLoading: true, error: null });
      await todosApi.delete(id);
      await get().fetchTodos();
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to delete todo',
        isLoading: false,
      });
    }
  },

  setFilters: (filters) => {
    set({ filters: { ...get().filters, ...filters } });
    get().fetchTodos();
  },

  setPagination: (pagination) => {
    set({
      pagination: { ...get().pagination, ...pagination },
    });
    get().fetchTodos();
  },
}));