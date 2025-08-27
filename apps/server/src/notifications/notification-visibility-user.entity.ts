import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Notification } from "./notifications.entity";
import { User } from "../users/users.entity";

@Entity("notification_visibility_users")
export class NotificationVisibilityUser {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "uuid" })
  notificationId!: string;

  @Column({ type: "uuid" })
  userId!: string;

  @ManyToOne(() => Notification, { onDelete: "CASCADE" })
  @JoinColumn({ name: "notificationId" })
  notification!: Notification;

  @ManyToOne(() => User, { onDelete: "CASCADE" })
  @JoinColumn({ name: "userId" })
  user!: User;
}
