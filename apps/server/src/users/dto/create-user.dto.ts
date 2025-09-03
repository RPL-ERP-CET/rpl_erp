import { IsEmail, IsString, MinLength } from "class-validator";
import { Role } from "src/roles/entities/role.entity";

export class CreateUserDto {
  @IsEmail()
  declare email: string;

  @IsString()
  @MinLength(8)
  declare password: string;

  roles?: Role[];
}
