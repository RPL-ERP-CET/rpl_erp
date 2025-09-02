import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsArray,
  IsUUID,
} from "class-validator";

export class CreateRoleDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsNumber()
  priority!: number;

  @IsArray()
  @IsUUID("all", { each: true })
  permissionIds!: string[];
}
