import { Inject, Injectable, Logger } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  private client: SupabaseClient;
  private isConnected = false;
  private readonly logger = new Logger(SupabaseService.name);

  constructor(@Inject('SUPABASE_CONFIG') private config: any) {
    this.client = createClient(config.url, config.key);
    this.verifyConnection();
  }

  async verifyConnection() {
    try {
      const { error } = await this.client.from('users').select('id').limit(1);
      if (error) throw error;
      this.isConnected = true;
      console.log("connection with supabase stablished");
      this.logger.log('connection with supabase stablished');
    } catch (error) {
      this.isConnected = false;
      this.logger.error('Error on connection supabase:', error.message);
    }
  }

  getClient(): SupabaseClient {
    return this.client;
  }
}