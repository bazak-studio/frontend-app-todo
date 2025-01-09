import { motion } from 'framer-motion';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { format, isAfter, isBefore, isToday } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  MoreVertical,
  GripVertical,
  Calendar,
  Tag,
} from 'lucide-react';

interface TaskItemProps {
  id: string;
  title: string;
  description?: string;
  status: 'pending' | 'in_progress' | 'completed';
  priority: number;
  dueDate?: string;
  categories?: string[];
  completed: boolean;
  onToggle: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const priorityInfo = {
  1: { color: 'text-red-500 dark:text-red-400', label: 'Critical' },
  2: { color: 'text-orange-500 dark:text-orange-400', label: 'High' },
  3: { color: 'text-yellow-500 dark:text-yellow-400', label: 'Medium' },
  4: { color: 'text-blue-500 dark:text-blue-400', label: 'Low' },
  5: { color: 'text-gray-500 dark:text-gray-400', label: 'Minimal' },
};

function getDueDateStatus(dueDate?: string) {
  if (!dueDate) return null;
  const date = new Date(dueDate);
  const now = new Date();

  if (isToday(date)) {
    return {
      label: 'Due Today',
      variant: 'warning' as const,
    };
  }
  if (isBefore(date, now)) {
    return {
      label: 'Overdue',
      variant: 'destructive' as const,
    };
  }
  if (isAfter(date, now)) {
    return {
      label: format(date, 'MMM d'),
      variant: 'default' as const,
    };
  }
  return null;
}

export function TaskItem({
  id,
  title,
  description,
  priority,
  dueDate,
  categories = [],
  completed,
  onToggle,
  onEdit,
  onDelete,
}: TaskItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const dueDateStatus = getDueDateStatus(dueDate);
  const priorityColor = priorityInfo[priority as keyof typeof priorityInfo]?.color || priorityInfo[3].color;

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`group relative flex items-start gap-4 p-4 bg-card rounded-lg border transition-all ${
        isDragging ? 'opacity-50 shadow-lg scale-105' : ''
      } ${completed ? 'opacity-75' : ''}`}
    >
      {/* Drag Handle */}
      <button
        className="touch-none p-1 opacity-0 group-hover:opacity-100 transition-opacity mt-1"
        {...attributes}
        {...listeners}
      >
        <GripVertical className="h-4 w-4 text-muted-foreground" />
      </button>

      {/* Checkbox */}
      <Checkbox
        checked={completed}
        onCheckedChange={onToggle}
        className="mt-1"
      />

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3
              className={`font-medium ${
                completed ? 'line-through text-muted-foreground' : ''
              }`}
            >
              {title}
            </h3>
            {description && (
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                {description}
              </p>
            )}
          </div>

          {/* Badges and Actions */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {dueDateStatus && (
              <Badge
                variant={dueDateStatus.variant}
                className="flex items-center gap-1"
              >
                <Calendar className="h-3 w-3" />
                {dueDateStatus.label}
              </Badge>
            )}

            <Tooltip>
              <TooltipTrigger asChild>
                <Badge
                  variant="outline"
                  className={`${priorityColor} cursor-help`}
                >
                  P{priority}
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <div className="text-sm">
                  {priorityInfo[priority as keyof typeof priorityInfo]?.label || 'Medium'} Priority
                </div>
              </TooltipContent>
            </Tooltip>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={onEdit}>Edit</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={onDelete}
                  className="text-destructive"
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Categories */}
        {categories.length > 0 && (
          <div className="flex items-center gap-2 mt-2">
            <Tag className="h-3 w-3 text-muted-foreground" />
            <div className="flex flex-wrap gap-1">
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant="secondary"
                  className="text-xs"
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}