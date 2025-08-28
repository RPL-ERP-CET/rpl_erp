import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateNotificationDto } from "./dto/create-notification.dto";
import { CreateNotificationVisibilityUserDto } from "./dto/create-notification-visibility-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Notification } from "./notifications.entity";
import { NotificationVisibilityUser } from "./notification-visibility-user.entity";
import { NotificationReadReceipt } from "./notification-read-receipt.entity";
import { User } from "../users/users.entity";

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,

    @InjectRepository(NotificationVisibilityUser)
    private visibilityRepository: Repository<NotificationVisibilityUser>,

    @InjectRepository(NotificationReadReceipt)
    private readReceiptRepository: Repository<NotificationReadReceipt>,

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

  async createReadReceipt(
    notificationId: string,
    userId: string,
  ): Promise<NotificationReadReceipt> {
    // Check if notification exists
    await this.getNotificationById(notificationId);

    // Check if user exists
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    // Check if read receipt already exists
    const existingReceipt = await this.readReceiptRepository.findOne({
      where: { notificationId, userId },
    });

    if (existingReceipt) {
      // Update the timestamp if it already exists
      existingReceipt.readAt = new Date();
      return this.readReceiptRepository.save(existingReceipt);
    }

    // Create new read receipt
    const readReceipt = this.readReceiptRepository.create({
      notificationId,
      userId,
      readAt: new Date(),
    });

    return this.readReceiptRepository.save(readReceipt);
  }

  async findOneReadReceipt(id: string): Promise<NotificationReadReceipt> {
    const readReceipt = await this.readReceiptRepository.findOne({
      where: { id },
    });

    if (!readReceipt) {
      throw new NotFoundException(
        `Notification read receipt with ID ${id} not found`,
      );
    }

    return readReceipt;
  }

  async getReadReceiptsByNotification(
    notificationId: string,
  ): Promise<NotificationReadReceipt[]> {
    await this.getNotificationById(notificationId);

    return this.readReceiptRepository.find({
      where: { notificationId },
    });
  }
}
