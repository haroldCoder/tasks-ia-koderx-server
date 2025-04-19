import { NestFactory } from '@nestjs/core';
import { PaymentModule } from './payment.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { DatabaseService } from './database/database.service';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    PaymentModule,
    {
      transport: Transport.TCP,
      options: {
        host: '0.0.0.0',
        port: process.env.PORT_PAYMENT ? parseInt(process.env.PORT_PAYMENT) : 3002,
      }
    }
  );

  const databaseService = app.get(DatabaseService);
  const supabase = databaseService.getClient();

  try {
    const { error } = await supabase.from('users').select('*');
    if (error) throw error;
    console.log('✅ Successfully connected to Supabase database');
  } catch (error) {
    console.error('❌ Error connecting to Supabase:', error.message);
  }

  await app.listen();
}
bootstrap();
