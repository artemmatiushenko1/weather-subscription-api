import { IsNotEmpty, IsString } from 'class-validator';

class ConfirmRequestDto {
  @IsString()
  @IsNotEmpty()
  token: string;
}

export { ConfirmRequestDto };
