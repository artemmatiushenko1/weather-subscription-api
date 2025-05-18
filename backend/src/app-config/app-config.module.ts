import { Module } from '@nestjs/common';
import { AppConfigService } from './app-config.service';
import { ConfigModule } from '@nestjs/config';

import loadEmailConfig from '../email/email.config';
import loadWeatherConfig from '../weather/weather.config';
import loadDatabaseConfig from '../database.config';
import loadAppConfig from '../app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        loadEmailConfig,
        loadWeatherConfig,
        loadDatabaseConfig,
        loadAppConfig,
      ],
    }),
  ],
  providers: [AppConfigService],
  exports: [AppConfigService],
})
export class AppConfigModule {}
