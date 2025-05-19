import { Global, Module } from '@nestjs/common';
import { AppConfigService } from './app-config.service';
import { ConfigModule } from '@nestjs/config';

import loadEmailConfig from '../email/email.config';
import loadWeatherConfig from '../weather/weather.config';
import loadDatabaseConfig from '../database/database.config';
import loadAppConfig from '../app/app.config';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
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
