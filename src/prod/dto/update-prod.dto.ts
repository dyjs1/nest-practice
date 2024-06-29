import { PartialType } from '@nestjs/mapped-types';
import { CreateProdDto } from './create-prod.dto';
import {
  IsBoolean,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

//CreateProdDto 모든 필드값을 선택사항으로 변경하여 재사용
export class UpdateProdDto extends PartialType(CreateProdDto) {
  //가격 이름
  @IsString()
  name: string;

  //상품 가격
  @IsInt()
  price: number;

  //상품 이미지 url
  @IsUrl()
  url: string;

  //상품 상세설명
  @IsString()
  detail: string;

  //상품 옵션
  @IsString({ each: true }) //리스트로 전달
  option: string[];

  //상품 상품정보고시
  @IsString()
  info_notice: string;

  //상품 카테고리
  @IsString()
  category: string;

  //prod가 팔렸는지 여부 기본값: false
  @IsBoolean()
  isSoldOut: boolean;
}
