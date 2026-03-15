import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "../../auth/entities/user.entity";


@Entity({ name: 'messages' })
export class MessageEntity {

  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'text' })
  text: string

  @Column({ name: 'sender_id', type: 'uuid', nullable: true })
  senderId: string | null

  @ManyToOne(() => UserEntity, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'sender_id' })
  sender: UserEntity | null

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date
}
