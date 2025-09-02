import {
  IsNotEmpty,
  IsString,
  // IsUUID,
  IsOptional,
  IsInt,
  IsUUID,
} from "class-validator";

export class CreateNotificationDto {
  @IsNotEmpty()
  @IsString()
  declare content: string;

  @IsOptional()
  @IsUUID("4", { message: "priority must be a valid UUID" })
  declare priority?: string;

  @IsOptional()
  @IsInt()
  declare cooldown?: number;

  @IsNotEmpty()
  @IsString()
  declare category: string;

  @IsNotEmpty()
  @IsString()
  declare sender: string;

  @IsOptional()
  declare scheduled_at?: Date;
}
