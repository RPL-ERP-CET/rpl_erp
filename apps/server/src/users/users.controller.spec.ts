import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { Test, TestingModule } from "@nestjs/testing";

describe("UsersController", () => {
  let controller: UsersController;
  let service: UsersService;

  const mockService = {
    getUsers: vi.fn(),
    getUser: vi.fn(),
    createUser: vi.fn(),
    updateUser: vi.fn(),
    deleteUser: vi.fn(),
    comparePassword: vi.fn(),
    getUserByEmail: vi.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    })
      .overrideProvider(UsersService)
      .useValue(mockService)
      .compile();
    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it("should be defined controller and service", () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe("getUsers()", () => {
    it("should return an array of users", async () => {
      await controller.getUsers();
      expect(mockService.getUsers).toHaveBeenCalled();
    });
  });

  describe("getUser()", () => {
    it("should return a single user by id", async () => {
      const userId = "1";
      await controller.getUser(userId);
      expect(mockService.getUser).toHaveBeenCalledWith(userId);
    });
  });

  describe("createUser()", () => {
    it("should create a new user", async () => {
      const createUserDto: CreateUserDto = {
        email: "test@example.com",
        password: "password123",
      };

      await controller.createUser(createUserDto);
      expect(mockService.createUser).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe("updateUser()", () => {
    it("should update a user", async () => {
      const updateUserDto: Partial<CreateUserDto> = {
        email: "new@example.com",
      };
      const userId = "1";

      await controller.updateUser(userId, updateUserDto);
      expect(mockService.updateUser).toHaveBeenCalled();
    });
  });

  describe("deleteUser()", () => {
    it("should delete a user", async () => {
      const userId = "1";

      await controller.deleteUser(userId);
      expect(mockService.deleteUser).toHaveBeenCalled();
    });
  });
});
