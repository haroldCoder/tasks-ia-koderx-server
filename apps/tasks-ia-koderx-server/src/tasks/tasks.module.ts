import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { SupabaseModule } from 'src/database/supabase.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [SupabaseModule, UsersModule],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
