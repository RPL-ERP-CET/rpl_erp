import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import type { Request } from "express";

export const Cookies = createParamDecorator(
  (
    data: string,
    ctx: ExecutionContext,
  ): string | Record<string, string> | null => {
    const request: Request = ctx.switchToHttp().getRequest();
    if (data === "access")
      return request.headers.authorization?.split(" ")[1]
        ? request.headers.authorization?.split(" ")[1]
        : null;

    return data != ""
      ? request.cookies[data]
        ? (request.cookies[data] as string)
        : null
      : request.cookies;
  },
);
