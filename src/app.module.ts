import { Module, forwardRef } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from 'config/configuration';
import { User } from './users/entities/user.entity';
import { ProdModule } from './prod/prod.module';
import { AuthModule } from './auth/auth.module';
import { UsersController } from './users/users.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      // configuration 설정을 coifg module 불러 올 때 로드한다
      isGlobal: true,
      load: [configuration],
    }),
    //typeorm을 비동기적으로 전달하기 위한 처리
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('database.host'),
        username: configService.get('database.user'),
        password: configService.get('database.password'),
        database: configService.get('database.name'),
        entities: [User],
        // synchronize: true, // 아예 설정 xxxxxxxxxxxs
        logging: true,
      }),
    }),
    ProdModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController, UsersController],
  providers: [],
})
export class AppModule {}
