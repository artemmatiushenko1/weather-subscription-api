import { Controller, Get, Query } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { GetWeatherRequestDto } from './dto/get-weather-request.dto';
import { GetWeatherResponseDto } from './dto/get-weather-response.dto';
import { plainToInstance } from 'class-transformer';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';

@Controller('weather')
export class WeatherController {
  constructor(private weatherService: WeatherService) {}

  @Get('/')
  @ApiOperation({
    summary: 'Get current weather for a city',
    description:
      'Returns the current weather forecast for the specified city using WeatherAPI.com.',
  })
  @ApiQuery({
    name: 'city',
    description: 'City name for weather forecast',
    required: true,
    type: 'string',
  })
  @ApiResponse({
    status: 200,
    description: 'Successful operation - current weather forecast returned',
    type: GetWeatherResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid request',
  })
  @ApiResponse({
    status: 404,
    description: 'City not found',
  })
  async getCurrentWeather(
    @Query() query: GetWeatherRequestDto,
  ): Promise<GetWeatherResponseDto> {
    const weather = await this.weatherService.getCurrentWeather(query.city);
    return plainToInstance(GetWeatherResponseDto, weather);
  }
}
