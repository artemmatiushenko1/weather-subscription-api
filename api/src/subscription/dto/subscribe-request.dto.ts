import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Frequency } from '../domain/frequency';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class SubscribeRequestDto {
  @ApiProperty({
    description: 'Email address to subscribe',
    example: 'user@example.com',
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  @Transform(({ value }: { value: string }) => value.toLowerCase().trim())
  email: string;

  @ApiProperty({
    description: 'City for weather updates',
    example: 'kyiv',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }: { value: string }) => value.toLowerCase().trim())
  city: string;

  @ApiProperty({
    description: 'Frequency of updates (hourly or daily)',
    example: 'daily',
    enum: Frequency,
    required: true,
  })
  @IsEnum(Frequency)
  @IsNotEmpty()
  frequency: Frequency;
}

export { SubscribeRequestDto };
