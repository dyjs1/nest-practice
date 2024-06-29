import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Category } from 'src/category/entities/cateogry.entity';

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

  @Column({ default: false })
  isSoldOut: boolean;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => User, (user) => user.prods, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Category, (category) => category.prods)
  category: Category;
}
