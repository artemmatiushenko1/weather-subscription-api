import { WEATHER_API_TOKEN } from './interfaces/weather-api.interface';
import { Module } from '@nestjs/common';
import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';
import { WeatherApiImpl } from './weather-api-impl/weather-api.impl';
import { AppConfigService } from 'src/app-config/app-config.service';

@Module({
  providers: [
    WeatherService,
    {
      provide: WEATHER_API_TOKEN,
      useFactory: (appConfigService: AppConfigService) => {
        const weatherConfig = appConfigService.weatherConfig;
        const apiKey = weatherConfig.weatherApiKey;
        return new WeatherApiImpl(apiKey);
      },
      inject: [AppConfigService],
    },
  ],
  controllers: [WeatherController],
  exports: [WeatherService],
})
export class WeatherModule {}
