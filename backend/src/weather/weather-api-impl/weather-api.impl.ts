import { IWeatherApi, WeatherForecast } from '../weather-api.interface';
import { WeatherApiCurrentResponse } from './types';

const BASE_API_URL = 'http://api.weatherapi.com';

class WeatherApiImpl implements IWeatherApi {
  constructor(private apiKey: string) {}

  getCurrentForecastForCity = async (
    city: string,
  ): Promise<WeatherForecast> => {
    const url = new URL('/v1/current.json', BASE_API_URL);
    url.searchParams.append('key', this.apiKey);
    url.searchParams.append('q', city);
    url.searchParams.append('aqi', 'no');

    // TODO: inject http client
    const response = await fetch(url);
    console.log(url);
    // if (!response.ok) {
    //   throw new Error('Failed to fetch weather data');
    // }

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
