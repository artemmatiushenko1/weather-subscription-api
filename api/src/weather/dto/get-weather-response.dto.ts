import { ApiProperty } from '@nestjs/swagger';

class GetWeatherResponseDto {
  @ApiProperty({
    description: 'Current humidity percentage',
    example: 60,
  })
  humidity: number;

  @ApiProperty({
    description: 'Weather description',
    example: 'Partly cloudy',
  })
  description: string;

  @ApiProperty({
    description: 'Current temperature',
    example: 22,
  })
  temperature: number;
}

export { GetWeatherResponseDto };
