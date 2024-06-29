import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/cateogry.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}
  createCategory(categoryData: CreateCategoryDto) {
    return this.categoryRepository.save(categoryData);
  }

  getAllCategory(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  //   getCategoryById;

  //   deleteCategory;
}
