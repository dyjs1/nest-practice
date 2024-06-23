import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString() //유효성 검사
  readonly username: string;

  @IsString()
  readonly password: string;
}
