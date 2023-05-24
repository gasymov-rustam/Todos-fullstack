import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateTodo {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsBoolean()
  @IsNotEmpty()
  readonly done: false;
}
