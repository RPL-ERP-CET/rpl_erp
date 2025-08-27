import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { NotificationVisibilityUser } from "./notification-visibility-user.entity";

@Entity("notifications")
export class Notification {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar" })
  content!: string;

  // @Column({ type: "uuid" })
  // priority!: string;

  @Column({ type: "integer", nullable: true })
  cooldown?: number;

  @Column({ type: "varchar" })
  category!: string;

  @Column({ type: "varchar" })
  sender!: string;

  @Column({ type: "timestamp", nullable: true })
  scheduled_at?: Date;

  @CreateDateColumn({ type: "timestamp" })
  created_at!: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updated_at!: Date;

  @OneToMany(
    () => NotificationVisibilityUser,
    (visibilityUser) => visibilityUser.notification,
  )
  visibleToUsers!: NotificationVisibilityUser[];
}
