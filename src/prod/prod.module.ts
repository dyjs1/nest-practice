import { Module, forwardRef } from '@nestjs/common';
import { ProdService } from './prod.service';
import { ProdController } from './prod.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Prod } from './entities/prod.entity';
import { User } from 'src/users/entities/user.entity';
import { UsersModule } from 'src/users/users.module';
import { Category } from 'src/category/entities/cateogry.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Prod, Category]),
    forwardRef(() => UsersModule),
  ],
  controllers: [ProdController],
  providers: [ProdService],
  exports: [ProdService],
})
export class ProdModule {}
