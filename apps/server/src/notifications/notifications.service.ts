import { Injectable } from "@nestjs/common";
import { CreateNotificationDto } from "./dto/create-notification.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Notification } from "./notifications.entity";

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
  ) {}
  createNotification(dto: CreateNotificationDto) {
    const notification = this.notificationRepository.create(dto);
    return this.notificationRepository.save(notification);
  }

  async getAllNotifications(): Promise<Notification[]> {
    const notifications = await this.notificationRepository.find();
    return notifications;
  }
}
