import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  // private users: User[] = [];
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  getAllUser(): Promise<User[]> {
    // return this.users;
    //dsfdsfs
    return this.usersRepository.find();
  }

  getUser(id: number): Promise<User> {
    return this.usersRepository.findOneBy({ id: id });
  }

  deleteUser(id: number) {
    return this.usersRepository.delete(id);
  }

  signUpUser(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.username = createUserDto.username;
    user.password = createUserDto.password;
    return this.usersRepository.save(user);
  }
}

// logInUser(userData: CreateUserDto) {
//   //아이디 패스워드 검증
//   const user = this.users.find(
//     (user) =>
//       user.username === userData.username &&
//       user.password === userData.password,
//   );

//   if (!user) {
//     throw new NotFoundException(`Membe mismatch`);
//   }
//   return user;
// }
