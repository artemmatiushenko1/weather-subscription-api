import { IWeatherApi } from '../interfaces/weather-api.interface';
import { CityNotFoundException } from './exceptions/city-not-found.exception';
import { WeatherApiException } from './exceptions/weather-api.exception';
import { Weather } from '../domain/weather';
import {
  weatherApiCurrentErrorSchema,
  weatherApiCurrentSchema,
} from './weather-api.validation';

const BASE_API_URL = 'http://api.weatherapi.com';

class WeatherApiImpl implements IWeatherApi {
  constructor(private readonly apiKey: string) {}

  current = async (city: string): Promise<Weather> => {
    const url = new URL('/v1/current.json', BASE_API_URL);
    url.searchParams.append('key', this.apiKey);
    url.searchParams.append('q', city);
    url.searchParams.append('aqi', 'no');

    const response = await fetch(url);

    if (!response.ok) {
      const data = weatherApiCurrentErrorSchema.parse(await response.json());
      if (data.error.code === CityNotFoundException.CODE) {
        throw new CityNotFoundException(city);
      } else {
        throw new WeatherApiException(data.error.message);
      }
    }

    const data = weatherApiCurrentSchema.parse(await response.json());
    const weather = new Weather();
    weather.description = data.current.condition.text;
    weather.humidity = data.current.humidity;
    weather.temperature = data.current.temp_c;

    return weather;
  };
}

export { WeatherApiImpl };
