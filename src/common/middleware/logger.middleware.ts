import { Injectable, NestMiddleware } from "@nestjs/common";
import type { Request, Response, NextFunction } from "express";
import { CustomLoggerService } from "../logger/logger.service";


@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(
    private customLoggerService: CustomLoggerService
  ) {}

  use(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const fullUrl = `[${req.protocol}]://${req.get("host")}${req.originalUrl}`;

    this.customLoggerService.log(`Request: [${req.method}] ${fullUrl}`, LoggerMiddleware.name);

    next();
  }
}
