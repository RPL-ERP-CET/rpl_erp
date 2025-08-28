import {
  Controller,
  Get,
  Post,
  Param,
  NotFoundException,
  // Request,
} from "@nestjs/common";
import { NotificationsService } from "./notifications.service";
import { NotificationReadReceipt } from "./notification-read-receipt.entity";

@Controller("notifications/:notificationId/read")
export class NotificationReadReceiptsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post()
  create(
    @Param("notificationId") notificationId: string,
    // @Request() req
  ): Promise<NotificationReadReceipt> {
    // const userId = req.user.id;//Can't be used  now since user authentication is not implemented
    //temporary userId
    const userId = "0f64f15e-ba36-400d-bfb8-fd0bc0c5a8a6";
    console.log(`Creating read receipt for user ${userId} `);
    return this.notificationsService.createReadReceipt(notificationId, userId);
  }

  @Get()
  findAll(
    @Param("notificationId") notificationId: string,
  ): Promise<NotificationReadReceipt[]> {
    return this.notificationsService.getReadReceiptsByNotification(
      notificationId,
    );
  }

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<NotificationReadReceipt> {
    const readReceipt = await this.notificationsService.findOneReadReceipt(id);
    if (!readReceipt) {
      throw new NotFoundException(
        `Notification read receipt with ID ${id} not found`,
      );
    }
    return readReceipt;
  }
}
