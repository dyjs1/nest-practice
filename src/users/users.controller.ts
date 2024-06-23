import { Controller, Get, Param, Post, Delete, Body } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

//라우터 설정
@Controller('users')
export class UsersController {
  constructor(private readonly UsersService: UsersService) {}

  //모든 유저 조회
  @Get()
  getAllUser(): User[] {
    return this.UsersService.getAllUser();
  }

  //유저 한명 조회
  @Get(':id')
  getOne(@Param('id') userId: number): User {
    return this.UsersService.getUser(userId);
  }

  //회원가입
  @Post('sign-up')
  signUp(@Body() userData: CreateUserDto) {
    return this.UsersService.signUpUser(userData);
  }

  //로그인
  @Post('/log-in')
  logIn(@Body() userData: CreateUserDto) {
    return this.UsersService.logInUser(userData);
  }

  //유저 삭제
  @Delete(':id')
  remove(@Param('id') userId: number) {
    return this.UsersService.deleteUser(userId);
  }
}
