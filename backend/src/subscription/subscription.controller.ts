import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { SubscribeRequestDto } from './dto/subscribe-request.dto';
import { ConfirmRequestDto } from './dto/confirm-request.dto';

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

  @Get('confirm/:token')
  async confirm(@Param() request: ConfirmRequestDto) {
    return await this.subscriptionService.confirm(request.token);
  }
}
