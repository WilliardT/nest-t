import {
  Column,
  CreateDateColumn,
  Entity,
  Generated, ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { MovieEntity } from "../../movie/entities/movie.entity";


@Entity({
  name: 'actors'
})
export class ActorEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true, // UNIQUE constraint на столбец в PostgreSQL - обязательным условием для foreign key
    type: 'uuid'
  })
  @Generated('uuid')
  uuid: string;

  @Column({
    type: 'varchar',
    length: 64
  })
  name: string;

  @ManyToMany(() => MovieEntity, (movie: MovieEntity): ActorEntity[] => movie.actors)
  movies: MovieEntity[]

  @CreateDateColumn({
    name: 'created_at'
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at'
  })
  updatedAt: Date;

}
