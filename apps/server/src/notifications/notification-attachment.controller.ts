/*
import { Controller, Get, Post, Body, Param, HttpCode, HttpStatus } from "@nestjs/common";
import { NotificationsService } from "./notifications.service";
import { CreateNotificationAttachmentDto } from "./dto/create-notification-attachment.dto";
import { NotificationAttachment } from "./notification-attachment.entity";
import { Document } from "../document/document.entity";

@Controller("notifications/:notificationId/attachments")
export class NotificationAttachmentsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  async getAttachments(
    @Param("notificationId") notificationId: string,
  ): Promise<
    {
      id: string;
      type: string;
      title: string;
      created_by: string;
      created_at: string;
      updated_at: string;
    }[]
  > {
    const documents = await this.notificationsService.getNotificationAttachments(
      notificationId,
    );
    
    return documents.map((doc) => ({
      id: doc.id,
      type: doc.type, 
      title: doc.title,
      created_by: doc.created_by, 
      created_at: doc.created_at, 
      updated_at: doc.updated_at, 
    }));
  }

  @Post()
  async addAttachment(
    @Param("notificationId") notificationId: string,
    @Body() createDto: CreateNotificationAttachmentDto,
  ): Promise<NotificationAttachment> {
    return this.notificationsService.addAttachmentToNotification(
      notificationId,
      createDto,
    );
  }
}
*/
