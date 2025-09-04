import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Notification } from "./notifications.entity";
//import { Document } from '../document/document.entity';

@Entity("notification_attachment")
export class NotificationAttachment {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => Notification, { onDelete: "CASCADE" })
  @JoinColumn({ name: "notification" })
  notification!: Notification;

  @ManyToOne(() => Document, { onDelete: "CASCADE" })
  @JoinColumn({ name: "attachment" })
  attachment!: Document;
}
