import { create } from "zustand";
import { type Notification } from "../types";

type NotificationState = {
  notifications: Notification[];
  isLoading: boolean;
  setNotifications: (notifications: Notification[]) => void;
  setIsLoading: (isLoading: boolean) => void;
  markAsRead: (id: number) => void;
};

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [],
  isLoading: true,
  // Simple setter for updating notifications
  setNotifications: (notifications) => set({ notifications }),
  // Simple setter for loading state
  setIsLoading: (isLoading) => set({ isLoading }),
  // Action that only modifies state
  markAsRead: (id: number) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),
}));