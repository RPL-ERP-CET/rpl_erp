import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Notification } from "./notifications.entity";

@Entity("notification_priority")
export class NotificationPriority {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "interval" })
  threshold!: string;

  @OneToMany(() => Notification, (notification) => notification.priority)
  notifications!: Notification[];
}
