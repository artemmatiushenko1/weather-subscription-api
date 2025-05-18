import { ApiProperty } from '@nestjs/swagger';

class Weather {
  @ApiProperty({
    description: 'Current temperature',
    example: 22,
  })
  humidity: number;

  @ApiProperty({
    description: 'Current humidity percentage',
    example: 60,
  })
  description: string;

  @ApiProperty({
    description: 'Weather description',
    example: 'Partly cloudy',
  })
  temperature: number;
}

export { Weather };
