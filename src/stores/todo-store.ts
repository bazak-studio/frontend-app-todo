import { create } from 'zustand';

interface Todo {
  id: string;
  title: string;
  description?: string;
  status: 'pending' | 'in_progress' | 'completed';
  priority: number;
  dueDate?: string;
  completed: boolean;
  categories?: string[];
}

interface TodoStore {
  todos: Todo[];
  addTodo: (todo: Partial<Todo>) => void;
  toggleTodo: (id: string) => void;
  updateTodo: (id: string, updates: Partial<Todo>) => void;
  deleteTodo: (id: string) => void;
  reorderTodos: (startIndex: number, endIndex: number) => void;
}

export const useTodoStore = create<TodoStore>((set) => ({
  todos: [
    {
      id: '1',
      title: 'Complete project proposal',
      description: 'Write and submit the project proposal for the new client',
      status: 'in_progress',
      priority: 1,
      dueDate: '2024-03-20T00:00:00Z',
      completed: false,
      categories: ['Work', 'Important'],
    },
    {
      id: '2',
      title: 'Buy groceries',
      status: 'pending',
      priority: 3,
      completed: false,
      categories: ['Personal'],
    },
    {
      id: '3',
      title: 'Schedule team meeting',
      description: 'Coordinate with team members for the weekly sync',
      status: 'completed',
      priority: 2,
      dueDate: '2024-03-15T00:00:00Z',
      completed: true,
      categories: ['Work', 'Meeting'],
    },
  ],
  addTodo: (todo) =>
    set((state) => ({
      todos: [
        ...state.todos,
        {
          id: crypto.randomUUID(),
          title: '',
          status: 'pending',
          priority: 3,
          completed: false,
          ...todo,
        },
      ],
    })),
  toggleTodo: (id) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              completed: !todo.completed,
              status: !todo.completed ? 'completed' : 'pending',
            }
          : todo
      ),
    })),
  updateTodo: (id, updates) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, ...updates } : todo
      ),
    })),
  deleteTodo: (id) =>
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    })),
  reorderTodos: (startIndex, endIndex) =>
    set((state) => {
      const newTodos = Array.from(state.todos);
      const [removed] = newTodos.splice(startIndex, 1);
      newTodos.splice(endIndex, 0, removed);
      return { todos: newTodos };
    }),
}));