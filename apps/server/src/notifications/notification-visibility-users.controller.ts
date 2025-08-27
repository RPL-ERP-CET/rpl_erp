import { Controller, Get, Post, Body, Param } from "@nestjs/common";
import { NotificationVisibilityUser } from "./notification-visibility-user.entity";
import { CreateNotificationVisibilityUserDto } from "./dto/create-notification-visibility-user.dto";
import { NotificationsService } from "./notifications.service";
import { User } from "../users/users.entity";

@Controller("notifications/:notificationId/visibility/users")
export class NotificationVisibilityUsersController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  async getVisibleUsers(
    @Param("notificationId") notificationId: string,
  ): Promise<User[]> {
    return this.notificationsService.getNotificationVisibleUsers(
      notificationId,
    );
  }

  @Post()
  async addVisibleUser(
    @Param("notificationId") notificationId: string,
    @Body() createDto: CreateNotificationVisibilityUserDto,
  ): Promise<NotificationVisibilityUser> {
    return this.notificationsService.addUserVisibility(
      notificationId,
      createDto,
    );
  }
}
