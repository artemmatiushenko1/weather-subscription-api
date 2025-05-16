import { Inject, Injectable } from '@nestjs/common';
import { IWeatherApi, WEATHER_API_TOKEN } from './weather-api.interface';
import { GetCurrentWeatherResponse } from './weather-service.types';

@Injectable()
export class WeatherService {
  constructor(@Inject(WEATHER_API_TOKEN) private weatherApi: IWeatherApi) {}

  async getCurrentWeather(city: string): Promise<GetCurrentWeatherResponse> {
    const weatherApiResponse =
      await this.weatherApi.getCurrentForecastForCity(city);

    return {
      humidity: weatherApiResponse.humidity,
      temperature: weatherApiResponse.temperature,
      description: weatherApiResponse.description,
    };
  }
}
