import { firstValueFrom } from 'rxjs';
import { IWeatherApi, WeatherForecast } from '../weather-api.interface';
import { CityNotFoundException } from './city-not-found.exception';
import {
  WeatherApiCurrentErrorResponse,
  WeatherApiCurrentResponse,
} from './types';
import { WeatherApiException } from './weather-api.exception';
import { HttpService } from '@nestjs/axios';

const BASE_API_URL = 'http://api.weatherapi.com';

class WeatherApiImpl implements IWeatherApi {
  constructor(
    private apiKey: string,
    private httpService: HttpService,
  ) {}

  getCurrentForecastForCity = async (
    city: string,
  ): Promise<WeatherForecast> => {
    const url = new URL('/v1/current.json', BASE_API_URL);
    url.searchParams.append('key', this.apiKey);
    url.searchParams.append('q', city);
    url.searchParams.append('aqi', 'no');

    // TODO: use HttpService from nest
    const response = await fetch(url);

    if (!response.ok) {
      const data =
        (await response.json()) as unknown as WeatherApiCurrentErrorResponse;

      if (data.error.code === CityNotFoundException.CODE) {
        throw new CityNotFoundException(city);
      } else {
        throw new WeatherApiException(data.error.message);
      }
    }

    // TODO: use json validation schema
    const data =
      (await response.json()) as unknown as WeatherApiCurrentResponse;

    return {
      humidity: data.current.humidity,
      temperature: data.current.humidity,
      description: data.current.condition.text,
    };
  };
}

export { WeatherApiImpl };
