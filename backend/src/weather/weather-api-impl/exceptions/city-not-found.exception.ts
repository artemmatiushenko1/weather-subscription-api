import { WeatherApiException } from './weather-api.exception';

export class CityNotFoundException extends WeatherApiException {
  static CODE = 1006;

  constructor(city: string) {
    super(`City ${city} not found`);
  }
}
