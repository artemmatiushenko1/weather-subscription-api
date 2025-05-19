import { Module } from '@nestjs/common';
import { WeatherSchedulerService } from './weather-scheduler.service';
import { SubscriptionModule } from 'src/subscription/subscription.module';
import { WeatherModule } from 'src/weather/weather.module';
import { EmailModule } from 'src/email/email.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    SubscriptionModule,
    WeatherModule,
    EmailModule,
  ],
  providers: [WeatherSchedulerService],
})
export class WeatherSchedulerModule {}
