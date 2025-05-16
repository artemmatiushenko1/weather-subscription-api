import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IWeatherApi, WEATHER_API_TOKEN } from './weather-api.interface';
import { GetCurrentWeatherResponse } from './weather-service.types';
import { CityNotFoundException } from './weather-api-impl/city-not-found.exception';

@Injectable()
export class WeatherService {
  constructor(@Inject(WEATHER_API_TOKEN) private weatherApi: IWeatherApi) {}

  async getCurrentWeather(city: string): Promise<GetCurrentWeatherResponse> {
    try {
      const weatherApiResponse =
        await this.weatherApi.getCurrentForecastForCity(city);

      return {
        humidity: weatherApiResponse.humidity,
        temperature: weatherApiResponse.temperature,
        description: weatherApiResponse.description,
      };
    } catch (e: unknown) {
      if (e instanceof CityNotFoundException) {
        throw new NotFoundException(e.message);
      }

      throw e;
    }
  }
}
