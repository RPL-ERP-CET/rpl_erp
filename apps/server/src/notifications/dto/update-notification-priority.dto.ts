import { IsOptional, IsString, Matches } from "class-validator";

export class UpdateNotificationPriorityDto {
  @IsOptional()
  @IsString()
  @Matches(/^P(T(?=\d)(\d+H)?(\d+M)?(\d+S)?|(\d+D))$/, {
    message: "Threshold must be a valid ISO 8601 duration (e.g. PT5M, P1D)",
  })
  threshold?: string;
}
