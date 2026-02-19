import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from 'src/tasks/task.entity';
import { User } from 'src/users/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepo: Repository<Task>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async findAll() {
    return this.taskRepo.find({ relations: ['user'] });
  }

  async findOne(id: number) {
    return this.taskRepo.findOne({ where: { id }, relations: ['user'] });
  }

  async create(body: { name: string; description?: string; userId: number }) {
    const user = await this.userRepo.findOne({ where: { id: body.userId } });
    if (!user) throw new Error('User not found');
    const task = this.taskRepo.create({
      name: body.name,
      description: body.description,
      user,
    });
    return this.taskRepo.save(task);
  }

  async update(
    id: number,
    body: Partial<{ name: string; description: string; completedAt: Date }>,
  ) {
    await this.taskRepo.update(id, body);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.taskRepo.delete(id);
    return { message: 'success' };
  }
}
