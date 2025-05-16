import { Module } from '@nestjs/common';
import { WeatherModule } from './weather/weather.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { EmailModule } from './email/email.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    WeatherModule,
    SubscriptionModule,
    EmailModule,
  ],
})
export class AppModule {}
