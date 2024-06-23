import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  private users: User[] = [];

  getAllUser(): User[] {
    return this.users;
  }

  getUser(id: number): User {
    const user = this.users.find((user) => user.id == id);
    if (!user) {
      throw new NotFoundException(`User with ID : ${id} not found`);
    }
    return user;
  }

  deleteUser(id: number) {
    this.getUser(id);
    this.users = this.users.filter((user) => user.id !== id);
  }

  signUpUser(userData: CreateUserDto) {
    //아이디 중복확인
    const existUser = this.users.find(
      (user) => user.username === userData.username,
    );
    if (existUser) {
      throw new Error(`Username ${userData.username} already exists`);
    }
    this.users.push({
      id: this.users.length + 1,
      ...userData,
    });
  }

  logInUser(userData: CreateUserDto) {
    //아이디 패스워드 검증
    const user = this.users.find(
      (user) =>
        user.username === userData.username &&
        user.password === userData.password,
    );

    if (!user) {
      throw new NotFoundException(`Membe mismatch`);
    }
    return user;
  }
}
