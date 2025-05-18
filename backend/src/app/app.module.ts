import { Module } from '@nestjs/common';
import { WeatherModule } from '../weather/weather.module';
import { SubscriptionModule } from '../subscription/subscription.module';
import { EmailModule } from '../email/email.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WeatherSchedulerModule } from '../weather-scheduler/weather-scheduler.module';
import { AppConfigModule } from '../app-config/app-config.module';
import { AppConfigService } from 'src/app-config/app-config.service';
import { Environment } from './app.config';

@Module({
  imports: [
    AppConfigModule,
    WeatherModule,
    SubscriptionModule,
    EmailModule,
    WeatherSchedulerModule,
    TypeOrmModule.forRootAsync({
      inject: [AppConfigService],
      useFactory: (appConfigService: AppConfigService) => {
        const postgresConfig = appConfigService.databaseConfig.postgres;
        const appConfig = appConfigService.appConfig;

        return {
          type: 'postgres',
          host: postgresConfig.host,
          port: postgresConfig.port,
          username: postgresConfig.username,
          password: postgresConfig.password,
          database: postgresConfig.database,
          synchronize: appConfig.env === Environment.DEV ? true : false,
          entities: [__dirname + './**/*.entity.{js,ts}'],
          autoLoadEntities: true,
        };
      },
    }),
  ],
})
export class AppModule {}
