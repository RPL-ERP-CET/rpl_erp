import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateNotificationDto } from "./dto/create-notification.dto";
import { CreateNotificationVisibilityUserDto } from "./dto/create-notification-visibility-user.dto";
/*
import { CreateNotificationVisibilityRoleDto } from "./dto/create-notification-visibility-role.dto";
import { CreateNotificationAttachmentDto } from "./dto/create-notification-attachment.dto";
*/
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Notification } from "./notifications.entity";
import { NotificationVisibilityUser } from "./notification-visibility-user.entity";
import { NotificationReadReceipt } from "./notification-read-receipt.entity";
import { NotificationPriority } from "./notification-priority.entity";
import { User } from "../users/users.entity";
/*
import { Role } from "../users/roles.entity";
import { NotificationVisibilityRole } from "./notification-visibility-role.entity";
import { Document } from "../document/document.entity";
import { NotificationAttachment } from "./notification-attachment.entity";
*/

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

    @InjectRepository(NotificationPriority)
    private priorityRepository: Repository<NotificationPriority>,

    /*@InjectRepository(Role)
    private roleRepository: Repository<Role>,

    @InjectRepository(NotificationVisibilityRole)
    private visibilityRoleRepository: Repository<NotificationVisibilityRole>,
    
    @InjectRepository(Document)
    private documentRepository: Repository<Document>,

    @InjectRepository(NotificationAttachment)
    private attachmentRepository: Repository<NotificationAttachment>,*/
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

  // ================= Role Visibility Methods ================= //
  /*async getNotificationVisibleRoles(notificationId: string): Promise<Role[]> {
    await this.getNotificationById(notificationId);

    const visibilityEntries = await this.visibilityRoleRepository.find({
      where: { notification: { id: notificationId }, },
      relations: ["role"],
    });

    return visibilityEntries.map((entry) => entry.role);
  }

  async addRoleVisibility(
    notificationId: string,
    createDto: CreateNotificationVisibilityRoleDto,
  ): Promise<NotificationVisibilityRole> {
    const notification = await this.getNotificationById(notificationId);
    const role = await this.roleRepository.findOne({
      where: { id: createDto.role_id },
    });
    if (!role) {
          throw new NotFoundException(
            `Role with ID ${createDto.role_id} not found`,
          );
        }

    const visibilityEntry = this.visibilityRoleRepository.create({
      notification,
      role,
    });


    return this.visibilityRoleRepository.save(visibilityEntry);
  }*/

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

  // ================= Notification Priority Methods ================= //

  async getAllPriorities(): Promise<NotificationPriority[]> {
    return this.priorityRepository.find();
  }

  async getPriorityById(id: string): Promise<NotificationPriority> {
    const priority = await this.priorityRepository.findOne({ where: { id } });
    if (!priority) {
      throw new NotFoundException(`Priority with ID ${id} not found`);
    }
    return priority;
  }

  async createPriority(
    dto: Partial<NotificationPriority>,
  ): Promise<NotificationPriority> {
    const priority = this.priorityRepository.create(dto);
    return this.priorityRepository.save(priority);
  }

  async updatePriority(
    id: string,
    dto: Partial<NotificationPriority>,
  ): Promise<NotificationPriority> {
    const priority = await this.getPriorityById(id);
    Object.assign(priority, dto);
    return this.priorityRepository.save(priority);
  }

  async deletePriority(id: string): Promise<{ message: string }> {
    const priority = await this.getPriorityById(id);
    await this.priorityRepository.remove(priority);
    return { message: "Priority deleted successfully" };
  }

  // ================= Attachment Methods ================= //
  /*async getNotificationAttachments(
    notificationId: string,
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
    await this.getNotificationById(notificationId);


    const attachmentEntries = await this.attachmentRepository.find({
      where: { notification: { id: notificationId } },
      relations: ['attachment'], 
      select: {
          id: true, 
          attachment: { 
              id: true,
              type: true,
              title: true, 
              created_by: true,
              created_at: true,
              updated_at: true,
          },
      },
    });

    return attachmentEntries.map((entry) => ({
      id: entry.attachment.id,
      type: entry.attachment.type,
      title: entry.attachment.title,
      created_by: entry.attachment.created_by,
      created_at: entry.attachment.created_at,
      updated_at: entry.attachment.updated_at,
    }));
  }
  async addAttachmentToNotification(
    notificationId: string,
    createDto: CreateNotificationAttachmentDto,
  ): Promise<NotificationAttachment> {
    await this.getNotificationById(notificationId);

    const document = await this.documentRepository.findOne({
      where: { id: createDto.document_id },
    });
    if (!document) {
      throw new NotFoundException(
        `Document with ID ${createDto.document_id} not found`,
      );
    }

    const attachmentEntry = this.attachmentRepository.create({
      notification: { id: notificationId },
      attachment: { id: createDto.document_id },
    });

    return this.attachmentRepository.save(attachmentEntry);
  }
  */
}
