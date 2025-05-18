import { Weather } from '../domain/weather';

export const WEATHER_API_TOKEN = Symbol('IWeatherApi');

export interface IWeatherApi {
  current(city: string): Promise<Weather>;
}
