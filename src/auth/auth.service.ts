import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./entities/user.entity";
import { QueryFailedError, Repository } from "typeorm";
import { RegisterRequest } from "./dto/register.dto";
import { PgErrorCode } from "../common/constants/pg-error-codes";
import { hash } from "argon2";


@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ){}

  async register(dto: RegisterRequest): Promise<UserEntity> {
    const { name, email, password } = dto

    try {
      const user: UserEntity = this.userRepository.create({
        name,
        email,
        password: await hash(password)
      })

      return await this.userRepository.save(user)

    } catch (err) {

      if (err instanceof QueryFailedError && err.driverError.code === PgErrorCode.UniqueViolation) {
        throw new ConflictException('Пользователь с такой почтой уже существует')
      }

      throw err
    }
  }

}
