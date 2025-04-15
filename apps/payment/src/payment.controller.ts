import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Controller()
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @MessagePattern('createPayment')
  create(@Payload() createPaymentDto: CreatePaymentDto) {
    return this.paymentService.create(createPaymentDto);
  }

  @MessagePattern('findOnePayment-checkout')
  findOne(@Payload() email: string) {
    return this.paymentService.checkCustomerPayments(email);
  }

  @MessagePattern('changeUser-premium')
  changeUserToPremium(@Payload() email: string) {
    return this.paymentService.changeUserToPremium(email);
  }
}
