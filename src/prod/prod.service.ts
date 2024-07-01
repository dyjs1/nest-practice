import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateProdDto } from './dto/create-prod.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Prod } from './entities/prod.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { Category } from 'src/category/entities/cateogry.entity';

@Injectable() //해당 클래스가 주입이 가능한 상태로 만들어주는 역할
export class ProdService {
  constructor(
    @InjectRepository(Prod) ///특정 Entity의 Repository를 의존관계로 주입할 때 사용
    private readonly prodRepository: Repository<Prod>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    private readonly usersService: UsersService,
  ) {}

  //상품생성
  async createProd(createProdDto: CreateProdDto): Promise<Prod> {
    const { userId, categoryName, ...prodData } = createProdDto;

    //user id를 사용해서 유저의 정보를 가져옴
    const user = await this.usersService.getUserById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    //category name을 사용하여 해당 카테고리를 데이터베이스에서 찾음
    let category = await this.categoryRepository.findOne({
      where: { name: categoryName },
    });

    // 만약 찾으려는 카테고리가 없으면, 새로운 카테고리를 생성
    if (!category) {
      category = this.categoryRepository.create({ name: categoryName });
      await this.categoryRepository.save(category);
    }
    //상품 엔티티를 생성
    const prod = this.prodRepository.create({ ...prodData, user, category });

    try {
      //생성된 상품을 db에 저장하고 저장된 상품을 return
      const savedProd = await this.prodRepository.save(prod);
      return savedProd;
    } catch (error) {
      throw new InternalServerErrorException('Prod registration failed');
    }
  }

  getAllProd(): Promise<Prod[]> {
    return this.prodRepository.find({ relations: ['user', 'category'] });
  }

  getProdById(id: number): Promise<Prod> {
    return this.prodRepository.findOne({
      where: {
        id,
      },
      relations: ['user', 'category'],
    });
  }

  getProdsByCategory(categoryId: number): Promise<Prod[]> {
    return this.prodRepository.find({
      where: { category: { id: categoryId } },
      relations: ['category'],
    });
  }

  //delete 처리x
  deleteProd(id: number) {
    return `This action removes a #${id} prod`;
  }
}
