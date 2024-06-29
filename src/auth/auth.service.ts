import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { CreateAuthDto } from './dto/create-auth.dto';
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginData: CreateAuthDto): Promise<{ access_token: string }> {
    const { username, password } = loginData;
    const user = await this.usersService.getUserByUsername(username);
    const hashedPassword = user.password;
    //유저가 존재하는지 확인
    if (!user) {
      throw new UnauthorizedException('Invalid username');
    }

    //패스워드 일치하는지 확인
    const isPasswordMatching = await bcrypt.compare(password, hashedPassword);
    if (!isPasswordMatching) {
      throw new UnauthorizedException('Invalid password');
    }

    // 토큰 payload 생성
    const payload = { sub: user.id, username: user.username };
    const token = await this.jwtService.signAsync(payload);
    console.log(token);
    // jwt 토큰 발급
    return {
      access_token: token,
    };
  }
}
