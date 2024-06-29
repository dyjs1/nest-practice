import {
  IsBoolean,
  IsInt,
  IsNumber,
  IsString,
  IsUrl,
  isString,
} from 'class-validator';
import { User } from 'src/users/entities/user.entity';
import { ManyToOne } from 'typeorm';

export class CreateProdDto {
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
