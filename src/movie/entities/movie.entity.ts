import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";


@Entity({
  name: 'movies'
})
export class MovieEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryColumn()   // первичный ключ без автоинкримента
  @Generated('uuid')
  uuid: string;

  @Column()
  title: string;

  @Column()
  releaseYear: number;

  @Column({ default: false })
  isPublic: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
