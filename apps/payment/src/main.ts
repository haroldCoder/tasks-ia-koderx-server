import { NestFactory } from '@nestjs/core';
import { PaymentModule } from './payment.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { DatabaseService } from './database/database.service';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    PaymentModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
        queue: 'subscription_queue',
        queueOptions: {
          durable: false,
        },
        noAck: true,
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
