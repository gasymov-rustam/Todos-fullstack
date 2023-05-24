import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Todo } from './models/Todo';
import { TodoController } from './todos.controller';
import { TodosService } from './todos.service';

@Module({
  imports: [SequelizeModule.forFeature([Todo])],
  controllers: [TodoController],
  providers: [TodosService],
})
export class TodosModule {}
