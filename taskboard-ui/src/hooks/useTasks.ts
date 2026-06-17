import { useState, useEffect, useCallback } from 'react';
import { taskApi } from '../services/taskApi';
import type { Task, CreateTaskRequest, UpdateTaskRequest, TaskStatus } from '../services/taskApi';

interface UseTasksReturn {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  filterStatus: TaskStatus | '';
  setFilterStatus: (status: TaskStatus | '') => void;
  createTask: (data: CreateTaskRequest) => Promise<void>;
  updateTask: (id: string, data: UpdateTaskRequest) => Promise<void>;
  removeTask: (id: string) => Promise<void>;
}

export const useTasks = (): UseTasksReturn => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<TaskStatus | ''>('');

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await taskApi.getAll(filterStatus || undefined);
      setTasks(data);
    } catch {
      setError('Nepodařilo se načíst úkoly.');
    } finally {
      setLoading(false);
    }
  }, [filterStatus]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const createTask = async (data: CreateTaskRequest) => {
    await taskApi.create(data);
    await fetchTasks();
  };

  const updateTask = async (id: string, data: UpdateTaskRequest) => {
    await taskApi.update(id, data);
    await fetchTasks();
  };

  const removeTask = async (id: string) => {
    await taskApi.remove(id);
    await fetchTasks();
  };

  return { tasks, loading, error, filterStatus, setFilterStatus, createTask, updateTask, removeTask };
};