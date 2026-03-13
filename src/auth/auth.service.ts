import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./entities/user.entity";
import { QueryFailedError, Repository } from "typeorm";
import { RegisterRequest } from "./dto/register.dto";


@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ){}

  async register(dto: RegisterRequest): Promise<UserEntity> {
    const { name, email, password } = dto

    try {
      const user: UserEntity = this.userRepository.create({ name, email, password })

      return await this.userRepository.save(user)

    } catch (err) {

      if (err instanceof QueryFailedError && (err as any).code === '23505') {
        throw new ConflictException('Пользователь с такой почтой уже существует')
      }

      throw err
    }
  }

}
