import { Test, TestingModule } from "@nestjs/testing";
import { NotificationsService } from "./notifications.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Notification } from "./notifications.entity";
import { CreateNotificationDto } from "./dto/create-notification.dto";
import { vi } from "vitest";
import { NotificationVisibilityUser } from "./notification-visibility-user.entity";
import { User } from "../users/users.entity";
import { CreateNotificationVisibilityUserDto } from "./dto/create-notification-visibility-user.dto";
import { NotFoundException } from "@nestjs/common";
import { NotificationReadReceipt } from "./notification-read-receipt.entity";

describe("NotificationsService", () => {
  let service: NotificationsService;

  // Mock data for notifications
  const mockNotifications: Partial<Notification>[] = [
    {
      id: "1",
      content: "Notification 1",
      cooldown: 0,
      category: "info",
      sender: "system",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: "2",
      content: "Notification 2",
      cooldown: 10,
      category: "alert",
      sender: "admin",
      created_at: new Date(),
      updated_at: new Date(),
    },
  ];

  // Mock data for users
  const mockUsers: Partial<User>[] = [
    {
      id: "user-1",
      email: "user1@example.com",
      password: "hashedpassword",
    },
    {
      id: "user-2",
      email: "user2@example.com",
      password: "hashedpassword",
    },
  ];

  // Mock data for notification visibility users
  const mockVisibilityEntries: Partial<NotificationVisibilityUser>[] = [
    {
      id: "visibility-1",
      notificationId: "1",
      userId: "user-1",
      user: mockUsers[0] as User,
    },
    {
      id: "visibility-2",
      notificationId: "1",
      userId: "user-2",
      user: mockUsers[1] as User,
    },
  ];

  // Mock data for notification read receipts
  const mockReadReceipts: Partial<NotificationReadReceipt>[] = [
    {
      id: "receipt-1",
      notificationId: "1",
      userId: "user-1",
      readAt: new Date(),
    },
    {
      id: "receipt-2",
      notificationId: "1",
      userId: "user-2",
      readAt: new Date(),
    },
  ];

  // Define mock functions for notification repository
  const createNotificationFn = vi
    .fn()
    .mockImplementation((dto: CreateNotificationDto): Partial<Notification> => {
      return { ...dto };
    });

  const findNotificationsFn = vi.fn().mockResolvedValue(mockNotifications);

  type NotificationWhereClause = {
    id?: string;
    category?: string;
    sender?: string;
  };

  const findOneNotificationFn = vi
    .fn()
    .mockImplementation((options: { where: NotificationWhereClause }) => {
      if (options?.where && options.where.id === "1") {
        return Promise.resolve(mockNotifications[0]);
      } else {
        return Promise.resolve(null);
      }
    });

  const saveNotificationFn = vi
    .fn()
    .mockImplementation(
      (notification: Partial<Notification>): Promise<Notification> => {
        return Promise.resolve({ id: "1", ...notification } as Notification);
      },
    );

  // Define mock functions for visibility repository
  const createVisibilityFn = vi
    .fn()
    .mockImplementation((data): Partial<NotificationVisibilityUser> => {
      return { id: "new-visibility-id", ...data };
    });

  const findVisibilityFn = vi
    .fn()
    .mockImplementation(
      (options: { where: Record<string, string>; relations?: string[] }) => {
        if (options?.where && options.where.notificationId === "1") {
          return Promise.resolve(mockVisibilityEntries);
        }
        return Promise.resolve([]);
      },
    );

  const saveVisibilityFn = vi
    .fn()
    .mockImplementation(
      (
        entry: Partial<NotificationVisibilityUser>,
      ): Promise<NotificationVisibilityUser> => {
        return Promise.resolve({
          id: "new-visibility-id",
          ...entry,
        } as NotificationVisibilityUser);
      },
    );

  // Define mock functions for user repository
  type UserWhereClause = {
    id?: string;
    email?: string;
  };

  const findOneUserFn = vi
    .fn()
    .mockImplementation((options: { where: UserWhereClause }) => {
      if (options?.where && "id" in options.where) {
        const id = options.where.id;
        const user = mockUsers.find((u) => u.id === id);
        return Promise.resolve(user || null);
      }
      return Promise.resolve(null);
    });

  // Define mock functions for read receipt repository
  type CreateReadReceiptDto = {
    notificationId: string;
    userId: string;
    readAt: Date;
  };

  const createReadReceiptFn = vi
    .fn()
    .mockImplementation(
      (data: CreateReadReceiptDto): Partial<NotificationReadReceipt> => {
        return {
          id: "new-receipt-id",
          notificationId: data.notificationId,
          userId: data.userId,
          readAt: data.readAt,
        };
      },
    );

  type ReadReceiptWhereClause = {
    id?: string;
    notificationId?: string;
    userId?: string;
  };

  const findOneReadReceiptFn = vi
    .fn()
    .mockImplementation((options: { where: ReadReceiptWhereClause }) => {
      if (options?.where) {
        if (options.where.id === "receipt-1") {
          return Promise.resolve(mockReadReceipts[0]);
        } else if (options.where.id === "non-existent-id") {
          return Promise.resolve(null);
        } else if (options.where.notificationId && options.where.userId) {
          // Find by both notificationId and userId
          const receipt = mockReadReceipts.find(
            (r) =>
              r.notificationId === options.where.notificationId &&
              r.userId === options.where.userId,
          );
          return Promise.resolve(receipt || null);
        }
      }
      return Promise.resolve(null);
    });

  const findReadReceiptsFn = vi
    .fn()
    .mockImplementation((options: { where: ReadReceiptWhereClause }) => {
      if (options?.where && options.where.notificationId === "1") {
        return Promise.resolve(mockReadReceipts);
      }
      return Promise.resolve([]);
    });

  const saveReadReceiptFn = vi
    .fn()
    .mockImplementation(
      (
        receipt: Partial<NotificationReadReceipt>,
      ): Promise<NotificationReadReceipt> => {
        if (receipt.id) {
          // Update existing receipt
          return Promise.resolve({
            ...receipt,
            readAt: receipt.readAt || new Date(),
          } as NotificationReadReceipt);
        }
        // Create new receipt
        return Promise.resolve({
          id: "new-receipt-id",
          ...receipt,
        } as NotificationReadReceipt);
      },
    );

  // Create the mock repositories
  const mockNotificationRepository = {
    create: createNotificationFn,
    find: findNotificationsFn,
    findOne: findOneNotificationFn,
    save: saveNotificationFn,
  };

  const mockVisibilityRepository = {
    create: createVisibilityFn,
    find: findVisibilityFn,
    save: saveVisibilityFn,
  };

  const mockUserRepository = {
    findOne: findOneUserFn,
  };

  const mockReadReceiptRepository = {
    create: createReadReceiptFn,
    findOne: findOneReadReceiptFn,
    find: findReadReceiptsFn,
    save: saveReadReceiptFn,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationsService,
        {
          provide: getRepositoryToken(Notification),
          useValue: mockNotificationRepository,
        },
        {
          provide: getRepositoryToken(NotificationVisibilityUser),
          useValue: mockVisibilityRepository,
        },
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
        {
          provide: getRepositoryToken(NotificationReadReceipt),
          useValue: mockReadReceiptRepository,
        },
      ],
    }).compile();

    service = module.get<NotificationsService>(NotificationsService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should create a notification and return it", async () => {
    const dto: CreateNotificationDto = {
      content: "Test notification",
      cooldown: 0,
      category: "info",
      sender: "system",
    };
    const result = await service.createNotification(dto);

    expect(result).toMatchObject(dto);

    expect(mockNotificationRepository.create).toHaveBeenCalledWith(dto);
    expect(mockNotificationRepository.save).toHaveBeenCalledWith(dto);
  });

  it("should return all notifications", async () => {
    const result = await service.getAllNotifications();
    expect(result).toEqual(mockNotifications);
    expect(mockNotificationRepository.find).toHaveBeenCalled();
  });

  describe("getNotificationById", () => {
    it("should return a notification if it exists", async () => {
      const result = await service.getNotificationById("1");
      expect(result).toEqual(mockNotifications[0]);
      expect(mockNotificationRepository.findOne).toHaveBeenCalledWith({
        where: { id: "1" },
      });
    });

    it("should throw NotFoundException if notification doesn't exist", async () => {
      mockNotificationRepository.findOne = vi
        .fn()
        .mockImplementation(() => Promise.resolve(null));

      await expect(
        service.getNotificationById("non-existent-id"),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe("getNotificationVisibleUsers", () => {
    it("should return users that have visibility for a notification", async () => {
      mockNotificationRepository.findOne = vi
        .fn()
        .mockImplementation(() => Promise.resolve(mockNotifications[0]));
      mockVisibilityRepository.find = vi
        .fn()
        .mockImplementation(() => Promise.resolve(mockVisibilityEntries));

      const result = await service.getNotificationVisibleUsers("1");

      expect(result).toEqual([mockUsers[0], mockUsers[1]]);
      expect(mockNotificationRepository.findOne).toHaveBeenCalledWith({
        where: { id: "1" },
      });
      expect(mockVisibilityRepository.find).toHaveBeenCalledWith({
        where: { notificationId: "1" },
        relations: ["user"],
      });
    });

    it("should throw NotFoundException if notification doesn't exist", async () => {
      mockNotificationRepository.findOne = vi
        .fn()
        .mockImplementation(() => Promise.resolve(null));

      await expect(
        service.getNotificationVisibleUsers("non-existent-id"),
      ).rejects.toThrow(NotFoundException);
      expect(mockNotificationRepository.findOne).toHaveBeenCalledWith({
        where: { id: "non-existent-id" },
      });
    });
  });

  describe("addUserVisibility", () => {
    it("should add visibility for a user and return the visibility entry", async () => {
      mockNotificationRepository.findOne = vi
        .fn()
        .mockImplementation(() => Promise.resolve(mockNotifications[0]));
      mockUserRepository.findOne = vi
        .fn()
        .mockImplementation(() => Promise.resolve(mockUsers[0]));
      mockVisibilityRepository.create = vi.fn().mockReturnValue({
        id: "new-visibility-id",
        notificationId: "1",
        userId: "user-1",
      });
      mockVisibilityRepository.save = vi.fn().mockResolvedValue({
        id: "new-visibility-id",
        notificationId: "1",
        userId: "user-1",
      });

      const dto: CreateNotificationVisibilityUserDto = {
        user_id: "user-1",
      };

      const result = await service.addUserVisibility("1", dto);

      expect(result).toMatchObject({
        id: "new-visibility-id",
        notificationId: "1",
        userId: "user-1",
      });
      expect(mockVisibilityRepository.create).toHaveBeenCalledWith({
        notificationId: "1",
        userId: "user-1",
      });
      expect(mockVisibilityRepository.save).toHaveBeenCalled();
    });

    it("should throw NotFoundException if notification doesn't exist", async () => {
      mockNotificationRepository.findOne = vi
        .fn()
        .mockImplementation(() => Promise.resolve(null));

      const dto: CreateNotificationVisibilityUserDto = {
        user_id: "user-1",
      };

      await expect(
        service.addUserVisibility("non-existent-id", dto),
      ).rejects.toThrow(NotFoundException);
      expect(mockNotificationRepository.findOne).toHaveBeenCalledWith({
        where: { id: "non-existent-id" },
      });
    });

    it("should throw NotFoundException if user doesn't exist", async () => {
      mockNotificationRepository.findOne = vi
        .fn()
        .mockImplementation(() => Promise.resolve(mockNotifications[0]));
      mockUserRepository.findOne = vi
        .fn()
        .mockImplementation(() => Promise.resolve(null));

      const dto: CreateNotificationVisibilityUserDto = {
        user_id: "non-existent-user-id",
      };

      await expect(service.addUserVisibility("1", dto)).rejects.toThrow(
        NotFoundException,
      );
      expect(mockUserRepository.findOne).toHaveBeenCalledWith({
        where: { id: "non-existent-user-id" },
      });
    });
  });

  describe("createReadReceipt", () => {
    it("should create a new read receipt if one doesn't exist", async () => {
      mockNotificationRepository.findOne = vi
        .fn()
        .mockImplementation(() => Promise.resolve(mockNotifications[0]));

      mockUserRepository.findOne = vi
        .fn()
        .mockImplementation(() => Promise.resolve(mockUsers[0]));

      mockReadReceiptRepository.findOne = vi
        .fn()
        .mockImplementation(() => Promise.resolve(null));

      mockReadReceiptRepository.create = vi
        .fn()
        .mockImplementation((data: CreateReadReceiptDto) => ({
          id: "new-receipt-id",
          ...data,
        }));

      mockReadReceiptRepository.save = vi.fn().mockImplementation((data) =>
        Promise.resolve({
          id: "new-receipt-id",
          ...data,
        }),
      );

      const result = await service.createReadReceipt("1", "user-1");

      expect(result).toMatchObject({
        id: "new-receipt-id",
        notificationId: "1",
        userId: "user-1",
      });

      // Check that readAt is a Date instance
      expect(result.readAt).toBeInstanceOf(Date);

      const createCallArg = mockReadReceiptRepository.create.mock
        .calls[0][0] as unknown as CreateReadReceiptDto;
      expect(createCallArg.notificationId).toBe("1");
      expect(createCallArg.userId).toBe("user-1");
      expect(createCallArg.readAt).toBeInstanceOf(Date);

      expect(mockReadReceiptRepository.save).toHaveBeenCalled();
    });

    it("should update an existing read receipt if one exists", async () => {
      const existingDate = new Date(2023, 0, 1);
      const existingReceipt = {
        id: "existing-receipt-id",
        notificationId: "1",
        userId: "user-1",
        readAt: existingDate,
      };

      mockNotificationRepository.findOne = vi
        .fn()
        .mockImplementation(() => Promise.resolve(mockNotifications[0]));

      mockUserRepository.findOne = vi
        .fn()
        .mockImplementation(() => Promise.resolve(mockUsers[0]));

      mockReadReceiptRepository.findOne = vi
        .fn()
        .mockImplementation(() => Promise.resolve(existingReceipt));

      mockReadReceiptRepository.save = vi.fn().mockImplementation((data) =>
        Promise.resolve({
          ...data,
          readAt: new Date(),
        }),
      );

      mockReadReceiptRepository.create = vi.fn();

      const result = await service.createReadReceipt("1", "user-1");

      expect(result).toMatchObject({
        id: "existing-receipt-id",
        notificationId: "1",
        userId: "user-1",
      });

      // Check that readAt is a Date instance
      expect(result.readAt).toBeInstanceOf(Date);

      expect(mockReadReceiptRepository.create).not.toHaveBeenCalled();

      const saveCallArg = mockReadReceiptRepository.save.mock
        .calls[0][0] as unknown as NotificationReadReceipt;
      expect(saveCallArg.id).toBe(existingReceipt.id);
      expect(saveCallArg.notificationId).toBe(existingReceipt.notificationId);
      expect(saveCallArg.userId).toBe(existingReceipt.userId);
      expect(saveCallArg.readAt).toBeInstanceOf(Date);

      expect(result.readAt.getTime()).toBeGreaterThan(existingDate.getTime());
    });

    it("should throw NotFoundException if notification doesn't exist", async () => {
      mockNotificationRepository.findOne = vi
        .fn()
        .mockImplementation(() => Promise.resolve(null));

      await expect(
        service.createReadReceipt("non-existent-id", "user-1"),
      ).rejects.toThrow(NotFoundException);

      expect(mockNotificationRepository.findOne).toHaveBeenCalledWith({
        where: { id: "non-existent-id" },
      });
    });

    it("should throw NotFoundException if user doesn't exist", async () => {
      mockNotificationRepository.findOne = vi
        .fn()
        .mockImplementation(() => Promise.resolve(mockNotifications[0]));

      mockUserRepository.findOne = vi
        .fn()
        .mockImplementation(() => Promise.resolve(null));

      await expect(
        service.createReadReceipt("1", "non-existent-user"),
      ).rejects.toThrow(NotFoundException);

      expect(mockUserRepository.findOne).toHaveBeenCalledWith({
        where: { id: "non-existent-user" },
      });
    });
  });

  describe("findOneReadReceipt", () => {
    it("should return a read receipt if it exists", async () => {
      mockReadReceiptRepository.findOne = vi
        .fn()
        .mockImplementation(() => Promise.resolve(mockReadReceipts[0]));

      const result = await service.findOneReadReceipt("receipt-1");

      expect(result).toEqual(mockReadReceipts[0]);
      expect(mockReadReceiptRepository.findOne).toHaveBeenCalledWith({
        where: { id: "receipt-1" },
      });
    });

    it("should throw NotFoundException if read receipt doesn't exist", async () => {
      mockReadReceiptRepository.findOne = vi
        .fn()
        .mockImplementation(() => Promise.resolve(null));

      await expect(
        service.findOneReadReceipt("non-existent-id"),
      ).rejects.toThrow(NotFoundException);

      expect(mockReadReceiptRepository.findOne).toHaveBeenCalledWith({
        where: { id: "non-existent-id" },
      });
    });
  });

  describe("getReadReceiptsByNotification", () => {
    it("should return read receipts for a notification", async () => {
      mockNotificationRepository.findOne = vi
        .fn()
        .mockImplementation(() => Promise.resolve(mockNotifications[0]));

      mockReadReceiptRepository.find = vi
        .fn()
        .mockImplementation(() => Promise.resolve(mockReadReceipts));

      const result = await service.getReadReceiptsByNotification("1");

      expect(result).toEqual(mockReadReceipts);
      expect(mockNotificationRepository.findOne).toHaveBeenCalledWith({
        where: { id: "1" },
      });
      expect(mockReadReceiptRepository.find).toHaveBeenCalledWith({
        where: { notificationId: "1" },
      });
    });

    it("should throw NotFoundException if notification doesn't exist", async () => {
      mockNotificationRepository.findOne = vi
        .fn()
        .mockImplementation(() => Promise.resolve(null));

      await expect(
        service.getReadReceiptsByNotification("non-existent-id"),
      ).rejects.toThrow(NotFoundException);

      expect(mockNotificationRepository.findOne).toHaveBeenCalledWith({
        where: { id: "non-existent-id" },
      });
    });

    it("should return empty array if no read receipts exist for notification", async () => {
      mockNotificationRepository.findOne = vi
        .fn()
        .mockImplementation(() => Promise.resolve(mockNotifications[0]));

      mockReadReceiptRepository.find = vi
        .fn()
        .mockImplementation(() => Promise.resolve([]));

      const result = await service.getReadReceiptsByNotification("1");

      expect(result).toEqual([]);
      expect(mockNotificationRepository.findOne).toHaveBeenCalledWith({
        where: { id: "1" },
      });
      expect(mockReadReceiptRepository.find).toHaveBeenCalledWith({
        where: { notificationId: "1" },
      });
    });
  });
});
