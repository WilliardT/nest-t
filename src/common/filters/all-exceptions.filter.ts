import {
  type ArgumentsHost,
  Catch,
  type ExceptionFilter,
  HttpException,
  Logger
} from "@nestjs/common";
import type { Response } from "express";


// сработает при ошибке
@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionFilter.name)

  catch(exception: unknown, host: ArgumentsHost): any {
    const ctx = host.switchToHttp()

    const response = ctx.getResponse() as Response

    const status = exception instanceof HttpException
      ? exception.getStatus()
      : 500

    const message = exception instanceof HttpException
      ? exception.message
      : 'Internal server error'


    this.logger.error(message, exception)

    response.status(status).json({
      status,
      message,
      timestamp: new Date().toISOString(),
      path: ctx.getRequest().url
    })

  }
}
