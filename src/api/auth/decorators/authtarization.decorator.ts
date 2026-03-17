import { applyDecorators, UseGuards } from "@nestjs/common";
import { JwtGuard } from "../guards/auth.guard";


export function AuthorizationDecorator() {
  return applyDecorators(UseGuards(JwtGuard))
}
