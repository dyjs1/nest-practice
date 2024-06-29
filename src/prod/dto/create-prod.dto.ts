import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
  isNumber,
} from 'class-validator';

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

  //prod가 팔렸는지 여부 기본값: false
  @IsBoolean()
  isSoldOut: boolean;

  //유저 Id
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  //상품 카테고리
  @IsNotEmpty()
  @IsString()
  categoryName: string;
}
