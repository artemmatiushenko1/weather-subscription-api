import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Frequency } from '../domain/frequency';
import { Transform } from 'class-transformer';

class SubscribeRequestDto {
  @IsEmail()
  @IsNotEmpty()
  @Transform(({ value }: { value: string }) => value.toLowerCase().trim())
  email: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }: { value: string }) => value.toLowerCase().trim())
  city: string;

  @IsEnum(Frequency)
  @IsNotEmpty()
  frequency: Frequency;
}

export { SubscribeRequestDto };
