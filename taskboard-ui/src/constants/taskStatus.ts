import type { TaskStatus } from '../services/taskApi';

export const statusOptions: { value: TaskStatus; label: string }[] = [
  { value: 'todo',        label: 'Nový' },
  { value: 'in_progress', label: 'V řešení' },
  { value: 'done',        label: 'Hotovo' },
];

export const statusConfig: Record<TaskStatus, { label: string; color: 'default' | 'warning' | 'success' }> = {
  todo:        { label: 'Nový',     color: 'default' },
  in_progress: { label: 'V řešení', color: 'warning' },
  done:        { label: 'Hotovo',   color: 'success' },
};