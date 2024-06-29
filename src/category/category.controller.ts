import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  //상품 등록
  @Post()
  create(@Body() categoryDate: CreateCategoryDto) {
    return this.categoryService.createCategory(categoryDate);
  }
  //상품 조회
  @Get()
  findAll() {
    return this.categoryService.getAllCategory();
  }
  //   //상품 한개만 조회
  //   @Get(':id')
  //   findOne(@Param('id') id: string) {
  //     return this.categoryService.getCategoryById(+id);
  //   }
  //   // //상품 수정
  //   // @Patch(':id')
  //   // update(@Param('id') id: string, @Body() updatecategoryDto: UpdatecategoryDto) {
  //   //   return this.categoryService.update(+id, updatecategoryDto);
  //   // }
  //   // 상품 삭제
  //   @Delete(':id')
  //   remove(@Param('id') id: string) {
  //     return this.categoryService.deleteCategory(+id);
  //   }
}
