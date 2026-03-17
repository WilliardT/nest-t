import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { MovieEntity } from "../../movie/entities/movie.entity";


@Entity({
  name: 'reviews'
})
export class ReviewEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
    type: 'uuid'
  })
  @Generated('uuid')
  uuid: string;

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
    name: 'movie_id',
    type: 'integer'
  })
  movieId: number;

  @ManyToOne(
    () => MovieEntity,
    (movie: MovieEntity) => movie.reviews, {
      onDelete: 'CASCADE'
    }
  )
  @JoinColumn({
    name: 'movie_id',
    referencedColumnName: 'id', // явное указание на что ссылаться
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
