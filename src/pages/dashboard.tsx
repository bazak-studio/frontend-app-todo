import { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Plus, Search } from 'lucide-react';
import { TaskItem } from '@/components/task-item';
import { TaskEditModal } from '@/components/task-edit-modal';
import { useTodoStore } from '@/stores/todo-store';
import { toast } from 'sonner';

export function Dashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<{
    status?: string;
    priority?: number;
  }>({});
  const [editingTask, setEditingTask] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);

  const {
    todos,
    addTodo,
    toggleTodo,
    updateTodo,
    deleteTodo,
    reorderTodos,
  } = useTodoStore();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
    // Provide haptic feedback on mobile devices
    if (window.navigator.vibrate) {
      window.navigator.vibrate(50);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over || active.id === over.id) return;

    const oldIndex = todos.findIndex((todo) => todo.id === active.id);
    const newIndex = todos.findIndex((todo) => todo.id === over.id);

    reorderTodos(oldIndex, newIndex);
    
    // Provide haptic feedback on mobile devices
    if (window.navigator.vibrate) {
      window.navigator.vibrate([50, 50]);
    }
  };

  const handleDragCancel = () => {
    setActiveId(null);
  };

  const filteredTodos = todos.filter((todo) => {
    const matchesSearch = todo.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus = !filter.status || todo.status === filter.status;
    const matchesPriority = !filter.priority || todo.priority === filter.priority;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const stats = {
    total: filteredTodos.length,
    completed: filteredTodos.filter((todo) => todo.completed).length,
    overdue: filteredTodos.filter(
      (todo) =>
        todo.dueDate && new Date(todo.dueDate) < new Date() && !todo.completed
    ).length,
  };

  const handleNewTask = () => {
    setEditingTask('new');
  };

  const handleEditTask = (id: string) => {
    setEditingTask(id);
  };

  const handleSaveTask = async (data: any) => {
    try {
      if (editingTask === 'new') {
        addTodo(data);
        toast.success('Task created successfully');
      } else {
        updateTodo(editingTask!, data);
        toast.success('Task updated successfully');
      }
    } catch (error) {
      toast.error('Failed to save task');
      throw error;
    }
  };

  const handleDeleteTask = (id: string) => {
    deleteTodo(id);
    toast.success('Task deleted successfully');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto space-y-8"
    >
      {/* Header with Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 bg-card rounded-lg border">
          <div className="text-2xl font-bold">{stats.total}</div>
          <div className="text-sm text-muted-foreground">Total Tasks</div>
        </div>
        <div className="p-4 bg-card rounded-lg border">
          <div className="text-2xl font-bold text-green-500">
            {stats.completed}
          </div>
          <div className="text-sm text-muted-foreground">Completed</div>
        </div>
        <div className="p-4 bg-card rounded-lg border">
          <div className="text-2xl font-bold text-red-500">{stats.overdue}</div>
          <div className="text-sm text-muted-foreground">Overdue</div>
        </div>
      </div>

      {/* Search and Actions */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Filter</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setFilter({})}>
              All Tasks
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => setFilter({ status: 'pending' })}
            >
              Pending
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setFilter({ status: 'in_progress' })}
            >
              In Progress
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setFilter({ status: 'completed' })}
            >
              Completed
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => setFilter({ priority: 1 })}
            >
              Priority 1
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button onClick={handleNewTask}>
          <Plus className="mr-2 h-4 w-4" /> Add Task
        </Button>
      </div>

      {/* Todo List */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <SortableContext
          items={filteredTodos.map((todo) => todo.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-2">
            {filteredTodos.map((todo) => (
              <TaskItem
                key={todo.id}
                {...todo}
                onToggle={() => toggleTodo(todo.id)}
                onEdit={() => handleEditTask(todo.id)}
                onDelete={() => handleDeleteTask(todo.id)}
              />
            ))}
          </div>
        </SortableContext>

        <DragOverlay>
          {activeId ? (
            <div className="opacity-80">
              <TaskItem
                {...todos.find((todo) => todo.id === activeId)!}
                onToggle={() => {}}
                onEdit={() => {}}
                onDelete={() => {}}
              />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      {filteredTodos.length === 0 && (
        <div className="text-center py-12">
          <div className="text-muted-foreground">No tasks found</div>
        </div>
      )}

      {/* Edit Modal */}
      <TaskEditModal
        open={!!editingTask}
        onOpenChange={(open) => !open && setEditingTask(null)}
        task={
          editingTask === 'new'
            ? undefined
            : todos.find((todo) => todo.id === editingTask)
        }
        onSave={handleSaveTask}
      />
    </motion.div>
  );
}