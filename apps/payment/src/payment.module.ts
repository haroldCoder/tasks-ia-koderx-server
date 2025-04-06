import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { ConfigModule } from '@nestjs/config';
import { DatabaseService } from './database/database.service';
import Stripe from 'stripe';


@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [PaymentController],
  providers: [
    PaymentService,
    {
      provide: 'STRIPE',
      useFactory: () => {
        return new Stripe(process.env.STRIPE_SECRET_KEY, {
          apiVersion: "2025-03-31.basil"
        });
      },
    },
    DatabaseService,
  ],
})
export class PaymentModule {}
