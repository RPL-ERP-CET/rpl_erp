import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { NotificationsService } from "./notifications.service";
import { NotificationPriority } from "./notification-priority.entity";

@Controller("notification-priorities")
export class NotificationPriorityController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  async findAll(): Promise<NotificationPriority[]> {
    return this.notificationsService.getAllPriorities();
  }

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<NotificationPriority> {
    return this.notificationsService.getPriorityById(id);
  }

  @Post()
  async create(
    @Body() dto: Partial<NotificationPriority>,
  ): Promise<NotificationPriority> {
    return this.notificationsService.createPriority(dto);
  }

  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() dto: Partial<NotificationPriority>,
  ): Promise<NotificationPriority> {
    return this.notificationsService.updatePriority(id, dto);
  }

  @Delete(":id")
  async remove(@Param("id") id: string): Promise<{ message: string }> {
    return this.notificationsService.deletePriority(id);
  }
}
