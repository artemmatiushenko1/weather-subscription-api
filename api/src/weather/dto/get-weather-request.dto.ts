import { IsNotEmpty, IsString } from 'class-validator';

export class GetWeatherRequestDto {
  @IsNotEmpty({ message: 'City is required' })
  @IsString({ message: 'City must be a string' })
  city: string;
}
