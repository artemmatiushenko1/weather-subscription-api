import { Controller, Get, Query } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { GetCurrentWeatherDto } from './dto/get-current-weather.dto';

@Controller('weather')
export class WeatherController {
  constructor(private weatherService: WeatherService) {}

  @Get('/')
  async getCurrentWeather(@Query() query: GetCurrentWeatherDto) {
    return this.weatherService.getCurrentWeather(query.city);
  }
}
