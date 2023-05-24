import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ChangeTodo } from './Dto/ChangeTodo';
import { CreateTodo } from './Dto/CreateTodo';
import { Todo } from './models/Todo';

@Injectable()
export class TodosService {
  constructor(
    @InjectModel(Todo)
    private _todoModel: typeof Todo,
  ) {}

  findAll = async (): Promise<Todo[]> => {
    return this._todoModel.findAll();
  };

  findOne = async (id: string): Promise<Todo> => {
    return this._todoModel.findByPk(id);
  };

  create = async (dto: CreateTodo): Promise<Todo> => {
    const todo = new Todo();
    todo.title = dto.title;
    todo.done = dto.done;
    this._todoModel.create({ ...dto });

    return todo.save();
  };

  update = async (
    id: string,
    dto: ChangeTodo,
  ): Promise<[affectedCount: number, affectedRows: Todo[]]> => {
    const todo = await this._todoModel.findByPk(id);

    if (!todo) throw new Error(`Todo with id: ${id} not found`);

    return this._todoModel.update(dto, { where: { id }, returning: true });
  };

  remove: (id: string) => Promise<void> = async (id: string) => {
    const todo = await this._todoModel.findByPk(id);

    if (!todo) throw new Error(`Todo with id: ${id} not found`);

    await todo.destroy();
  };
}
