export type WeatherForecast = {
  humidity: number;
  description: string;
  temperature: number;
};

export const WEATHER_API_TOKEN = Symbol('IWeatherApi');

export interface IWeatherApi {
  getCurrentForecastForCity(city: string): Promise<WeatherForecast>;
}
