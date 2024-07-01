import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ProdService } from './prod.service';
import { CreateProdDto } from './dto/create-prod.dto';

//라우터 설정
@Controller('prod')
export class ProdController {
  constructor(private readonly prodService: ProdService) {}
  //상품 등록
  @Post()
  createProd(@Body() prodData: CreateProdDto) {
    return this.prodService.createProd(prodData);
  }
  //상품 조회
  @Get()
  getAllProd() {
    return this.prodService.getAllProd();
  }
  //카테고리별 상품 조회
  @Get('category/:categoryId')
  getProdsByCategory(@Param('categoryId') categoryId: string) {
    return this.prodService.getProdsByCategory(+categoryId);
  }

  //상품 한개만 조회
  @Get(':id')
  getProdById(@Param('id') id: string) {
    return this.prodService.getProdById(+id);
  }

  // 상품 삭제
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.prodService.deleteProd(+id);
  }

  // //상품 수정
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateProdDto: UpdateProdDto) {
  //   return this.prodService.update(+id, updateProdDto);
  // }
}
