/*
import { Controller, Get, Post, Body, Param } from "@nestjs/common";
import { NotificationsService } from "./notifications.service";
import { NotificationVisibilityRole } from "./notification-visibility-role.entity";
import { CreateNotificationVisibilityRoleDto } from "./dto/create-notification-visibility-role.dto";
import { Role } from "../users/roles.entity";

@Controller("notifications/:notificationId/visibility/roles")
export class NotificationVisibilityRolesController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  async getVisibleRoles(
    @Param("notificationId") notificationId: string,
  ): Promise<Role[]> {
    return this.notificationsService.getNotificationVisibleRoles(
      notificationId,
    );
  }

  @Post()
  async addVisibleRole(
    @Param("notificationId") notificationId: string,
    @Body() createDto: CreateNotificationVisibilityRoleDto,
  ): Promise<NotificationVisibilityRole> {
    return this.notificationsService.addRoleVisibility(
      notificationId,
      createDto,
    );
  }
}
  */
