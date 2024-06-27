import { IsString } from 'class-validator';
//데이터 구조 정의 및 검증
export class CreateAuthDto {
  @IsString() //유효성 검사
  readonly username: string;

  @IsString()
  readonly password: string;
}
