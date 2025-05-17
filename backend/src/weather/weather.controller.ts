import { Controller, Get, Query } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { GetWeatherRequestDto } from './dto/get-weather-request.dto';
import { GetWeatherResponseDto } from './dto/get-weather-response.dto';
import { plainToInstance } from 'class-transformer';

@Controller('weather')
export class WeatherController {
  constructor(private weatherService: WeatherService) {}

  @Get('/')
  async getCurrentWeather(
    @Query() query: GetWeatherRequestDto,
  ): Promise<GetWeatherResponseDto> {
    const weather = await this.weatherService.getCurrentWeather(query.city);
    return plainToInstance(GetWeatherResponseDto, weather);
  }
}
