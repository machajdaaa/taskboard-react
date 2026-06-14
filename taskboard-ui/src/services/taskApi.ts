import { TasksApi, Configuration } from '../generated';
import type { CreateTaskRequest, UpdateTaskRequest, TaskStatus } from '../generated/models';

const config = new Configuration({ basePath: 'http://localhost:3000' });
const api = new TasksApi(config);

export const taskApi = {
  getAll: (status?: TaskStatus) =>
    api.listTasks(status).then(r => r.data),

  getById: (id: string) =>
    api.getTask(id).then(r => r.data),

  create: (data: CreateTaskRequest) =>
    api.createTask(data).then(r => r.data),

  update: (id: string, data: UpdateTaskRequest) =>
    api.updateTask(id, data).then(r => r.data),

  remove: (id: string) =>
    api.deleteTask(id).then(r => r.data),
};

export type { CreateTaskRequest, UpdateTaskRequest, TaskStatus };
export type { Task } from '../generated/models';