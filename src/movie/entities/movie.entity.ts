import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { EMovieGenre } from "../constants/constants";
import { ReviewEntity } from "../../review/entities/review.entity";


@Entity({
  name: 'movies'
})
export class MovieEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryColumn()   // первичный ключ без автоинкримента
  @Generated('uuid')
  uuid: string;

  @Column({
    type: 'varchar',
    length: 128,
  })
  title: string;

  @Column({
    type: "text",
    nullable: true,
  })
  description: string

  @Column({
    name: 'release_year',
    type: 'integer',
    unsigned: true // только положительные
  })
  releaseYear: number;

  @Column({
    type: 'decimal',
    precision: 3, // максимальное кол-во символов
    scale: 1,     // сколько чисел после запятой
    default: 0.0
  })
  rating: number;

  @Column({
    name: 'is_available',
    type: 'boolean',
    default: false
  })
  isAvailable: boolean;

  @Column({
    name: 'release_date',
    type: 'date',
    nullable: true
  })
  releaseDate: string;

  @Column({
    type: 'enum',
    enum: EMovieGenre,
    //default: EMovieGenre.DRAMA
    nullable: true
  })
  genre: EMovieGenre

  @OneToMany(
    () => ReviewEntity,
    (review: ReviewEntity) => review.movie
  )
  reviews: ReviewEntity[]

  @CreateDateColumn({
    name: 'created_at'
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at'
  })
  updatedAt: Date;
}
