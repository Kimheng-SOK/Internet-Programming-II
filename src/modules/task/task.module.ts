import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from 'src/tasks/task.entity';
import { TasksService } from './task.service';
import { TasksController } from './task.controller';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), UserModule],
  providers: [TasksService],
  controllers: [TasksController],
})
export class TaskModule {}
