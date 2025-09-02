import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { NotificationVisibilityUser } from "./notification-visibility-user.entity";
import { NotificationReadReceipt } from "./notification-read-receipt.entity";
import { NotificationPriority } from "./notification-priority.entity";

@Entity("notifications")
export class Notification {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar" })
  content!: string;

  @ManyToOne(() => NotificationPriority, { eager: true, nullable: true })
  @JoinColumn({ name: "priorityId" })
  priority?: NotificationPriority;

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

  @OneToMany(
    () => NotificationReadReceipt,
    (readReceipt) => readReceipt.notification,
  )
  readReceipts!: NotificationReadReceipt[];
}
