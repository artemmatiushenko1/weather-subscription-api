import { Module } from '@nestjs/common';
import { WeatherModule } from '../weather/weather.module';
import { SubscriptionModule } from '../subscription/subscription.module';
import { EmailModule } from '../email/email.module';
import { WeatherSchedulerModule } from '../weather-scheduler/weather-scheduler.module';
import { AppConfigModule } from '../app-config/app-config.module';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [
    AppConfigModule,
    DatabaseModule,
    WeatherModule,
    SubscriptionModule,
    EmailModule,
    WeatherSchedulerModule,
  ],
})
export class AppModule {}
