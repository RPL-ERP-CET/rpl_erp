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

  // Define mock functions for notification repository
  const createNotificationFn = vi
    .fn()
    .mockImplementation((dto: CreateNotificationDto): Partial<Notification> => {
      return { ...dto };
    });

  const findNotificationsFn = vi.fn().mockResolvedValue(mockNotifications);

  const findOneNotificationFn = vi
    .fn()
    .mockImplementation((options: { where: Record<string, string> }) => {
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
  const findOneUserFn = vi
    .fn()
    .mockImplementation((options: { where: Record<string, string> }) => {
      if (options?.where && "id" in options.where) {
        const id = options.where.id;
        const user = mockUsers.find((u) => u.id === id);
        return Promise.resolve(user || null);
      }
      return Promise.resolve(null);
    });

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
});
