import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";
import { Request, Response } from "express";
import type { ExceptionResponse } from "src/common/types/exception.d";

type NestHttpExceptionResponse = {
  statusCode: number;
  message: string | string[];
  error: string;
};

const isNestHttpExceptionResponse = (
  obj: unknown,
): obj is NestHttpExceptionResponse => {
  return typeof obj === "object" && obj !== null && "message" in obj;
};

@Catch()
export class CatchEverythingFilter implements ExceptionFilter {
  private readonly logger = new Logger(CatchEverythingFilter.name);

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const request: Request = ctx.getRequest();
    const response: Response = ctx.getResponse();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const instanceUrl = httpAdapter.getRequestUrl(request) as URL;

    const responseBody: ExceptionResponse = {
      status: httpStatus,
      type: "about:blank",
      instance: instanceUrl,
      title: "An unexpected error occurred",
      detail: "An internal server error has occurred.",
    };

    if (exception instanceof HttpException) {
      const exceptionResponse = exception.getResponse();

      if (isNestHttpExceptionResponse(exceptionResponse)) {
        responseBody.title = exceptionResponse.error || exception.message;
        const message = exceptionResponse.message;
        responseBody.detail = Array.isArray(message)
          ? message.join(", ")
          : String(message);
      } else if (typeof exceptionResponse === "string") {
        responseBody.title = exception.message;
        responseBody.detail = exceptionResponse;
      }
    } else if (exception instanceof Error) {
      responseBody.title = "Internal Server Error";
      responseBody.detail = exception.message;
      this.logger.error(exception.stack);
    } else {
      this.logger.error("Caught a non-error exception:", exception);
    }

    httpAdapter.reply(response, responseBody, httpStatus);
  }
}
