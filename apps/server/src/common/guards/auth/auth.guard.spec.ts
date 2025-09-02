import { AuthGuard } from "./auth.guard";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { UsersService } from "src/users/users.service";
import { ExecutionContext } from "@nestjs/common";
import { HttpArgumentsHost } from "@nestjs/common/interfaces";
import { Request } from "express";
import { User } from "src/users/users.entity";

const mockJwtService = { verifyAsync: vi.fn() };
const mockConfigService = { get: vi.fn() };
const mockUsersService = { getUser: vi.fn() };

const createMockExecutionContext = (headers: {
  [key: string]: string;
}): ExecutionContext => {
  const mockRequest = { headers, user: undefined };
  const mockHttpHost: HttpArgumentsHost = {
    getRequest: <T>(): T => mockRequest as unknown as T,
    getResponse: <T>(): T => ({}) as unknown as T,
    getNext: vi.fn(),
  };
  const mockExecutionContext: ExecutionContext = {
    switchToHttp: () => mockHttpHost,
    getClass: vi.fn(),
    getHandler: vi.fn(),
    getArgs: vi.fn(),
    getArgByIndex: vi.fn(),
    switchToRpc: vi.fn(),
    switchToWs: vi.fn(),
    getType: vi.fn(),
  };
  return mockExecutionContext;
};

describe("AuthGuard", () => {
  let guard: AuthGuard;

  beforeEach(() => {
    vi.clearAllMocks();
    guard = new AuthGuard(
      mockJwtService as unknown as JwtService,
      mockConfigService as unknown as ConfigService,
      mockUsersService as unknown as UsersService,
    );
  });

  it("should be defined", () => {
    expect(guard).toBeDefined();
  });

  describe("canActivate", () => {
    it("should return true for a valid token and user", async () => {
      const mockUser: User = {
        id: "user-123",
        email: "test@example.com",
      } as User;
      const context = createMockExecutionContext({
        authorization: "Bearer valid-token",
      });
      const request: Request & { user?: User } = context
        .switchToHttp()
        .getRequest();

      mockJwtService.verifyAsync.mockResolvedValue({ id: mockUser.id });
      mockUsersService.getUser.mockResolvedValue(mockUser);

      const result = await guard.canActivate(context);

      expect(result).toBe(true);
      expect(request.user).toEqual(mockUser);
    });

    it("should throw UnauthorizedException if payload has no id", async () => {
      const context = createMockExecutionContext({
        authorization: "Bearer valid-token-no-id",
      });

      mockJwtService.verifyAsync.mockResolvedValue({
        sub: "123",
        name: "test",
      });

      await expect(guard.canActivate(context)).rejects.toThrow(
        "Token payload is invalid",
      );
    });

    it("should throw an UnauthorizedException if user is not found", async () => {
      const userId = "non-existent-user-id";
      const context = createMockExecutionContext({
        authorization: "Bearer valid-token",
      });

      mockJwtService.verifyAsync.mockResolvedValue({ id: userId });
      mockUsersService.getUser.mockResolvedValue(null);

      await expect(guard.canActivate(context)).rejects.toThrow(
        "User not found",
      );
      expect(mockUsersService.getUser).toHaveBeenCalledWith(userId);
    });

    it("should throw UnauthorizedException if token verification fails", async () => {
      const context = createMockExecutionContext({
        authorization: "Bearer invalid-token",
      });
      mockJwtService.verifyAsync.mockRejectedValue(new Error("jwt error"));
      await expect(guard.canActivate(context)).rejects.toThrow(
        "Token verification failed",
      );
    });

    it("should throw UnauthorizedException if token is missing", async () => {
      const context = createMockExecutionContext({});
      await expect(guard.canActivate(context)).rejects.toThrow("Invalid token");
    });
  });
});
