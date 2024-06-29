import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  //카테고리 명
  @IsNotEmpty()
  @IsString()
  name: string;
}
