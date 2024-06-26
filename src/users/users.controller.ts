import {
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Body,
  ConflictException,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

//라우터 설정
@Controller('users')
export class UsersController {
  constructor(private readonly UsersService: UsersService) {}

  //모든 유저 조회
  @Get()
  getAllUser(): Promise<User[]> {
    return this.UsersService.getAllUser();
  }

  //유저 한명 조회
  @Get(':id')
  getUser(@Param('id') userId: number): Promise<User> {
    return this.UsersService.getUserById(userId);
  }

  //회원가입
  @Post('sign-up')
  async signUpUser(@Body() userData: CreateUserDto) {
    return this.UsersService.signUpUser(userData);
  }

  //로그인
  @Post('/log-in')
  async logIn(@Body() userData: CreateUserDto) {
    return this.UsersService.logInUser(userData);
  }

  //유저 삭제
  @Delete(':id')
  remove(@Param('id') userId: number) {
    return this.UsersService.deleteUser(userId);
  }
}
