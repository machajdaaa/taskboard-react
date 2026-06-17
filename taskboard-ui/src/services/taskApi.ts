import { TasksApi } from '../generated';
import type { CreateTaskRequest, UpdateTaskRequest, TaskStatus, Task } from '../generated';

const api = new TasksApi();

export const taskApi = {
  getAll: (status?: TaskStatus) =>
    api.listTasks(status).then(r => r.data),

  create: (data: CreateTaskRequest) =>
    api.createTask(data).then(r => r.data),

  update: (id: string, data: UpdateTaskRequest) =>
    api.updateTask(id, data).then(r => r.data),

  remove: (id: string) =>
    api.deleteTask(id),
};

export type { CreateTaskRequest, UpdateTaskRequest, TaskStatus, Task };