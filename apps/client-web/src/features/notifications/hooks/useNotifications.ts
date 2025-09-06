import { useCallback } from "react";
import { useNotificationStore } from "../store/notificationStore";
import { notificationService } from "../services/notificationService";

export const useNotifications = () => {
  const {
    notifications,
    isLoading,
    setNotifications,
    setIsLoading,
    markAsRead: markAsReadInStore,
  } = useNotificationStore();

  const fetchNotifications = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await notificationService.getNotifications();
      setNotifications(data);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
      // Optionally set an error state here
    } finally {
      setIsLoading(false);
    }
  }, [setNotifications, setIsLoading]);

  // This function will be exposed to the UI.
  const markAsRead = useCallback(
    async (id: number) => {
      try {
        // 1. Call the service to update the backend
        await notificationService.markNotificationAsRead(id);

        // 2. If the API call is successful, update the local state
        markAsReadInStore(id);
      } catch (error) {
        console.error(`Failed to mark notification ${id} as read:`, error);
        // real app: you show an error toast to the user here
      }
    },
    [markAsReadInStore],
  );

  return { notifications, isLoading, markAsRead, fetchNotifications };
};
