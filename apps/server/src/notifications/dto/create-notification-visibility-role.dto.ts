import { IsNotEmpty, IsUUID } from "class-validator";

export class CreateNotificationVisibilityRoleDto {
  @IsNotEmpty()
  @IsUUID()
  declare role_id: string;
}
