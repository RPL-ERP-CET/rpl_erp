import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Get,
  Res,
  UnauthorizedException,
  UseGuards,
} from "@nestjs/common";
import type { Response } from "express";

import { SessionService } from "./session.service";
import { SignUpAuthDto } from "./dto/signup-session.dto";
import { User } from "src/users/users.entity";
import { UserDecorator } from "src/common/decorators/user.decorator";
import { Cookies } from "src/common/decorators/cookies.decorator";
import { AuthGuard } from "src/common/guards/auth/auth.guard";

@Controller("auth")
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Post("signup")
  async signUp(
    @Body() signUpAuthDto: SignUpAuthDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { accessToken, refreshToken } =
      await this.sessionService.signUp(signUpAuthDto);

    response.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: true,
    });

    return { accessToken };
  }

  @HttpCode(HttpStatus.OK)
  @Post("signin")
  async signIn(
    @Body() signUpAuthDto: SignUpAuthDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { accessToken, refreshToken } =
      await this.sessionService.signIn(signUpAuthDto);

    response.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: true,
    });

    return { accessToken };
  }

  @UseGuards(AuthGuard)
  @Get("refresh/verify")
  async verifyRefreshToken(
    @Cookies("refresh_token") token: string,
    @UserDecorator("") user: User,
  ) {
    if (!token || !user)
      throw new UnauthorizedException("Invalid refresh token");
    return await this.sessionService.verifyRefreshToken(token, user);
  }

  @Get("access/verify")
  async verifyAccessToken(@Cookies("access") token: string) {
    if (!token) throw new UnauthorizedException("Invalid access token");
    return await this.sessionService.verifyAccessToken(token);
  }

  @Get("refresh")
  @UseGuards(AuthGuard)
  async refreshTokens(
    @Cookies("refresh_token") token: string,
    @UserDecorator("") user: User,
    @Res({ passthrough: true }) response: Response,
  ) {
    if (!token || !user)
      throw new UnauthorizedException("Invalid refresh token");
    const { accessToken, refreshToken } =
      await this.sessionService.refreshTokens(user, token);

    response.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: true,
    });
    return { accessToken };
  }

  @Get("logout")
  @UseGuards(AuthGuard)
  async logout(
    @UserDecorator("") user: User,
    @Cookies("refresh_token") token: string,
  ) {
    if (!token || !user)
      throw new UnauthorizedException("Invalid refresh token");
    await this.sessionService.logout(user, token);
    return { message: "Logged out successfully" };
  }
}
