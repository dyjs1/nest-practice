import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable() //해당 클래스가 주입이 가능한 상태로 만들어주는 역할
export class UsersService {
  // private users: User[] = [];
  constructor(
    @InjectRepository(User) //특정 Entity의 Repository를 의존관계로 주입할 때 사용
    private readonly usersRepository: Repository<User>,
  ) {}

  getAllUser(): Promise<User[]> {
    // return this.users;
    return this.usersRepository.find();
  }

  getUserById(id: number): Promise<User> {
    return this.usersRepository.findOne({
      where: {
        id,
      },
    });
  }

  getUserByUsername(username: string): Promise<User> {
    return this.usersRepository.findOne({
      where: {
        username,
      },
    });
  }
  //delete 처리x
  deleteUser(id: number) {
    return this.usersRepository.delete(id);
  }

  //erorr 캐치 왜못함.....
  async signUpUser(userData: CreateUserDto): Promise<User> {
    try {
      const { username, password } = userData;

      //아이디 중복 검사
      const existingUser = await this.getUserByUsername(username);
      if (existingUser) {
        throw new ConflictException('Existing username'); ///////////이거 왜 에러안잡힘
      }

      //해시화된 패스워드 생성
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = this.usersRepository.create({
        ...userData,
        password: hashedPassword,
      });
      const savedUser = await this.usersRepository.save(newUser);
      //비밀번호를 undefined로 설정하여 반환되지 않도록 함
      savedUser.password = undefined;
      return savedUser;
    } catch (error) {
      throw new InternalServerErrorException('User registration failed');
    }
  }
  /******************************************/
  ///////////* auth폴더에서 처리하기로함 */////////
  //유저가 존재하고 패스워드가 일치하는지 확인====> 지울까 쓸까 ....
  async valiteUser(userData: CreateUserDto): Promise<User> {
    const { username, password } = userData;
    const user = await this.getUserByUsername(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }
  /******************************************/
  ///////////* auth폴더에서 처리하기로함 */////////
  //로그인 -> plainPassword
  async logInUser(userData: CreateUserDto): Promise<User> {
    try {
      const { username, password } = userData;
      const user = await this.getUserByUsername(username);
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
      user.password = undefined; //c 비밀번호를 undefined로 설정하여 반환되지 않도록 함
      return user;
    } catch (error) {
      throw new InternalServerErrorException('Authentication failed - login');
    }
  }
}
