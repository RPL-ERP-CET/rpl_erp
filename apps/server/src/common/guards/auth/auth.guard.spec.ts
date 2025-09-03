import { AuthGuard } from "./auth.guard";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { UsersService } from "src/users/users.service";
import { ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { HttpArgumentsHost } from "@nestjs/common/interfaces";
import { Request } from "express";
import { User } from "src/users/users.entity";
import { Reflector } from "@nestjs/core";

// This key is typically defined in a decorator file (e.g., public.decorator.ts)
// We define it here to be used in our tests.
export const IS_PUBLIC_KEY = "skipAuth";

// Mock dependencies
const mockJwtService = { verify: vi.fn() };
const mockConfigService = { get: vi.fn() };
const mockUsersService = { getUser: vi.fn() };
const mockReflector = {
  getAllAndOverride: vi.fn(),
};

// Helper to create a mock ExecutionContext
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
    vi.clearAllMocks(); // Reset mocks before each test

    guard = new AuthGuard(
      mockJwtService as unknown as JwtService,
      mockConfigService as unknown as ConfigService,
      mockUsersService as unknown as UsersService,
      mockReflector as unknown as Reflector,
    );
  });

  it("should be defined", () => {
    expect(guard).toBeDefined();
  });

  describe("canActivate", () => {
    // --- Test for Public Routes (using Reflector) ---
    it("should return true and bypass auth for a public route", async () => {
      // Arrange: mock the reflector to return 'true' for the IS_PUBLIC_KEY
      const context = createMockExecutionContext({});
      mockReflector.getAllAndOverride.mockReturnValue(true);

      // Act: run the guard
      const result = await guard.canActivate(context);

      // Assert: expect the guard to pass and NOT call any auth-related services
      expect(result).toBe(true);
      expect(mockReflector.getAllAndOverride).toHaveBeenCalledWith(
        IS_PUBLIC_KEY,
        [context.getHandler(), context.getClass()],
      );
      expect(mockJwtService.verify).not.toHaveBeenCalled();
      expect(mockUsersService.getUser).not.toHaveBeenCalled();
    });

    // --- Tests for Protected Routes ---
    describe("when a route is protected", () => {
      // For all protected route tests, we ensure the reflector returns false
      beforeEach(() => {
        mockReflector.getAllAndOverride.mockReturnValue(false);
      });

      it("should return true for a valid token and existing user", async () => {
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

        mockJwtService.verify.mockResolvedValue({ id: mockUser.id });
        mockUsersService.getUser.mockResolvedValue(mockUser);

        const result = await guard.canActivate(context);

        expect(result).toBe(true);
        expect(request.user).toEqual(mockUser); // Ensure user is attached to request
      });

      it("should throw UnauthorizedException if authorization header is missing", async () => {
        const context = createMockExecutionContext({}); // No auth header

        await expect(guard.canActivate(context)).rejects.toThrow(
          UnauthorizedException,
        );
      });

      it("should throw UnauthorizedException if token is not Bearer", async () => {
        const context = createMockExecutionContext({
          authorization: "Basic some-other-token",
        });

        await expect(guard.canActivate(context)).rejects.toThrow(
          UnauthorizedException,
        );
      });

      it("should throw UnauthorizedException if token verification fails", async () => {
        const context = createMockExecutionContext({
          authorization: "Bearer invalid-token",
        });
        mockJwtService.verify.mockRejectedValue(new Error("jwt error"));

        await expect(guard.canActivate(context)).rejects.toThrow(
          UnauthorizedException,
        );
      });

      it("should throw UnauthorizedException if token payload has no id", async () => {
        const context = createMockExecutionContext({
          authorization: "Bearer valid-token-no-id",
        });
        mockJwtService.verify.mockResolvedValue({ sub: "123" }); // No 'id'

        await expect(guard.canActivate(context)).rejects.toThrow(
          UnauthorizedException,
        );
      });

      it("should throw an UnauthorizedException if user is not found in the database", async () => {
        const userId = "non-existent-user-id";
        const context = createMockExecutionContext({
          authorization: "Bearer valid-token",
        });

        mockJwtService.verify.mockResolvedValue({ id: userId });
        mockUsersService.getUser.mockResolvedValue(null); // Simulate user not found

        await expect(guard.canActivate(context)).rejects.toThrow(
          UnauthorizedException,
        );
        expect(mockUsersService.getUser).toHaveBeenCalledWith(userId);
      });
    });
  });
});
