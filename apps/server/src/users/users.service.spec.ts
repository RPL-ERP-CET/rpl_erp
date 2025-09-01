import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { NotFoundException, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "./users.service";
import { User } from "./users.entity";
import bcrypt from "bcryptjs";
import { CreateUserDto } from "./dto/create-user.dto";

describe("UsersService", () => {
  let service: UsersService;

  const mockUsers: User[] = [
    {
      id: "user-1",
      email: "user1@test.com",
      password: "hashedpassword1",
      hashPassword: () => {},
    },
    {
      id: "user-2",
      email: "user2@test.com",
      password: "hashedpassword2",
      hashPassword: () => {},
    },
  ];

  const mockUser: User = {
    id: "test-user-id",
    email: "test@email.com",
    password: bcrypt.hashSync("sharon", 10),
    hashPassword: () => {},
  };

  const mockQueryBuilder = {
    where: vi.fn().mockReturnThis(),
    addSelect: vi.fn().mockReturnThis(),
    getOne: vi.fn(),
  };

  const mockUserRepository = {
    find: vi.fn(),
    findOne: vi.fn(),
    create: vi.fn(),
    save: vi.fn(),
    remove: vi.fn(),
    createQueryBuilder: vi.fn(() => mockQueryBuilder),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);

    // Reset all mocks before each test
    vi.clearAllMocks();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("getUsers", () => {
    it("should return an array of users", async () => {
      mockUserRepository.find.mockResolvedValue(mockUsers);

      const result = await service.getUsers();

      expect(mockUserRepository.find).toHaveBeenCalledWith();
      expect(result).toEqual(mockUsers);
      expect(result).toHaveLength(2);
    });

    it("should return empty array when no users exist", async () => {
      mockUserRepository.find.mockResolvedValue([]);

      const result = await service.getUsers();

      expect(result).toEqual([]);
      expect(result).toHaveLength(0);
    });
  });

  describe("getUser", () => {
    it("should return a single user when found", async () => {
      const userId = "test-user-id";
      mockUserRepository.findOne.mockResolvedValue(mockUser);

      const result = await service.getUser(userId);

      expect(mockUserRepository.findOne).toHaveBeenCalledWith({
        where: { id: userId },
      });
      expect(result).toEqual(mockUser);
    });

    it("should throw NotFoundException when user not found", async () => {
      const userId = "non-existent-id";
      mockUserRepository.findOne.mockResolvedValue(null);

      await expect(service.getUser(userId)).rejects.toThrow(NotFoundException);
      expect(mockUserRepository.findOne).toHaveBeenCalledWith({
        where: { id: userId },
      });
    });
  });

  describe("getUserByEmail", () => {
    it("should return a user when found by email", async () => {
      const email = "test@email.com";
      mockUserRepository.findOne.mockResolvedValue(mockUser);

      const result = await service.getUserByEmail(email);

      expect(mockUserRepository.findOne).toHaveBeenCalledWith({
        where: { email },
      });
      expect(result).toEqual(mockUser);
    });

    it("should throw NotFoundException when user not found by email", async () => {
      const email = "nonexistent@email.com";
      mockUserRepository.findOne.mockResolvedValue(null);

      await expect(service.getUserByEmail(email)).rejects.toThrow(
        NotFoundException,
      );
      expect(mockUserRepository.findOne).toHaveBeenCalledWith({
        where: { email },
      });
    });
  });

  describe("comparePassword", () => {
    it("should return true for correct password", async () => {
      const email = "test@email.com";
      const password = "sharon";
      const userWithPassword = {
        ...mockUser,
        password: bcrypt.hashSync(password, 10),
      };

      mockQueryBuilder.getOne.mockResolvedValue(userWithPassword);

      const result = await service.comparePassword(email, password);

      expect(mockUserRepository.createQueryBuilder).toHaveBeenCalledWith(
        "user",
      );
      expect(mockQueryBuilder.where).toHaveBeenCalledWith(
        "user.email = :email",
        { email },
      );
      expect(mockQueryBuilder.addSelect).toHaveBeenCalledWith("user.password");
      expect(mockQueryBuilder.getOne).toHaveBeenCalled();
      expect(result).toBe(true);
    });

    it("should throw UnauthorizedException for incorrect password", async () => {
      const email = "test@email.com";
      const password = "wrongpassword";
      const userWithPassword = {
        ...mockUser,
        password: bcrypt.hashSync("correctpassword", 10),
      };

      mockQueryBuilder.getOne.mockResolvedValue(userWithPassword);

      await expect(service.comparePassword(email, password)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it("should throw NotFoundException when user not found", async () => {
      const email = "nonexistent@email.com";
      const password = "anypassword";

      mockQueryBuilder.getOne.mockResolvedValue(null);

      await expect(service.comparePassword(email, password)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe("createUser", () => {
    it("should create a new user and return the saved instance", async () => {
      const dto: CreateUserDto = {
        email: "newuser@email.com",
        password: "newpassword",
      };

      const createdUser = {
        id: "new-user-id",
        email: dto.email,
        password: dto.password, // Will be hashed by entity
        hashPassword: () => {},
      };

      mockUserRepository.create.mockReturnValue(createdUser);
      mockUserRepository.save.mockResolvedValue(createdUser);

      const result = await service.createUser(dto);

      expect(mockUserRepository.create).toHaveBeenCalledWith(dto);
      expect(mockUserRepository.save).toHaveBeenCalledWith(createdUser);
      expect(result).toEqual(createdUser);
      expect(result.email).toBe(dto.email);
    });
  });

  describe("updateUser", () => {
    it("should update an existing user", async () => {
      const userId = "test-user-id";
      const updateDto: Partial<CreateUserDto> = {
        email: "updated@email.com",
      };

      const updatedUser = {
        ...mockUser,
        ...updateDto,
      };

      mockUserRepository.findOne.mockResolvedValue(mockUser);
      mockUserRepository.save.mockResolvedValue(updatedUser);

      const result = await service.updateUser(userId, updateDto);

      expect(mockUserRepository.findOne).toHaveBeenCalledWith({
        where: { id: userId },
      });
      expect(mockUserRepository.save).toHaveBeenCalledWith({
        ...mockUser,
        ...updateDto,
      });
      expect(result).toEqual(updatedUser);
    });

    it("should throw NotFoundException when updating non-existent user", async () => {
      const userId = "non-existent-id";
      const updateDto: Partial<CreateUserDto> = {
        email: "updated@email.com",
      };

      mockUserRepository.findOne.mockResolvedValue(null);

      await expect(service.updateUser(userId, updateDto)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe("deleteUser", () => {
    it("should delete an existing user", async () => {
      const userId = "test-user-id";

      mockUserRepository.findOne.mockResolvedValue(mockUser);
      mockUserRepository.remove.mockResolvedValue(mockUser);

      await service.deleteUser(userId);

      expect(mockUserRepository.findOne).toHaveBeenCalledWith({
        where: { id: userId },
      });
      expect(mockUserRepository.remove).toHaveBeenCalledWith(mockUser);
    });

    it("should throw NotFoundException when deleting non-existent user", async () => {
      const userId = "non-existent-id";

      mockUserRepository.findOne.mockResolvedValue(null);

      await expect(service.deleteUser(userId)).rejects.toThrow(
        NotFoundException,
      );
      expect(mockUserRepository.remove).not.toHaveBeenCalled();
    });
  });
});
