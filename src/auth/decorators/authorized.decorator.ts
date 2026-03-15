import { createParamDecorator, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { UserEntity } from "../entities/user.entity";
import type { Request } from "express";

export const AuthorizedDecorator = createParamDecorator(
  (data: keyof UserEntity, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest() as Request

    const user = request.user

    if (!user) {
      throw new UnauthorizedException('Ошибка авторизации');
    }

    return data ? user[data] : user
  }
)
