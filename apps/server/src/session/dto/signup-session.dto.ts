import { IsEmail, MinLength } from "class-validator";

export class SignUpAuthDto {
  @IsEmail()
  email!: string;

  @MinLength(8)
  password!: string;
}
