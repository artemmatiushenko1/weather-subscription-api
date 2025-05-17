import { Body, Controller, Post } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { SubscribeRequestDto } from './dto/subscribe-request.dto';

@Controller('/')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Post('subscribe')
  async subscribe(@Body() request: SubscribeRequestDto) {
    return await this.subscriptionService.subscribe(
      request.email,
      request.city,
      request.frequency,
    );
  }
}
