import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { SubscribeRequestDto } from './dto/subscribe-request.dto';
import { ConfirmRequestDto } from './dto/confirm-request.dto';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';

@Controller('/')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Post('subscribe')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Subscribe to weather updates',
    description:
      'Subscribe an email to receive weather updates for a specific city with chosen frequency.',
  })
  @ApiBody({
    description: 'Subscription details',
    type: SubscribeRequestDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Subscription successful. Confirmation email sent.',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input',
  })
  @ApiResponse({
    status: 409,
    description: 'Email already subscribed',
  })
  @ApiConsumes('application/json')
  @ApiConsumes('application/x-www-form-urlencoded')
  async subscribe(@Body() request: SubscribeRequestDto) {
    return await this.subscriptionService.subscribe(
      request.email,
      request.city,
      request.frequency,
    );
  }

  @Get('confirm/:token')
  @ApiOperation({
    summary: 'Confirm email subscription',
    description:
      'Confirms a subscription using the token sent in the confirmation email.',
  })
  @ApiParam({
    name: 'token',
    description: 'Confirmation token',
    required: true,
    type: 'string',
  })
  @ApiResponse({
    status: 200,
    description: 'Subscription confirmed successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid token',
  })
  @ApiResponse({
    status: 404,
    description: 'Token not found',
  })
  async confirm(@Param() request: ConfirmRequestDto) {
    return await this.subscriptionService.confirm(request.token);
  }

  @Get('unsubscribe/:token')
  @ApiOperation({
    summary: 'Unsubscribe from weather updates',
    description:
      'Unsubscribes an email from weather updates using the token sent in emails.',
  })
  @ApiParam({
    name: 'token',
    description: 'Unsubscribe token',
    required: true,
    type: 'string',
  })
  @ApiResponse({
    status: 200,
    description: 'Unsubscribed successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid token',
  })
  @ApiResponse({
    status: 404,
    description: 'Token not found',
  })
  async unsubscribe(@Param() request: ConfirmRequestDto) {
    return await this.subscriptionService.unsubscribe(request.token);
  }
}
