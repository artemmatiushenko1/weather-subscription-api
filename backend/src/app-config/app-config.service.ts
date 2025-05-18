import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from 'src/app.config';
import { DatabaseConfig } from 'src/database.config';
import { EmailConfig } from 'src/email/email.config';
import { WeatherConfig } from 'src/weather/weather.config';

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  get databaseConfig(): DatabaseConfig {
    return this.configService.getOrThrow('database');
  }

  get appConfig(): AppConfig {
    return this.configService.getOrThrow('app');
  }

  get weatherConfig(): WeatherConfig {
    return this.configService.getOrThrow('weather');
  }

  get emailConfig(): EmailConfig {
    return this.configService.getOrThrow('email');
  }
}
