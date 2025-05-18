import { ApiProperty } from '@nestjs/swagger';
import { Frequency } from './frequency';

class Subscription {
  id: string;

  @ApiProperty({
    description: 'Email address',
    example: 'user@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'City for weather updates',
    example: 'Kyiv',
  })
  city: string;

  @ApiProperty({
    description: 'Frequency of updates',
    example: 'daily',
    enum: Frequency,
  })
  frequency: Frequency;

  @ApiProperty({
    description: 'Whether the subscription is confirmed',
    example: true,
  })
  confirmed: boolean;
}

export { Subscription };
