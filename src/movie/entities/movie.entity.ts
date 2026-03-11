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

  @CreateDateColumn({
    name: 'created_at'
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at'
  })
  updatedAt: Date;
}
