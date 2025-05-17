import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Frequency } from '../domain/frequency';

class SubscribeRequestDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsEnum(Frequency)
  @IsNotEmpty()
  frequency: Frequency;
}

export { SubscribeRequestDto };
