import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Task } from './tasks/task.entity';
import { UserModule } from './modules/user/user.module';
import { TaskModule } from './modules/task/task.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'todo.sqlite',
      entities: [User, Task],
      synchronize: true, // use only in development!
    }),
    UserModule,
    TaskModule,
  ],
})
export class AppModule {}
