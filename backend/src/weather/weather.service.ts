import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  IWeatherApi,
  WEATHER_API_TOKEN,
} from './interfaces/weather-api.interface';
import { CityNotFoundException } from './weather-api-impl/exceptions/city-not-found.exception';
import { Weather } from './domain/weather';

@Injectable()
export class WeatherService {
  constructor(@Inject(WEATHER_API_TOKEN) private weatherApi: IWeatherApi) {}

  async getCurrentWeather(city: string): Promise<Weather> {
    try {
      const weather = await this.weatherApi.current(city);
      return weather;
    } catch (e: unknown) {
      if (e instanceof CityNotFoundException) {
        throw new NotFoundException(e.message);
      }

      throw e;
    }
  }
}
