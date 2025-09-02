import { IsOptional, IsString, Matches } from "class-validator";

export class UpdateNotificationPriorityDto {
  @IsOptional()
  @IsString()
  @Matches(/^P(?!$)(\d+Y)?(\d+M)?(\d+D)?(T(\d+H)?(\d+M)?(\d+S)?)?$/, {
    message:
      "threshold must be a valid ISO 8601 duration string (e.g., P1D, PT2H30M)",
  })
  threshold?: string;
}
