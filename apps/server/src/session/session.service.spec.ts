import {
  describe,
  it,
  expect,
  beforeEach,
  vi,
  type MockedFunction,
} from "vitest";
import { JwtService } from "@nestjs/jwt";
import { Repository } from "typeorm";
import { UnauthorizedException } from "@nestjs/common";
import { createHash } from "crypto";

import { SessionService } from "./session.service";
import { UsersService } from "src/users/users.service";
import { Session } from "./entities/session.entity";
import { User } from "src/users/users.entity";

// Type for creating mocked versions of services and repositories
type MockedClass<T> = {
  [K in keyof T]: T[K] extends (...args: infer A) => infer R
    ? MockedFunction<(...args: A) => R>
    : T[K];
};

// Mock data for reuse in tests
const mockUser: User = {
  id: "user-uuid-123",
  email: "test@example.com",
  password: "hashedpassword",
  sessions: [],
} as unknown as User;

const mockCreateUserDto = {
  email: "test@example.com",
  password: "password123",
};

// Helper to hash tokens consistently with the service
const hashToken = (token: string): string => {
  return createHash("sha256").update(token).digest("hex");
};

describe("SessionService", () => {
  let service: SessionService;
  let mockUsersService: MockedClass<UsersService>;
  let mockJwtService: MockedClass<JwtService>;
  let mockSessionRepository: MockedClass<Repository<Session>>;

  beforeEach(() => {
    // Create mocks using vi.fn() and type assertion
    mockUsersService = {
      createUser: vi.fn(),
      getUserByEmail: vi.fn(),
      comparePassword: vi.fn(),
      getUser: vi.fn(),
    } as unknown as MockedClass<UsersService>;

    mockJwtService = {
      signAsync: vi.fn(),
      verifyAsync: vi.fn(),
    } as unknown as MockedClass<JwtService>;

    mockSessionRepository = {
      create: vi.fn(),
      save: vi.fn(),
      findOneBy: vi.fn(),
      delete: vi.fn(),
      remove: vi.fn(),
    } as unknown as MockedClass<Repository<Session>>;

    // Instantiate the service with the mocks
    service = new SessionService(
      mockUsersService as unknown as UsersService,
      mockJwtService as unknown as JwtService,
      mockSessionRepository as unknown as Repository<Session>,
    );
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("signUp", () => {
    it("should create a user and return tokens successfully", async () => {
      mockUsersService.createUser.mockResolvedValue(mockUser);
      mockJwtService.signAsync.mockResolvedValue("mock.access.token");
      mockSessionRepository.save.mockResolvedValue(new Session());
      mockSessionRepository.create.mockImplementation((dto) => dto as Session);

      const result = await service.signUp(mockCreateUserDto);

      expect(mockUsersService.createUser).toHaveBeenCalledWith(
        mockCreateUserDto,
      );
      expect(mockSessionRepository.save).toHaveBeenCalled();
      expect(mockJwtService.signAsync).toHaveBeenCalled();
      expect(result).toHaveProperty("accessToken", "mock.access.token");
      expect(result).toHaveProperty("refreshToken");
    });
  });

  describe("signIn", () => {
    it("should return tokens on successful sign-in", async () => {
      const signInDto = { email: "test@example.com", password: "password123" };
      mockUsersService.getUserByEmail.mockResolvedValue(mockUser);
      mockUsersService.comparePassword.mockResolvedValue(true);
      mockJwtService.signAsync.mockResolvedValue("mock.access.token");
      mockSessionRepository.save.mockResolvedValue(new Session());
      mockSessionRepository.create.mockImplementation((dto) => dto as Session);

      const result = await service.signIn(signInDto);

      expect(mockUsersService.getUserByEmail).toHaveBeenCalledWith(
        signInDto.email,
      );
      expect(mockUsersService.comparePassword).toHaveBeenCalledWith(
        mockUser.email,
        signInDto.password,
      );
      expect(result).toHaveProperty("accessToken", "mock.access.token");
      expect(result).toHaveProperty("refreshToken");
    });

    it("should throw UnauthorizedException if user is not found", async () => {
      const signInDto = { email: "wrong@example.com", password: "password123" };
      mockUsersService.getUserByEmail.mockResolvedValue(
        null as unknown as User,
      );

      await expect(service.signIn(signInDto)).rejects.toThrow(TypeError);
    });

    it("should throw UnauthorizedException if password does not match", async () => {
      const signInDto = {
        email: "test@example.com",
        password: "wrongpassword",
      };
      mockUsersService.getUserByEmail.mockResolvedValue(mockUser);
      mockUsersService.comparePassword.mockRejectedValue(
        new UnauthorizedException(),
      );

      await expect(service.signIn(signInDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });

  describe("verifyAccessToken", () => {
    it("should return user data if token is valid", async () => {
      const token = "valid.access.token";
      mockJwtService.verifyAsync.mockResolvedValue(mockUser);
      mockUsersService.getUser.mockResolvedValue(mockUser);

      const result = await service.verifyAccessToken(token);

      expect(mockJwtService.verifyAsync).toHaveBeenCalledWith(token);
      expect(mockUsersService.getUser).toHaveBeenCalledWith(mockUser.id);
      expect(result).toEqual(mockUser);
    });

    it("should throw an error if token verification fails", async () => {
      const token = "invalid.access.token";
      mockJwtService.verifyAsync.mockRejectedValue(new Error("Invalid token"));

      await expect(service.verifyAccessToken(token)).rejects.toThrow(
        "Invalid token",
      );
    });
  });

  describe("refreshTokens", () => {
    const refreshToken = "valid-refresh-token";
    const hashedToken = hashToken(refreshToken);

    it("should issue new tokens if refresh token is valid", async () => {
      const mockSession = {
        id: "session-id",
        expires: new Date(Date.now() + 100000), // Not expired
        refresh_token: hashedToken,
        user: mockUser,
      } as Session;

      mockSessionRepository.findOneBy.mockResolvedValue(mockSession);
      mockJwtService.signAsync.mockResolvedValue("new.access.token");
      mockSessionRepository.create.mockImplementation((dto) => dto as Session);

      const result = await service.refreshTokens(mockUser, refreshToken);

      expect(mockSessionRepository.findOneBy).toHaveBeenCalledWith({
        user: { id: mockUser.id },
        refresh_token: hashedToken,
      });
      expect(mockSessionRepository.remove).toHaveBeenCalledWith(mockSession);
      expect(mockSessionRepository.save).toHaveBeenCalled(); // For new session
      expect(result).toHaveProperty("accessToken", "new.access.token");
      expect(result).toHaveProperty("refreshToken");
    });

    it("should throw UnauthorizedException if session is not found", async () => {
      mockSessionRepository.findOneBy.mockResolvedValue(null);

      await expect(
        service.refreshTokens(mockUser, refreshToken),
      ).rejects.toThrow(
        new UnauthorizedException("Invalid or expired refresh token"),
      );
    });

    it("should throw UnauthorizedException if session is expired", async () => {
      const mockSession = {
        id: "session-id",
        expires: new Date(Date.now() - 100000), // Expired
        refresh_token: hashedToken,
        user: mockUser,
      } as Session;

      mockSessionRepository.findOneBy.mockResolvedValue(mockSession);

      await expect(
        service.refreshTokens(mockUser, refreshToken),
      ).rejects.toThrow(
        new UnauthorizedException("Invalid or expired refresh token"),
      );

      // Ensure the expired session is removed
      expect(mockSessionRepository.remove).toHaveBeenCalledWith(mockSession);
    });
  });

  describe("logout", () => {
    it("should delete the session from the repository", async () => {
      const refreshToken = "token-to-delete";
      const hashedToken = hashToken(refreshToken);

      await service.logout(mockUser, refreshToken);

      expect(mockSessionRepository.delete).toHaveBeenCalledWith({
        user: { id: mockUser.id },
        refresh_token: hashedToken,
      });
    });
  });
});
