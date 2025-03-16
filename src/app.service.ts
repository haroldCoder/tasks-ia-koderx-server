import { Injectable } from '@nestjs/common';
import { SupabaseService } from './database/supabase.service';

@Injectable()
export class AppService {
  constructor(private supabaseService: SupabaseService) {}
  getHello(): string {
    this.supabaseService.getClient();
    return 'Hello World!';
  }
}
