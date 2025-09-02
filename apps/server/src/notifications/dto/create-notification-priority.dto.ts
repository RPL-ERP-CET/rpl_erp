import { IsNotEmpty, IsString, Matches } from "class-validator";

export class CreateNotificationPriorityDto {
  @IsNotEmpty()
  @IsString()
  // Optional: enforce ISO-8601 duration (PT5M, P1D, etc.)
  @Matches(/^P(T(?=\d)(\d+H)?(\d+M)?(\d+S)?|(\d+D))$/, {
    message: "Threshold must be a valid ISO 8601 duration (e.g. PT5M, P1D)",
  })
  threshold!: string;
}
