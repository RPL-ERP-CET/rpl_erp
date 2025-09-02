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

  @IsNotEmpty()
  @IsOptional()
  @IsUUID()
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
