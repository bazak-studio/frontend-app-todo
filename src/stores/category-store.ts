import { create } from 'zustand';
import { categories as categoriesApi } from '@/lib/api';
import type { Category } from '@/lib/api-types';

interface CategoryState {
  categories: Category[];
  isLoading: boolean;
  error: string | null;
  fetchCategories: () => Promise<void>;
  addCategory: (category: Pick<Category, 'name' | 'description'>) => Promise<void>;
  updateCategory: (id: string, updates: Partial<Category>) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
}

export const useCategoryStore = create<CategoryState>((set, get) => ({
  categories: [],
  isLoading: false,
  error: null,

  fetchCategories: async () => {
    try {
      set({ isLoading: true, error: null });
      const data = await categoriesApi.list();
      set({ categories: data, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch categories',
        isLoading: false,
      });
    }
  },

  addCategory: async (category) => {
    try {
      set({ isLoading: true, error: null });
      await categoriesApi.create(category);
      await get().fetchCategories();
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to add category',
        isLoading: false,
      });
    }
  },

  updateCategory: async (id, updates) => {
    try {
      set({ isLoading: true, error: null });
      await categoriesApi.update(id, updates);
      await get().fetchCategories();
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to update category',
        isLoading: false,
      });
    }
  },

  deleteCategory: async (id) => {
    try {
      set({ isLoading: true, error: null });
      await categoriesApi.delete(id);
      await get().fetchCategories();
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to delete category',
        isLoading: false,
      });
    }
  },
}));