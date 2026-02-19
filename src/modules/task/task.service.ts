import { Injectable } from '@nestjs/common';

@Injectable()
export class TaskService {
  getTask(id: string) {
    console.log(id);
    return {
      name: 'Task 1',
      description: 'Description of Task 1',
      createdAt: new Date().toISOString(),
      completedAt: null,
      userId: 1,
    };
  }
  createTask(body: any) {
    console.log(body);
    return {
      name: 'Task 1',
      description: 'Description of Task 1',
      createdAt: new Date().toISOString(),
      completedAt: null,
      userId: 1,
    };
  }
  updateTask(id: string, body: any) {
    console.log(body);
    return {
      name: 'Task 1',
      description: 'Description of Task 1',
      createdAt: new Date().toISOString(),
      completedAt: null,
      userId: 1,
    };
  }
  deleteTask(id: string) {
    console.log(id);
    return { message: 'success' };
  }
}
