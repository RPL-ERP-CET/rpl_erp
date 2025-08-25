import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { Repository } from "typeorm";
import { User } from "./users.entity";
import { vi } from "vitest";

const mockUser: User = {
  id: "1",
  email: "test@example.com",
  password: "hashedpassword",
  hashPassword: () => {},
};

describe("UsersController", () => {
  let controller: UsersController;
  let service: UsersService;

  // Create mock functions as separate variables
  const findMock = vi.fn().mockResolvedValue([mockUser]);
  const findOneMock = vi.fn().mockResolvedValue(mockUser);
  const createMock = vi.fn().mockReturnValue(mockUser);
  const saveMock = vi.fn().mockResolvedValue(mockUser);
  const removeMock = vi.fn().mockResolvedValue(undefined);

  // Assign the variables to the mockRepository object
  const mockRepository = {
    find: findMock,
    findOne: findOneMock,
    create: createMock,
    save: saveMock,
    remove: removeMock,
  } as unknown as Repository<User>;

  beforeEach(() => {
    // Clear mocks before each test to ensure isolation
    vi.clearAllMocks();
    service = new UsersService(mockRepository);
    controller = new UsersController(service);
  });

  it("should be defined controller and service", () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe("getUsers()", () => {
    it("should return an array of users", async () => {
      const result = await controller.getUsers();
      // Use the mock variable directly in the assertion
      expect(findMock).toHaveBeenCalled();
      expect(result).toEqual([mockUser]);
    });
  });

  describe("getUser()", () => {
    it("should return a single user by id", async () => {
      const userId = "1";
      const result = await controller.getUser(userId);

      // Use the mock variable directly in the assertion
      expect(findOneMock).toHaveBeenCalledWith({
        where: { id: userId },
      });
      expect(result).toEqual(mockUser);
    });
  });

  describe("createUser()", () => {
    it("should create a new user", async () => {
      const createUserDto: CreateUserDto = {
        email: "test@example.com",
        password: "password123",
      };

      const result = await controller.createUser(createUserDto);

      // Use the mock variables directly in the assertions
      expect(createMock).toHaveBeenCalledWith(createUserDto);
      expect(saveMock).toHaveBeenCalledWith(mockUser);
      expect(result).toEqual(mockUser);
    });
  });

  describe("updateUser()", () => {
    it("should update a user", async () => {
      const updateUserDto: Partial<CreateUserDto> = {
        email: "new@example.com",
      };
      const userId = "1";

      const result = await controller.updateUser(userId, updateUserDto);

      // Use the mock variables directly in the assertions
      expect(findOneMock).toHaveBeenCalledWith({
        where: { id: userId },
      });
      expect(saveMock).toHaveBeenCalledWith({
        ...mockUser,
        ...updateUserDto,
      });
      expect(result).toEqual(mockUser);
    });
  });

  describe("deleteUser()", () => {
    it("should delete a user", async () => {
      const userId = "1";

      await controller.deleteUser(userId);

      // Use the mock variables directly in the assertions
      expect(findOneMock).toHaveBeenCalledWith({
        where: { id: userId },
      });
      expect(removeMock).toHaveBeenCalledWith(mockUser);
    });
  });
});
