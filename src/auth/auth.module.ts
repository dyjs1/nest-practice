import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';
import { AuthGuard } from './auth.guard';
dotenv.config();
@Module({
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('database.jwt_secret'), /////이부분 다시체크
        signOptions: {
          expiresIn: '2d',
        },
      }),
    }),
  ],
  providers: [AuthService, AuthGuard], //여기에 JwtService 추가 xxx --> 새 인스턴스 생성으로 오류
  exports: [AuthService, AuthGuard, JwtModule],
})
export class AuthModule {}
