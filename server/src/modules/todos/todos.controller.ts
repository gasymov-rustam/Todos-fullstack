import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ChangeTodo } from './Dto/ChangeTodo';
import { CreateTodo } from './Dto/CreateTodo';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodoController {
  constructor(private readonly _todoService: TodosService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getAllTodos() {
    return this._todoService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getTodoById(@Param('id') id: string) {
    return this._todoService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Content-Type', 'application/json')
  createTodo(@Body() dto: CreateTodo) {
    return this._todoService.create(dto);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @Header('Content-Type', 'application/json')
  updateTodo(@Param('id') id: string, @Body() dto: ChangeTodo) {
    return this._todoService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @Header('Content-Type', 'application/json')
  deleteTodoById(@Param('id') id: string) {
    return this._todoService.remove(id);
  }
}
