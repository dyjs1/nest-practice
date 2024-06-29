import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateProdDto } from './dto/create-prod.dto';
import { UpdateProdDto } from './dto/update-prod.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Prod } from './entities/prod.entity';
import { Repository } from 'typeorm';

@Injectable() //해당 클래스가 주입이 가능한 상태로 만들어주는 역할
export class ProdService {
  constructor(
    @InjectRepository(Prod) ///특정 Entity의 Repository를 의존관계로 주입할 때 사용
    private readonly prodRepository: Repository<Prod>,
  ) {}

  async create(newProd: CreateProdDto): Promise<Prod> {
    try {
      const savedProd = await this.prodRepository.save(newProd);
      return savedProd;
    } catch (error) {
      throw new InternalServerErrorException('Prod registeration failed');
    }
  }

  getAllProd(): Promise<Prod[]> {
    return this.prodRepository.find();
  }

  getProdById(id: number): Promise<Prod> {
    return this.prodRepository.findOne({
      where: {
        id,
      },
    });
  }

  // update(id: number, updateData: UpdateProdDto) {
  //   const prod = this.getProdById(id);
  //   this.delete

  // }

  //delete 권한없어서 처리x
  deleteProd(id: number) {
    return `This action removes a #${id} prod`;
  }
}
