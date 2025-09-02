import { IsOptional, IsString, IsUUID, IsInt } from "class-validator";
import { NotificationPriority } from "../notification-priority.entity";

export class UpdateNotificationDto {
  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsUUID()
  priority?: NotificationPriority;

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
