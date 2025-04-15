import { Controller, Post, Body, Get, Param, Patch } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { CreatePaymentDto } from '../shared/dto/payment.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { routes_subscription, version } from './routes/subscription.routes';

@Controller(version)
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Post(routes_subscription.create_payment)
  @ApiOperation({ summary: 'Create a new subscription', description: 'Creates a new subscription payment for a user' })
  @ApiBody({ type: CreatePaymentDto })
  @ApiResponse({ status: 201, description: 'Subscription successfully created' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  create(@Body() createSubscriptionDto: CreatePaymentDto) {
    return this.subscriptionService.create(createSubscriptionDto);
  }

  @Get(routes_subscription.verify_payment)
  @ApiOperation({ summary: 'Verify payment', description: 'Retrieves all subscriptions for a user' })
  @ApiParam({ name: 'email', description: 'User email' })
  @ApiResponse({ status: 200, description: 'Subscriptions successfully retrieved' })
  @ApiResponse({ status: 404, description: 'Subscriptions not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  verifyPaymentCheckout(@Param('email') email: string) {
    return this.subscriptionService.verifyPaymentCheckout(email);
  }

  @Patch(routes_subscription.update_subscription_user)
  @ApiOperation({ summary: 'Update subscription status on user', description: 'Updates the status of a subscription on user' })
  @ApiParam({ name: 'email', description: 'User email' })
  @ApiResponse({ status: 200, description: 'Subscription status successfully updated' })
  @ApiResponse({ status: 404, description: 'Subscription not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  updateSubscriptionStatus(@Param('email') email: string) {
    return this.subscriptionService.changeUserToPremium(email);
  }
}
