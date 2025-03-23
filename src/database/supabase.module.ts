import { Module } from '@nestjs/common';
import { SupabaseService } from './supabase.service';
import { supabaseConfig } from '../config/supabase.config';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [SupabaseService, supabaseConfig],
  exports: [SupabaseService, 'SUPABASE_CONFIG'],
})
export class SupabaseModule {}