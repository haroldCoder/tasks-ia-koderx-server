import { Module } from '@nestjs/common';
import { SupabaseService } from './supabase.service';
import { supabaseConfig } from '../config/supabase.config';

@Module({
  providers: [SupabaseService, supabaseConfig],
  exports: [SupabaseService],
})
export class SupabaseModule {}