import { NotificationReadReceiptsController } from "./notification-read-receipts.controller";
import { NotificationsService } from "./notifications.service";
import { vi, expect } from "vitest";
import { NotificationReadReceipt } from "./notification-read-receipt.entity";
import { NotFoundException } from "@nestjs/common";

describe("NotificationReadReceiptsController", () => {
  let controller: NotificationReadReceiptsController;
  let service: NotificationsService;

  const mockReadReceipt: Partial<NotificationReadReceipt> = {
    id: "receipt-uuid-1",
    notificationId: "notification-uuid-1",
    userId: "0f64f15e-ba36-400d-bfb8-fd0bc0c5a8a6",
    readAt: new Date(),
  };

  const mockReadReceipts: Partial<NotificationReadReceipt>[] = [
    mockReadReceipt,
    {
      id: "receipt-uuid-2",
      notificationId: "notification-uuid-1",
      userId: "user-uuid-2",
      readAt: new Date(),
    },
  ];

  // Create a mock service with the methods used by the controller
  class MockNotificationsService implements Partial<NotificationsService> {
    createReadReceipt = vi
      .fn()
      .mockImplementation((notificationId: string, userId: string) => {
        console.log(
          `Mock creating read receipt for notification: ${notificationId}, user: ${userId}`,
        );
        return Promise.resolve({
          ...mockReadReceipt,
          notificationId,
          userId,
        } as NotificationReadReceipt);
      });

    getReadReceiptsByNotification = vi
      .fn()
      .mockImplementation((notificationId: string) => {
        console.log(
          `Mock getting read receipts for notification: ${notificationId}`,
        );
        return Promise.resolve(mockReadReceipts as NotificationReadReceipt[]);
      });

    findOneReadReceipt = vi.fn().mockImplementation((id: string) => {
      console.log(`Mock finding read receipt with id: ${id}`);
      if (id === "not-found") {
        return Promise.reject(
          new NotFoundException(
            `Notification read receipt with ID ${id} not found`,
          ),
        );
      }
      return Promise.resolve({
        ...mockReadReceipt,
        id,
      } as NotificationReadReceipt);
    });
  }

  beforeEach(() => {
    service = new MockNotificationsService() as unknown as NotificationsService;
    controller = new NotificationReadReceiptsController(service);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("create", () => {
    it("should create a read receipt", async () => {
      const notificationId = "notification-uuid-1";
      const userId = "0f64f15e-ba36-400d-bfb8-fd0bc0c5a8a6";

      const createSpy = vi.spyOn(service, "createReadReceipt");

      const result = await controller.create(notificationId);

      expect(result).toEqual({
        ...mockReadReceipt,
        notificationId,
        userId,
      });
      expect(createSpy).toHaveBeenCalledWith(notificationId, userId);
    });
  });

  describe("findAll", () => {
    it("should return an array of read receipts for a notification", async () => {
      const notificationId = "notification-uuid-1";

      const findAllSpy = vi.spyOn(service, "getReadReceiptsByNotification");

      const result = await controller.findAll(notificationId);

      expect(result).toEqual(mockReadReceipts);
      expect(findAllSpy).toHaveBeenCalledWith(notificationId);
    });
  });

  describe("findOne", () => {
    it("should return a read receipt by id", async () => {
      const id = "receipt-uuid-1";

      const findOneSpy = vi.spyOn(service, "findOneReadReceipt");

      const result = await controller.findOne(id);

      expect(result).toEqual({
        ...mockReadReceipt,
        id,
      });
      expect(findOneSpy).toHaveBeenCalledWith(id);
    });

    it("should throw NotFoundException when read receipt not found", async () => {
      const id = "not-found";

      const findOneSpy = vi.spyOn(service, "findOneReadReceipt");

      await expect(controller.findOne(id)).rejects.toThrow(NotFoundException);
      expect(findOneSpy).toHaveBeenCalledWith(id);
    });
  });
});
