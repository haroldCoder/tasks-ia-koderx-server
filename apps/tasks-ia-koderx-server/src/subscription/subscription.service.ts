import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreatePaymentDto } from 'apps/payment/src/dto/create-payment.dto';
import { ClientProxy } from '@nestjs/microservices';
import { HttpResponse } from '../users/types/http-response';
import { Payment } from './interfaces/payment-verified.interface';
import { PaymentCreate } from './interfaces/payment-create.interface';

@Injectable()
export class SubscriptionService {
  constructor(@Inject('SUBSCRIPTION_SERVICE') private client: ClientProxy){}

  async create(createSubscriptionDto: CreatePaymentDto): Promise<HttpResponse<PaymentCreate>> {
    try {
      const response = await this.client.send('createPayment',
        createSubscriptionDto
      ).toPromise();

      return {
        response,
        httpStatus: 200
      };
    } catch (err) {
      return {
        response: err.message,
        httpStatus: 400
      };
    }
  }

  async verifyPaymentCheckout(email: string): Promise<HttpResponse<Payment>> {
    try {
      const response = await this.client.send('findOnePayment-checkout',
        email
      ).toPromise();

      return {
        response,
        httpStatus: HttpStatus.OK
      };

    } 
    catch(err) {
      return {
        response: err.message,
        httpStatus: HttpStatus.BAD_REQUEST
      };
    }
  }

  async changeUserToPremium(email: string): Promise<HttpResponse<string>>{
    try{
      const response = await this.client.send('changeUser-premium',
        email
      ).toPromise();

      return {
        response,
        httpStatus: HttpStatus.OK
      };
    }
    catch(error) {
      return {
        response: error.message,
        httpStatus: HttpStatus.BAD_REQUEST
      };
    }
  }
}
