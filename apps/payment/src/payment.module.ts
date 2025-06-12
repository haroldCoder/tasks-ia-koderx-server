import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseService } from './database/database.service';
import Stripe from 'stripe';


@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [PaymentController],
  providers: [
    {
      provide: 'STRIPE',
      useFactory: (configService: ConfigService) => {
        return new Stripe(configService.get('STRIPE_SECRET_KEY'), {
          apiVersion: "2025-05-28.basil"
        });
      }, 
      inject: [ConfigService],
    },
    PaymentService,
    DatabaseService,
  ],
})
export class PaymentModule {}
