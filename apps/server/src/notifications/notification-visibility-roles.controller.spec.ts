/*
import { NotificationVisibilityRolesController } from "./notification-visibility-roles.controller";
import { NotificationsService } from "./notifications.service";
import { vi, expect } from "vitest";
import { CreateNotificationVisibilityRoleDto } from "./dto/create-notification-visibility-role.dto";
import { NotificationVisibilityRole } from "./notification-visibility-role.entity";
import { Role } from "../users/roles.entity";

describe("NotificationVisibilityRolesController", () => {
  let controller: NotificationVisibilityRolesController;
  let service: NotificationsService;

  const mockNotificationId = "notification-id-123";
  const mockRoleId = "role-id-456";

  const mockVisibilityRoleDto: CreateNotificationVisibilityRoleDto = {
    role_id: mockRoleId,
  };

  const mockRole: Partial<Role> = {
    id: mockRoleId,
    name: "admin",
  };

  const mockVisibilityRole: Partial<NotificationVisibilityRole> = {
    id: "visibility-id-789",
    notification: mockNotificationId,
    roleId: mockRoleId,
  };

  // Create a complete mock service class for the new methods
  class MockNotificationsService implements Partial<NotificationsService> {
    getNotificationVisibleRoles = vi
      .fn()
      .mockImplementation((notificationId: string) => {
        console.log(
          "Mock getting visible roles for notification:",
          notificationId,
        );
        return Promise.resolve([mockRole as Role]);
      });

    addRoleVisibility = vi
      .fn()
      .mockImplementation(
        (
          notificationId: string,
          createDto: CreateNotificationVisibilityRoleDto,
        ) => {
          console.log(
            "Mock adding role visibility:",
            notificationId,
            createDto,
          );
          return Promise.resolve(
            mockVisibilityRole as NotificationVisibilityRole,
          );
        },
      );
  }

  beforeEach(() => {
    service = new MockNotificationsService() as unknown as NotificationsService;
    controller = new NotificationVisibilityRolesController(service);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("should get visible roles for a notification", async () => {
    // Set up spy before the action
    const getVisibleRolesSpy = vi.spyOn(service, "getNotificationVisibleRoles");

    // Perform the action
    const result = await controller.getVisibleRoles(mockNotificationId);

    // Assert the result and that the spy was called
    expect(result).toEqual([mockRole]);
    expect(getVisibleRolesSpy).toHaveBeenCalledWith(mockNotificationId);
  });

  it("should add a visible role to a notification", async () => {
    // Set up spy before the action
    const addVisibleRoleSpy = vi.spyOn(service, "addRoleVisibility");

    // Perform the action
    const result = await controller.addVisibleRole(
      mockNotificationId,
      mockVisibilityRoleDto,
    );

    // Assert the result and that the spy was called with the right arguments
    expect(result).toEqual(mockVisibilityRole);
    expect(addVisibleRoleSpy).toHaveBeenCalledWith(
      mockNotificationId,
      mockVisibilityRoleDto,
    );
  });
});
*/
