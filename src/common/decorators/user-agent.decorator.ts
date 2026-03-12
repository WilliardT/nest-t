import { createParamDecorator, type ExecutionContext } from "@nestjs/common";
import type { Request } from "express";


export const UserAgentDecorator = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest() as Request

    return request.headers['user-agent']
  }
)
