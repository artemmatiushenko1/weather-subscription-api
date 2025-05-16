export type WeatherForecast = {
  humidity: number;
  description: string;
  temperature: number;
};

export interface IWeatherApi {
  getCurrentForecastForCity(city: string): Promise<WeatherForecast>;
}
