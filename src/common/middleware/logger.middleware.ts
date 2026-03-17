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
    //const startedAt = process.hrtime.bigint();
    const fullUrl = `[${req.protocol}]://${req.get("host")}${req.originalUrl}`;

    this.customLoggerService.log(`Request: [${req.method}] ${fullUrl}`, LoggerMiddleware.name);

    // res.on("finish", () => {
    //   const durationMs = Number(process.hrtime.bigint() - startedAt) / 1_000_000;
    //
    //   this.customLoggerService.log(
    //     `Response: [${req.method}] ${fullUrl} ${res.statusCode} ${durationMs.toFixed(2)}ms`,
    //     LoggerMiddleware.name
    //   );
    // });

    next();
  }
}
