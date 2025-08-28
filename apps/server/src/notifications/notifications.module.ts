import { Module } from "@nestjs/common";
import { NotificationsService } from "./notifications.service";
import { NotificationsController } from "./notifications.controller";
import { NotificationVisibilityUsersController } from "./notification-visibility-users.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Notification } from "./notifications.entity";
import { NotificationVisibilityUser } from "./notification-visibility-user.entity";
import { NotificationReadReceipt } from "./notification-read-receipt.entity";
import { User } from "../users/users.entity";
import { NotificationReadReceiptsController } from "./notification-read-receipts.controller";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Notification,
      NotificationVisibilityUser,
      NotificationReadReceipt,
      User,
    ]),
  ],
  controllers: [
    NotificationsController,
    NotificationVisibilityUsersController,
    NotificationReadReceiptsController,
  ],
  providers: [NotificationsService],
})
export class NotificationsModule {}
