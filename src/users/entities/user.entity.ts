import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


@Entity({
  name: 'users'
})
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  // опционально
  @Column({ nullable: true })
  bio?: string;

  // @Column({ nullable: true })
  // userType: EUserType[];
  @Column('simple-array', { nullable: true })
  userType: string[];
}
