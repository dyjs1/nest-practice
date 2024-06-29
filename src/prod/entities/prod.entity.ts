import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class Prod {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  url: string;

  @Column()
  detail: string;

  @Column()
  info_notice: string;

  @Column()
  category: string;

  @Column({ default: false })
  isSoldOut: boolean;

  @ManyToOne(() => User, (user) => user.username)
  user: User;
}
