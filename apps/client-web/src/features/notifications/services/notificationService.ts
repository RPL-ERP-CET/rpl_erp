import { type Notification } from "../types";

// This is where dummy data or actual API call lives.
const DUMMY_NOTIFICATIONS: Notification[] = [
  { id: 1, type: "Critical", message: "Ammonium less than 10%. Authorize for Purchase.", timestamp: "Just Now", read: false },
  { id: 2, type: "Alert", message: "General Meeting on Monday 03rd August", timestamp: "1 hour ago", read: false },
  { id: 3, type: "Warning", message: "License Expiry in 10 days vehicle no: KL 01 0000", timestamp: "1 day ago", read: false },
];

// Real app, this would use fetch, axios, etc.
export const notificationService = {
  getNotifications: async (): Promise<Notification[]> => {
    console.log("Fetching notifications from the service layer...");
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(DUMMY_NOTIFICATIONS);
      }, 1000);
    });
  },
  markNotificationAsRead: async (id: number): Promise<{ success: boolean }> => {
    console.log(`Sending API request to mark notification ${id} as read...`);

    // Real app:
    // const response = await fetch(`/api/notifications/${id}/read`, { method: 'POST' });
    // if (!response.ok) throw new Error('Failed to mark as read');
    // return response.json();

    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`API request for notification ${id} successful.`);
        resolve({ success: true });
      }, 500); // Simulate 500ms network delay
    });
  },
};