import { PartialType } from '@nestjs/mapped-types';
import { CreateProdDto } from './create-prod.dto';
import { IsInt, IsNumber, IsOptional, IsString, IsUrl } from 'class-validator';

//CreateProdDto 모든 필드값을 선택사항으로 변경하여 재사용
export class UpdateProdDto extends PartialType(CreateProdDto) {
  @IsNumber()
  id: number;

  @IsString()
  @IsOptional()
  product: string;

  @IsInt()
  @IsOptional()
  price: number;

  @IsUrl()
  @IsOptional()
  url: string;

  @IsString()
  @IsOptional()
  detail: string;

  @IsString({ each: true }) //리스트로 전달
  @IsOptional()
  option: string;

  @IsString()
  @IsOptional()
  info_notice: string;

  @IsString()
  @IsOptional()
  category: string;
}
