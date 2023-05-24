import { Module } from '@nestjs/common';
import { TodosModule } from './modules';

@Module({
  imports: [TodosModule],
})
export class AppModule {}
