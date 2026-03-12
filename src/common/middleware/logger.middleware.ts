import { Injectable, NestMiddleware } from "@nestjs/common";
import type { Request, Response, NextFunction } from "express";


@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const fullUrl = `[${req.protocol}]://${req.get("host")}${req.originalUrl}`;

    console.log(`Request: [${req.method}] ${fullUrl}`);

    next();
  }
}
