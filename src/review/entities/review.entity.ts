import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn
} from "typeorm";
import { MovieEntity } from "../../movie/entities/movie.entity";


@Entity({
  name: 'reviews'
})
export class ReviewEntity {
  @PrimaryColumn()   // первичный ключ без автоинкримента
  @Generated('uuid')
  uuid: string

  @Column({
    type: "text",
  })
  text: string

  @Column({
    type: 'decimal',
    precision: 3, // максимальное кол-во символов
    scale: 1,     // сколько чисел после запятой
    default: 0.0
  })
  rating: number;

  @Column({
    name: 'movie_uuid',
    type: 'uuid'
  })
  movieUuid: string;

  @ManyToOne(
    () => MovieEntity,
    (movie: MovieEntity) => movie.reviews, {
      onDelete: 'CASCADE'
    }
  )
  @JoinColumn({
    name: 'movie_uuid',
    referencedColumnName: 'uuid', // явное указание на что ссылаться
  })
  movie: MovieEntity;

  @CreateDateColumn({
    name: 'created_at'
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at'
  })
  updatedAt: Date;
}
