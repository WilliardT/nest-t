import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";


export class ResponseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>
  ): Observable<any>{

    // GraphQL ожидает чистый массив
    if (context.getType<'http' | 'graphql'>() === 'graphql') {
      return next.handle()
    }

    return next.handle().pipe(
      map((data) => ({
        status: 'OK',
        data
      })),
    );
  }
}
