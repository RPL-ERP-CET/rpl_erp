export type NotificationType = "Critical" | "Alert" | "Warning" | "System" | "Announcement";

export type Notification = {
  id: number;
  type: NotificationType;
  message: string;
  timestamp: string;
  read: boolean;
};