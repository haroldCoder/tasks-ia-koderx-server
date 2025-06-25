import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { SupabaseModule } from '../database/supabase.module';
import { UsersModule } from '../users/users.module';
import { AditionalTaskService } from './aditionalTask.service';

@Module({
  imports: [SupabaseModule, UsersModule],
  controllers: [TasksController],
  providers: [TasksService, AditionalTaskService],
})
export class TasksModule {}
