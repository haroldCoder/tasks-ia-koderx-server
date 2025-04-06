import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SupabaseService } from 'src/database/supabase.service';
import { SupabaseModule } from 'src/database/supabase.module';
import { AuthService } from 'src/auth/auth.service';

@Module({
  imports: [SupabaseModule],
  controllers: [UsersController],
  providers: [UsersService, SupabaseService, AuthService],
  exports: [UsersService],
})
export class UsersModule {}
