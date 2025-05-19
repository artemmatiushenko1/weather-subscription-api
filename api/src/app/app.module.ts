import { Module } from '@nestjs/common';
import { WeatherModule } from '../weather/weather.module';
import { SubscriptionModule } from '../subscription/subscription.module';
import { EmailModule } from '../email/email.module';
import { WeatherSchedulerModule } from '../weather-scheduler/weather-scheduler.module';
import { AppConfigModule } from '../app-config/app-config.module';
import { DatabaseModule } from 'src/database/database.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    AppConfigModule,
    DatabaseModule,
    WeatherModule,
    SubscriptionModule,
    EmailModule,
    WeatherSchedulerModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
  ],
})
export class AppModule {}
