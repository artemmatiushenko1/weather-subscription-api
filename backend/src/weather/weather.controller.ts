import { Controller, Get, Query } from '@nestjs/common';
import { WeatherService } from './weather.service';

@Controller('weather')
export class WeatherController {
  constructor(private weatherService: WeatherService) {}

  // TODO: throw 400 if city is empty, use pipe
  @Get('/')
  async getCurrentWeather(@Query('city') city: string) {
    console.log(city);
    return this.weatherService.getCurrentWeather(city);
  }
}
