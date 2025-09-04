import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";

import { Notification } from "./notifications.entity";
// Role entity not created currently
//import { Role } from '../users/role.entity';

@Entity("notification_visibility_role")
export class NotificationVisibilityRole {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => Notification, { onDelete: "CASCADE" })
  @JoinColumn({ name: "notification" })
  notification!: Notification;

  /*@ManyToOne(() => Role, {onDelete: 'CASCADE'})
  @JoinColumn({ name: 'role' })
  role!: Role;*/
}
