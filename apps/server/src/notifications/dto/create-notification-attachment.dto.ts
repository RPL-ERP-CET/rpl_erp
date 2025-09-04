import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateNotificationAttachmentDto {
  @IsUUID()
  @IsString()
  @IsNotEmpty()
  document_id!: string;
}
