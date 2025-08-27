import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateNotificationDto } from "./dto/create-notification.dto";
import { CreateNotificationVisibilityUserDto } from "./dto/create-notification-visibility-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Notification } from "./notifications.entity";
import { NotificationVisibilityUser } from "./notification-visibility-user.entity";
import { User } from "../users/users.entity";

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,

    @InjectRepository(NotificationVisibilityUser)
    private visibilityRepository: Repository<NotificationVisibilityUser>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  createNotification(dto: CreateNotificationDto) {
    const notification = this.notificationRepository.create(dto);
    return this.notificationRepository.save(notification);
  }

  async getAllNotifications(): Promise<Notification[]> {
    const notifications = await this.notificationRepository.find();
    return notifications;
  }

  async getNotificationById(id: string): Promise<Notification> {
    const notification = await this.notificationRepository.findOne({
      where: { id },
    });
    if (!notification) {
      throw new NotFoundException(`Notification with ID ${id} not found`);
    }
    return notification;
  }

  async getNotificationVisibleUsers(notificationId: string): Promise<User[]> {
    await this.getNotificationById(notificationId);

    const visibilityEntries = await this.visibilityRepository.find({
      where: { notificationId },
      relations: ["user"],
    });

    return visibilityEntries.map((entry) => entry.user);
  }

  async addUserVisibility(
    notificationId: string,
    createDto: CreateNotificationVisibilityUserDto,
  ): Promise<NotificationVisibilityUser> {
    await this.getNotificationById(notificationId);

    // Check if user exists
    const user = await this.userRepository.findOne({
      where: { id: createDto.user_id },
    });
    if (!user) {
      throw new NotFoundException(
        `User with ID ${createDto.user_id} not found`,
      );
    }
    const visibilityEntry = this.visibilityRepository.create({
      notificationId,
      userId: createDto.user_id,
    });

    return this.visibilityRepository.save(visibilityEntry);
  }
}
