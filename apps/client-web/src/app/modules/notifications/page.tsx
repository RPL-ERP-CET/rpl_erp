"use client";

import * as React from "react";
import { useEffect } from "react";
import { create } from "zustand";
import { Card, CardContent } from "@client-web/components/ui/card"; // Assuming shadcn components

// (1) TYPE DEFINITIONS, ZUSTAND STORE, DUMMY DATA & API SIMULATION
// =================================================================

type NotificationType =
  | "Critical"
  | "Alert"
  | "Warning"
  | "System"
  | "Announcement";

interface Notification {
  id: number;
  type: NotificationType;
  message: string;
  timestamp: string;
  read: boolean;
}

interface NotificationState {
  notifications: Notification[];
  isLoading: boolean;
  fetchNotifications: () => Promise<void>;
  markAsRead: (id: number) => void;
}

const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [],
  isLoading: true,
  fetchNotifications: async () => {
    set({ isLoading: true });
    const fetchedNotifications = await new Promise<Notification[]>((resolve) =>
      setTimeout(
        () =>
          resolve([
            // Dummy Data
            {
              id: 1,
              type: "Critical",
              message: "Ammonium less than 10%. Authorize for Purchase.",
              timestamp: "Just Now",
              read: false,
            },
            {
              id: 2,
              type: "Alert",
              message: "General Meeting on Monday 03rd August",
              timestamp: "1 hour ago",
              read: false,
            },
            {
              id: 3,
              type: "Warning",
              message: "License Expiry in 10 days vehicle no: KL 01 0000",
              timestamp: "1 day ago",
              read: false,
            },
            {
              id: 4,
              type: "Announcement",
              message: "Ammonium less than 10%. Authorize for Purchase.",
              timestamp: "Just Now",
              read: false,
            },
            {
              id: 5,
              type: "System",
              message: "Internal Audit Report ready for Download",
              timestamp: "30 mins ago",
              read: false,
            },
          ]),
        1000,
      ),
    );
    set({ notifications: fetchedNotifications, isLoading: false });
  },
  markAsRead: (id: number) => {
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    }));
  },
}));

// (2) NOTIFICATION CARD COMPONENT
// =================================================================
const NotificationCard = ({ notification }: { notification: Notification }) => {
  const markAsRead = useNotificationStore((state) => state.markAsRead);
  const tagVariants: Record<NotificationType, string> = {
    Critical: "bg-red-500 text-white",
    Alert: "bg-orange-400 text-white",
    Warning: "bg-yellow-500 text-white",
    System: "bg-blue-500 text-white",
    Announcement: "bg-gray-400 text-white",
  };

  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow bg-white rounded-xl">
      <CardContent className="p-4 flex flex-col justify-between h-full">
        <div>
          <div className="flex justify-between items-center mb-2">
            <span
              className={`px-3 py-1 text-xs font-semibold rounded-full ${tagVariants[notification.type]}`}
            >
              {notification.type}
            </span>
            <span className="text-xs text-gray-500">
              {notification.timestamp}
            </span>
          </div>
          <p className="text-gray-700 text-sm font-medium">
            {notification.message}
          </p>
        </div>
        <button
          onClick={() => markAsRead(notification.id)}
          className="text-blue-600 hover:underline text-sm font-semibold mt-4 text-left"
        >
          Mark as Read
        </button>
      </CardContent>
    </Card>
  );
};

// (3) MAIN PAGE COMPONENT - SIMPLIFIED
// =================================================================
// Notice this component NO LONGER has the Sidebar, Header, or main flex wrapper.
// It only returns the content that will be placed inside the layout's {children}.

export default function NotificationsPage() {
  const notifications = useNotificationStore((state) => state.notifications);
  const isLoading = useNotificationStore((state) => state.isLoading);
  const fetchNotifications = useNotificationStore(
    (state) => state.fetchNotifications,
  );

  useEffect(() => {
    // This resolves the 'no-floating-promises' ESLint error.
    fetchNotifications().catch((error) => {
      console.error("Failed to fetch notifications:", error);
    });
  }, [fetchNotifications]);

  return (
    // This is the content that goes into the <ContentBox> of your layout
    <>
      <h3 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Notification Center
      </h3>
      {isLoading ? (
        <p className="text-center text-gray-500">Loading notifications...</p>
      ) : notifications.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notifications.map((notification) => (
            <NotificationCard
              key={notification.id}
              notification={notification}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No new notifications. 🎉</p>
      )}
    </>
  );
}
