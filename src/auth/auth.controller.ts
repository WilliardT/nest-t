import { Body, Controller, HttpCode, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterRequest } from "./dto/register.dto";
import { LoginRequest } from "./dto/login.dto";
import type { Request, Response } from "express";
import {
  ApiBadRequestResponse,
  ApiConflictResponse, ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation, ApiUnauthorizedResponse
} from "@nestjs/swagger";
import { AuthResponse } from "./dto/auth.dto";
import { AUTH_NO_VALID_MESSAGE } from "./constants/constants";


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'Создание аккаунта',
    description: 'Создает новый аккаунт пользователя'
  })
  @ApiOkResponse({ type: AuthResponse })
  @ApiBadRequestResponse({
    description: 'Некорректные входные данные'
  })
  @ApiConflictResponse({
    description: 'Пользователь с такой почтой уже существует'
  })
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(
    @Res({ passthrough: true  }) res: Response, // nest сам преобразовывает ответ
    @Body() dto:RegisterRequest
  ){
    return await this.authService.register(res, dto)
  }


  @ApiOperation({
    summary: 'Вход в систему',
    description: 'Авторизует пользователя и выдает токен доступа'
  })
  @ApiOkResponse({ type: AuthResponse })
  @ApiBadRequestResponse({
    description: 'Некорректные входные данные'
  })
  @ApiNotFoundResponse({
    description: AUTH_NO_VALID_MESSAGE
  })
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Res({ passthrough: true  }) res: Response,
    @Body() dto: LoginRequest
  ){
    return await this.authService.login(res, dto)
  }


  @ApiOperation({
    summary: 'Обновление токена',
    description: 'Генерирует новый токен доступа'
  })
  @ApiOkResponse({ type: AuthResponse })
  @ApiUnauthorizedResponse({
    description: 'Недействительный refresh_token'
  })
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true  }) res: Response,
  ){
    return await this.authService.refresh(req, res)
  }


  @ApiOperation({
    summary: 'Выход из системы',
  })
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(
    @Res({ passthrough: true  }) res: Response,
  ){
    return await this.authService.logout(res)
  }

}
