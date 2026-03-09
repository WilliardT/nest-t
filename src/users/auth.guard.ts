import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from '@nestjs/common';
import {Observable} from "rxjs";


@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const authHeaders = request.headers['authorization'];

    // todo
    if (authHeaders === 'secret-token') {
      return true;

    } else {
      throw new UnauthorizedException('Ошибка авторизации ');
    }
  }
}
