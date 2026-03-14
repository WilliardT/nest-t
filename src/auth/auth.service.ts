import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./entities/user.entity";
import { QueryFailedError, Repository } from "typeorm";
import { RegisterRequest } from "./dto/register.dto";
import { PgErrorCode } from "../common/constants/pg-error-codes";
import { hash, verify } from "argon2";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import type { IAuthResponse, IAuthTokens, IJwtPayload } from "./interfaces/jwt.interface";
import { LoginRequest } from "./dto/login.dto";
import type { Request, Response } from "express"
import ms from "ms"
import { isDev } from "../utils/is-dev.util";
import { AUTH_NO_VALID_MESSAGE } from "./constants/constants";


@Injectable()
export class AuthService {
  private readonly JWT_ACCESS_TOKEN_TTL: string
  private readonly JWT_REFRESH_TOKEN_TTL: string
  private readonly COOKIE_DOMAIN: string

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService
  ){
    this.JWT_ACCESS_TOKEN_TTL = configService.getOrThrow<string>('JWT_ACCESS_TOKEN_TTL');
    this.JWT_REFRESH_TOKEN_TTL = configService.getOrThrow<string>('JWT_REFRESH_TOKEN_TTL');
    this.COOKIE_DOMAIN = configService.getOrThrow<string>('COOKIE_DOMAIN');
  }

  private generateTokens(id: string): IAuthTokens {
    const payload: IJwtPayload = { id }

    const accessToken: string = this.jwtService.sign(payload, {
      expiresIn: this.JWT_ACCESS_TOKEN_TTL as never // обойти конфликт брендированных типов ms в @nestjs/jwt
    })

    const refreshToken: string = this.jwtService.sign(payload, {
      expiresIn: this.JWT_REFRESH_TOKEN_TTL as never
    })

    return {
      accessToken,
      refreshToken
    }
  }

  private auth(res: Response, id: string): IAuthResponse {
    const { accessToken, refreshToken } = this.generateTokens(id)

    this.setCookie(
      res,
      refreshToken,
      new Date(Date.now() + ms(this.JWT_REFRESH_TOKEN_TTL as never))
    )

    return { accessToken }
  }

  private setCookie(
    res: Response,
    value: string,
    expires: Date
  ) {
    res.cookie('refreshToken', value, {
      httpOnly: true,
      domain: this.COOKIE_DOMAIN,
      expires: expires,
      secure: !isDev(this.configService), // http || https
      sameSite: isDev(this.configService) ? 'none' : 'lax',
    })
  }

  async validate(id: string) {
    const user = await this.userRepository.findOne({
      where: {
        id
      }
    })

    if (!user) {
      throw new NotFoundException(AUTH_NO_VALID_MESSAGE)
    }

    return user
  }

  async register(res: Response, dto: RegisterRequest): Promise<IAuthResponse> {
    const { name, email, password } = dto

    try {
      const user: UserEntity = this.userRepository.create({
        name,
        email,
        password: await hash(password)
      })

      await this.userRepository.save(user)

      return this.auth(res, user.id)

    } catch (err) {

      if (err instanceof QueryFailedError && err.driverError.code === PgErrorCode.UniqueViolation) {
        throw new ConflictException('Пользователь с такой почтой уже существует')
      }

      throw err
    }
  }

  async login(res: Response, dto: LoginRequest): Promise<IAuthResponse> {
    const { email, password } = dto

    const user = await this.userRepository.findOne({
      where: {
        email: email
      },
      select: {
        id: true,
        password: true
      }
    })

    if (!user) {
      throw new NotFoundException(AUTH_NO_VALID_MESSAGE)
    }

    const isValidPassword = await verify(user.password, password)

    if (!isValidPassword) {
      throw new NotFoundException(AUTH_NO_VALID_MESSAGE)
    }

    return this.auth(res, user.id)
  }

  async refresh(req: Request, res: Response) {
    const refreshToken = req.cookies['refreshToken']

    if (!refreshToken) {
      throw new UnauthorizedException(' Недействительный refreshToken')
    }

    const payload: IJwtPayload = await this.jwtService.verifyAsync(refreshToken)

    if (payload) {
      const user = await this.userRepository.findOne({
        where: {
          id: payload.id
        },
        select: {
          id: true
        }
      })

      if (!user) {
        throw new NotFoundException('Пользователь не найден')
      }

      return this.auth(res, user.id)
    }
  }

  async logout(res: Response) {
    this.setCookie(res, 'refreshToken', new Date(0))

    return true
  }

}
