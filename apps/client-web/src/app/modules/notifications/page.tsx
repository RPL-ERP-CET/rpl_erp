"use client";

import { useEffect } from "react";
import { useNotifications } from "@client-web/features/notifications/hooks/useNotifications";
import {
  type Notification,
  type NotificationType,
} from "@client-web/features/notifications/types";
import { Card, CardContent } from "@client-web/components/ui/card";

// Sub-component for displaying a single notification card
const NotificationCard = ({
  notification,
  onMarkAsRead,
}: {
  notification: Notification;
  onMarkAsRead: (id: number) => Promise<void>;
}) => {
  // Map notification types to specific styles for the tag
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
              className={`px-3 py-1 text-xs font-semibold rounded-full ${
                tagVariants[notification.type]
              }`}
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
          onClick={() => {
            onMarkAsRead(notification.id).catch((err) => {
              console.error("Failed to mark as read:", err);
            });
          }}
          className="text-blue-600 hover:underline text-sm font-semibold mt-4 text-left"
        >
          Mark as Read
        </button>
      </CardContent>
    </Card>
  );
};

// Main Page Component
export default function NotificationsPage() {
  const { notifications, isLoading, markAsRead, fetchNotifications } =
    useNotifications();

  useEffect(() => {
    fetchNotifications().catch((err) => {
      console.error("Failed to fetch initial notifications:", err);
    });
  }, [fetchNotifications]);

  return (
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
              onMarkAsRead={markAsRead}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No new notifications. 🎉</p>
      )}
    </>
  );
}
