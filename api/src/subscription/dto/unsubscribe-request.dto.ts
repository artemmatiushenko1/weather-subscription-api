import { IsNotEmpty, IsString } from 'class-validator';

class UnsubscribeRequestDto {
  @IsString()
  @IsNotEmpty()
  token: string;
}

export { UnsubscribeRequestDto };
