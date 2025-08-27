import { NotificationsController } from "./notifications.controller";
import { NotificationsService } from "./notifications.service";
import { vi, expect } from "vitest";
import { CreateNotificationDto } from "./dto/create-notification.dto";
import { Notification } from "./notifications.entity";

describe("NotificationsController", () => {
  let controller: NotificationsController;
  let service: NotificationsService;

  const mockNotificationDto: CreateNotificationDto = {
    content: "Test notification",

    cooldown: 0,
    category: "info",
    sender: "system",
  };
  const mockNotification: Partial<Notification> = {
    id: "1",
    content: "Test notification",

    cooldown: 0,
    category: "info",
    sender: "system",
    scheduled_at: undefined, // Changed from null to undefined to match the type
    created_at: new Date(),
    updated_at: new Date(),
  };

  // Create a complete mock service class
  class MockNotificationsService implements Partial<NotificationsService> {
    // Fix the unused parameter warning by explicitly typing and using the parameter
    createNotification = vi
      .fn()
      .mockImplementation((notificationDto: CreateNotificationDto) => {
        // Just pass through the parameter to the mock response
        console.log("Mock creating notification:", notificationDto);
        return Promise.resolve(mockNotification as Notification);
      });
    getAllNotifications = vi
      .fn()
      .mockResolvedValue([mockNotification as Notification]);
    notificationRepository = {}; // Add any needed repository methods
  }

  beforeEach(() => {
    service = new MockNotificationsService() as unknown as NotificationsService;
    controller = new NotificationsController(service);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("should get all notifications", async () => {
    // Set up spy before the action
    const getAllSpy = vi.spyOn(service, "getAllNotifications");

    // Perform the action
    const result = await controller.getAllNotifications();

    // Assert the result and that the spy was called
    expect(result).toEqual([mockNotification]);
    expect(getAllSpy).toHaveBeenCalled();
  });

  it("should create a notification", async () => {
    // Set up spy before the action
    const createSpy = vi.spyOn(service, "createNotification");

    // Perform the action
    const result = await controller.createNotification(mockNotificationDto);

    // Assert the result and that the spy was called with the right arguments
    expect(result).toEqual(mockNotification);
    expect(createSpy).toHaveBeenCalledWith(mockNotificationDto);
  });
});
