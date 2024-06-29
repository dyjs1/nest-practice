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
    const user = await this.usersService.getUserById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    let category = await this.categoryRepository.findOne({
      where: { name: categoryName },
    });

    if (!category) {
      category = this.categoryRepository.create({ name: categoryName });
      await this.categoryRepository.save(category);
    }

    const prod = this.prodRepository.create({ ...prodData, user, category });

    try {
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
      relations: ['user'],
    });
  }

  // update(id: number, updateData: UpdateProdDto) {
  //   const prod = this.getProdById(id);
  //   this.delete

  // }

  //delete 처리x
  deleteProd(id: number) {
    return `This action removes a #${id} prod`;
  }
}
