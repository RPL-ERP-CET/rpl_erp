import { Test, TestingModule } from "@nestjs/testing";
import { NotificationsService } from "./notifications.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Notification } from "./notifications.entity";
import { CreateNotificationDto } from "./dto/create-notification.dto";
import { vi } from "vitest";

describe("NotificationsService", () => {
  let service: NotificationsService;

  // Define mock functions with proper types
  const createFn = vi
    .fn()
    .mockImplementation((dto: CreateNotificationDto): Partial<Notification> => {
      return { ...dto };
    });
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

  const findFn = vi.fn().mockResolvedValue(mockNotifications);

  const saveFn = vi
    .fn()
    .mockImplementation(
      (notification: Partial<Notification>): Promise<Notification> => {
        return Promise.resolve({ id: "1", ...notification } as Notification);
      },
    );

  // Create the mock repository
  const mockRepository = {
    create: createFn,
    find: findFn,
    save: saveFn,
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationsService,
        {
          provide: getRepositoryToken(Notification),
          useValue: mockRepository,
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

    expect(mockRepository.create).toHaveBeenCalledWith(dto);
    expect(mockRepository.save).toHaveBeenCalledWith(dto);
  });
  it("should return all notifications", async () => {
    const result = await service.getAllNotifications();
    expect(result).toEqual(mockNotifications);
    expect(mockRepository.find).toHaveBeenCalled();
  });
});
