import { IsOptional, IsString, IsUUID, IsInt } from "class-validator";

export class UpdateNotificationDto {
  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsUUID()
  priority?: string;

  @IsOptional()
  @IsInt()
  cooldown?: number;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString()
  sender?: string;

  @IsOptional()
  scheduled_at?: Date;
}
