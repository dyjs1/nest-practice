import { IsInt, IsNumber, IsString, IsUrl } from 'class-validator';

export class CreateProdDto {
  @IsString()
  product: string;

  @IsInt()
  price: number;

  @IsUrl()
  url: string;

  @IsString()
  detail: string;

  @IsString({ each: true }) //리스트로 전달
  option: string;

  @IsString()
  info_notice: string;

  @IsString()
  category: string;
}
