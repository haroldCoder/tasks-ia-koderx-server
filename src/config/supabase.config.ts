import { ConfigService } from '@nestjs/config';

export const supabaseConfig = {
  provide: 'SUPABASE_CONFIG',
  useFactory: (configService: ConfigService) => ({
    url: configService.get<string>('SUPABASE_URL'),
    key: configService.get<string>('SUPABASE_KEY'),
  }),
  inject: [ConfigService],
};