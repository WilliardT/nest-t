import {
  type CanActivate,
  type ExecutionContext,
  Injectable,
  UnauthorizedException
} from "@nestjs/common";
import { Observable } from "rxjs";
import type { Request } from "express";


@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest() as Request

    const token = request.header['authorization']

    if (!token || !token.startsWith('Bearer ')) {
      throw new UnauthorizedException('Вы не авторизованны');
    }

    return true;

  }
}
