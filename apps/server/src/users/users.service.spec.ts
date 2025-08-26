import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { UsersService } from "./users.service";
import { User } from "./users.entity";
import bcrypt from "bcryptjs";
import { CreateUserDto } from "./dto/create-user.dto";

describe("UsersService", () => {
  let service: UsersService;

  const mockUserRepository = {
    find: vi.fn().mockResolvedValue([]),
    findOne: vi.fn().mockResolvedValue({ id: "some-id" }),
    create: vi.fn().mockImplementation(
      async (dto: CreateUserDto): Promise<User> =>
        Promise.resolve({
          id: "new-id",
          ...dto,
          password: bcrypt.hashSync(dto.password, 10),
          hashPassword: (): void => {},
        }),
    ),
    save: vi.fn().mockImplementation((user) => Promise.resolve(user)),
    remove: vi.fn().mockResolvedValue(undefined),
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
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("Get Users", () => {
    it("should return an array of users", () => {
      const result = service.getUsers();
      expect(result).toBeInstanceOf(Promise<User[]>);
    });
  });

  describe("Get User", () => {
    it("should return a single user", () => {
      const result = service.getUser("some-id");
      expect(result).toBeInstanceOf(Promise<User>);
    });
  });

  describe("Create User", () => {
    it("Should create a new user and return the instance", async () => {
      const dto: CreateUserDto = {
        email: "test@email.com",
        password: "sharon",
      };
      const result = service.createUser(dto);
      expect(result).toBeInstanceOf(Promise<User>);
      await expect(result).resolves.toHaveProperty("id");
      await expect(result).resolves.toHaveProperty("email", dto.email);
      expect(
        bcrypt.compareSync(dto.password, (await result).password),
      ).toBeTruthy();
    });
  });

  describe("Delete User", () => {
    it("Should delete a user", async () => {
      const result = service.deleteUser("some-id");
      expect(result).toBeInstanceOf(Promise<void>);
      await expect(result).resolves.toBeUndefined();
    });
  });
});
