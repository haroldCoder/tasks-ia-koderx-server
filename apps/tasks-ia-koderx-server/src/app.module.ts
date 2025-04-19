import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { SupabaseModule } from './database/supabase.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SubscriptionModule } from './subscription/subscription.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PAYMENT_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.HOST_PAYMENT ?? 'microservice',
          port: process.env.PORT_PAYMENT ? parseInt(process.env.PORT_PAYMENT) : 3002,
        },
      },
    ]),
    ConfigModule.forRoot({isGlobal: true}),
    SupabaseModule,
    AuthModule,
    UsersModule,
    TasksModule,
    SubscriptionModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
