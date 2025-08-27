import { Controller, Get, Post, Body } from "@nestjs/common";
import { NotificationsService } from "./notifications.service";
import { CreateNotificationDto } from "./dto/create-notification.dto";

@Controller("notifications")
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post()
  createNotification(@Body() dto: CreateNotificationDto) {
    //TODO: filter by category and unread
    return this.notificationsService.createNotification(dto);
  }

  @Get()
  getAllNotifications() {
    return this.notificationsService.getAllNotifications();
  }
}
