import { Controller, Post, Body, HttpCode, HttpStatus } from "@nestjs/common";
import { SessionService } from "./session.service";
import { SignUpAuthDto } from "./dto/signup-session.dto";

@Controller("auth")
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Post("signup")
  signUp(@Body() signUpAuthDto: SignUpAuthDto) {
    return this.sessionService.signUp(signUpAuthDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post("signin")
  signin(@Body() signUpAuthDto: SignUpAuthDto) {
    return this.sessionService.signIn(signUpAuthDto);
  }
}
