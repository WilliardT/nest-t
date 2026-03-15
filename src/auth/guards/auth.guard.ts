import {
  Injectable,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
// import { ExecutionContext } from "@nestjs/common";
// import { GqlExecutionContext } from "@nestjs/graphql";


@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  // getRequest(context: ExecutionContext) {
  //   const ctx = GqlExecutionContext.create(context)
  //   return ctx.getContext().req  // для GraphQL
  // }

  // для REST это автоматически вернёт обычный req
}
