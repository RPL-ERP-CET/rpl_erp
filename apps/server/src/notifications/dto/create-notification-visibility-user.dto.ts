import { IsNotEmpty, IsUUID } from "class-validator";

export class CreateNotificationVisibilityUserDto {
  @IsNotEmpty()
  @IsUUID()
  declare user_id: string;
}
