import { NotificationPriorityController } from "./notification-priority.controller";
import { NotificationsService } from "./notifications.service";
import { vi, expect } from "vitest";
import { NotificationPriority } from "./notification-priority.entity";
import { NotFoundException } from "@nestjs/common";

describe("NotificationPriorityController", () => {
  let controller: NotificationPriorityController;
  let service: NotificationsService;

  const mockPriority: Partial<NotificationPriority> = {
    id: "priority-uuid-1",
    threshold: "PT10M",
  };

  const mockPriorities: Partial<NotificationPriority>[] = [
    mockPriority,
    { id: "priority-uuid-2", threshold: "PT30M" },
  ];

  class MockNotificationsService implements Partial<NotificationsService> {
    getAllPriorities = vi
      .fn()
      .mockResolvedValue(mockPriorities as NotificationPriority[]);

    getPriorityById = vi.fn().mockImplementation((id: string) => {
      if (id === "not-found") throw new NotFoundException();
      return Promise.resolve({ ...mockPriority, id } as NotificationPriority);
    });

    createPriority = vi
      .fn()
      .mockImplementation((dto: Partial<NotificationPriority>) =>
        Promise.resolve({ ...mockPriority, ...dto } as NotificationPriority),
      );

    updatePriority = vi
      .fn()
      .mockImplementation((id: string, dto: Partial<NotificationPriority>) =>
        Promise.resolve({
          ...mockPriority,
          id,
          ...dto,
        } as NotificationPriority),
      );

    deletePriority = vi
      .fn()
      .mockResolvedValue({ message: "Priority deleted successfully" });
  }

  beforeEach(() => {
    service = new MockNotificationsService() as unknown as NotificationsService;
    controller = new NotificationPriorityController(service);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("findAll", () => {
    it("should return all priorities", async () => {
      const spy = vi.spyOn(service, "getAllPriorities");
      const result = await controller.findAll();
      expect(result).toEqual(mockPriorities);
      expect(spy).toHaveBeenCalled();
    });
  });

  describe("findOne", () => {
    it("should return a priority by id", async () => {
      const id = "priority-uuid-1";
      const spy = vi.spyOn(service, "getPriorityById");
      const result = await controller.findOne(id);
      expect(result).toEqual({ ...mockPriority, id });
      expect(spy).toHaveBeenCalledWith(id);
    });

    it("should throw NotFoundException if priority not found", async () => {
      const id = "not-found";
      const spy = vi.spyOn(service, "getPriorityById");
      await expect(controller.findOne(id)).rejects.toThrow(NotFoundException);
      expect(spy).toHaveBeenCalledWith(id);
    });
  });

  describe("create", () => {
    it("should create a new priority", async () => {
      const dto = { threshold: "PT15M" };
      const spy = vi.spyOn(service, "createPriority");
      const result = await controller.create(dto);
      expect(result).toEqual({ ...mockPriority, ...dto });
      expect(spy).toHaveBeenCalledWith(dto);
    });
  });

  describe("update", () => {
    it("should update a priority", async () => {
      const id = "priority-uuid-1";
      const dto = { threshold: "PT20M" };
      const spy = vi.spyOn(service, "updatePriority");
      const result = await controller.update(id, dto);
      expect(result).toEqual({ ...mockPriority, id, ...dto });
      expect(spy).toHaveBeenCalledWith(id, dto);
    });
  });

  describe("remove", () => {
    it("should delete a priority", async () => {
      const id = "priority-uuid-1";
      const spy = vi.spyOn(service, "deletePriority");
      const result = await controller.remove(id);
      expect(result).toEqual({ message: "Priority deleted successfully" });
      expect(spy).toHaveBeenCalledWith(id);
    });
  });
});
