import { Weather } from '../domain/weather';

export const WEATHER_API_TOKEN = Symbol('IWeatherApi');

export interface IWeatherApi {
  getCurrentForecastForCity(city: string): Promise<Weather>;
}
