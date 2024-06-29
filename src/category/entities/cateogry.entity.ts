import { Prod } from 'src/prod/entities/prod.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Prod, (prod) => prod.category)
  prods: Prod[];
}
