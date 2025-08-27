import { Module } from "@nestjs/common";
import { NotificationsService } from "./notifications.service";
import { NotificationsController } from "./notifications.controller";
import { NotificationVisibilityUsersController } from "./notification-visibility-users.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Notification } from "./notifications.entity";
import { NotificationVisibilityUser } from "./notification-visibility-user.entity";
import { User } from "../users/users.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Notification, NotificationVisibilityUser, User]),
  ],
  controllers: [NotificationsController, NotificationVisibilityUsersController],
  providers: [NotificationsService],
})
export class NotificationsModule {}
