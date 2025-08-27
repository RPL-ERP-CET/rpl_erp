import { NotificationVisibilityUsersController } from "./notification-visibility-users.controller";
import { NotificationsService } from "./notifications.service";
import { vi, expect } from "vitest";
import { CreateNotificationVisibilityUserDto } from "./dto/create-notification-visibility-user.dto";
import { NotificationVisibilityUser } from "./notification-visibility-user.entity";
import { User } from "../users/users.entity";

describe("NotificationVisibilityUsersController", () => {
  let controller: NotificationVisibilityUsersController;
  let service: NotificationsService;

  const mockNotificationId = "notification-id-123";
  const mockUserId = "user-id-456";

  const mockVisibilityUserDto: CreateNotificationVisibilityUserDto = {
    user_id: mockUserId,
  };

  const mockUser: Partial<User> = {
    id: mockUserId,
    email: "test@example.com",
    password: "hashedpassword",
  };

  const mockVisibilityUser: Partial<NotificationVisibilityUser> = {
    id: "visibility-id-789",
    notificationId: mockNotificationId,
    userId: mockUserId,
  };

  // Create a complete mock service class
  class MockNotificationsService implements Partial<NotificationsService> {
    getNotificationVisibleUsers = vi
      .fn()
      .mockImplementation((notificationId: string) => {
        console.log(
          "Mock getting visible users for notification:",
          notificationId,
        );
        return Promise.resolve([mockUser as User]);
      });

    addUserVisibility = vi
      .fn()
      .mockImplementation(
        (
          notificationId: string,
          createDto: CreateNotificationVisibilityUserDto,
        ) => {
          console.log(
            "Mock adding user visibility:",
            notificationId,
            createDto,
          );
          return Promise.resolve(
            mockVisibilityUser as NotificationVisibilityUser,
          );
        },
      );
  }

  beforeEach(() => {
    service = new MockNotificationsService() as unknown as NotificationsService;
    controller = new NotificationVisibilityUsersController(service);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("should get visible users for a notification", async () => {
    // Set up spy before the action
    const getVisibleUsersSpy = vi.spyOn(service, "getNotificationVisibleUsers");

    // Perform the action
    const result = await controller.getVisibleUsers(mockNotificationId);

    // Assert the result and that the spy was called
    expect(result).toEqual([mockUser]);
    expect(getVisibleUsersSpy).toHaveBeenCalledWith(mockNotificationId);
  });

  it("should add a visible user to a notification", async () => {
    // Set up spy before the action
    const addVisibleUserSpy = vi.spyOn(service, "addUserVisibility");

    // Perform the action
    const result = await controller.addVisibleUser(
      mockNotificationId,
      mockVisibilityUserDto,
    );

    // Assert the result and that the spy was called with the right arguments
    expect(result).toEqual(mockVisibilityUser);
    expect(addVisibleUserSpy).toHaveBeenCalledWith(
      mockNotificationId,
      mockVisibilityUserDto,
    );
  });
});
