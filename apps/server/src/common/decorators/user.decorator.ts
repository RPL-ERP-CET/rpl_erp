import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { Request } from "express";
import { User } from "src/users/users.entity";

export const UserDecorator = createParamDecorator(
  (data: string, ctx: ExecutionContext): string | User | null => {
    const request: Request = ctx.switchToHttp().getRequest();
    if (!request.user) return null;
    return data != ""
      ? request.user[data]
        ? (request.user[data] as string)
        : null
      : request.user;
  },
);
