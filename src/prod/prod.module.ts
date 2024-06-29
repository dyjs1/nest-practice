import { Module } from '@nestjs/common';
import { ProdService } from './prod.service';
import { ProdController } from './prod.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Prod } from './entities/prod.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Prod])],
  controllers: [ProdController],
  providers: [ProdService],
})
export class ProdModule {}
