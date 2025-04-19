import { Inject, Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import Stripe from 'stripe';
import { DatabaseService } from './database/database.service';
import { Payment } from './interfaces/payment.interface';

@Injectable()
export class PaymentService {
  constructor(@Inject('STRIPE') private readonly stripe,
  private readonly databaseService: DatabaseService) {}

  async create(createPaymentDto: CreatePaymentDto) {
    const session = await this.stripe.checkout.sessions.create({
      mode: 'subscription',
      success_url: createPaymentDto.success_url ?? "",
      cancel_url: createPaymentDto.cancel_url ?? "",
      payment_method_types: ['card'],
      line_items: [{
        price: createPaymentDto.priceId ?? process.env.STRIPE_PRICE_ID,
        quantity: 1,
      }]
    });

    return {
      session: session,
      url: session.url
    }
  }

  async checkCustomerPayments(email: string): Promise<Payment> {
    try{
      const customer = await this.stripe.customers.list({
        email,
        limit: 1
      })

      if(!customer.data.length){
        return {
          hasPaid: false,
          message: "No customer found"
        }
      }

      const subscriptions = await this.stripe.subscriptions.list({
        customer: customer.data[0].id,
        limit: 1,
        status: 'all',
        expand: ['data.latest_invoice']
      })

      if(!subscriptions.data.length){
        return {
          hasPaid: false,
          customerId: customer.data[0].id,
          message: "No subscription found"
        }
      }

      const subscription = subscriptions.data[0];
      const hasPaid = subscription.status === 'active' || subscription.status === 'trialing';
      const latestInvoice = subscription.latest_invoice as Stripe.Invoice;

      return {
        hasPaid,
        subscriptionStatus: subscription.status,
        latestInvoiceStatus: latestInvoice.status,
        customerId: customer.data[0].id,
        subscriptionId: subscription.id,
      }
    }
    catch(err){
      throw new Error(`Error verifying user: ${err.message}`);
    }
  }

  async changeUserToPremium(email: string): Promise<string>{
    const { hasPaid } = await this.checkCustomerPayments(email);

    if(hasPaid){
      await this.databaseService.getClient().from('users')
      .update({
        isPremium: true
      })
      .eq('email', email)

      return "User is now premium";
    }
    else{
      return "User has not paid";
    }
  }
}
