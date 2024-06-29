import {
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Body,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from 'src/auth/auth.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { Public } from './public.decorator';

//라우터 설정
@Controller('users')
export class UsersController {
  constructor(
    private readonly UsersService: UsersService,
    private readonly authService: AuthService, // AuthService 주입
  ) {}

  //모든 유저 조회
  @Get()
  getAllUser(): Promise<User[]> {
    return this.UsersService.getAllUser();
  }

  //access token이 있어야만 접근이 가능하도록 보호
  @UseGuards(AuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    return req.user;
  }

  //유저 한명 조회
  @Get(':id')
  getUser(@Param('id') userId: number): Promise<User> {
    return this.UsersService.getUserById(userId);
  }

  //회원가입
  @Public()
  @Post('sign-up')
  async signUpUser(@Body() userData: CreateUserDto) {
    return this.UsersService.signUpUser(userData);
  }

  //로그인 --> authService에 만든 login으로 넘어감
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('log-in')
  async logIn(@Body() userData: CreateUserDto) {
    return this.authService.login(userData);
  }

  //유저 삭제
  @Delete(':id')
  remove(@Param('id') userId: number) {
    return this.UsersService.deleteUser(userId);
  }
}
