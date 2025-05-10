import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Controller()
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}
  @MessagePattern('createPayment')
  async create(@Payload() createPaymentDto: CreatePaymentDto) {
    try {
      return await this.paymentService.create(createPaymentDto);
    } catch (error) {
      throw error;
    }
  }

  @MessagePattern('findOnePayment-checkout')
  async findOne(@Payload() email: string) {
    try {
      return await this.paymentService.checkCustomerPayments(email);
    } catch (error) {
      throw error;
    }
  }

  @MessagePattern('changeUser-premium')
  async changeUserToPremium(@Payload() email: string) {
    try {
      return await this.paymentService.changeUserToPremium(email);
    } catch (error) {
      throw error;
    }
  }
}
