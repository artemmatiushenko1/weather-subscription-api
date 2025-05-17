import { WEATHER_API_TOKEN } from './interfaces/weather-api.interface';
import { Module } from '@nestjs/common';
import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';
import { WeatherApiImpl } from './weather-api-impl/weather-api.impl';
import { HttpModule, HttpService } from '@nestjs/axios';

@Module({
  imports: [HttpModule.register({})],
  providers: [
    WeatherService,
    {
      provide: WEATHER_API_TOKEN,
      useFactory: (httpService: HttpService) => {
        // TODO: add config service, use convict to validate envs
        const apiKey = process.env.WEATHER_API_KEY as string;
        return new WeatherApiImpl(apiKey, httpService);
      },
      inject: [HttpService],
    },
  ],
  controllers: [WeatherController],
  exports: [WeatherService],
})
export class WeatherModule {}
