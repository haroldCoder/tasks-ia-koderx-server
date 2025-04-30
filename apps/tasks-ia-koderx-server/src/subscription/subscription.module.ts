import { Module } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { SubscriptionController } from './subscription.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'SUBSCRIPTION_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.HOST_PAYMENT ?? 'microservice',
          port: process.env.PORT_PAYMENT ? parseInt(process.env.PORT_PAYMENT) : 3002,
        },
      },
    ]),
  ],
  controllers: [SubscriptionController],
  providers: [SubscriptionService],
})
export class SubscriptionModule {}
