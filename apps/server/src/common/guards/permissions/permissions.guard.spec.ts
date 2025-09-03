import { PermissionsGuard } from "./permissions.guard";
import { Reflector } from "@nestjs/core";
import { ExecutionContext, ForbiddenException } from "@nestjs/common";
import { HttpArgumentsHost } from "@nestjs/common/interfaces";
import { User } from "src/users/users.entity";
import { Role } from "src/roles/entities/role.entity";
import { Permission } from "src/permissions/permissions.entity";
import { PERMISSIONS_KEY } from "src/common/decorators/permission.decorator";

const mockReflector = {
  getAllAndOverride: vi.fn(),
};

const createMockUser = (permissions: string[]): User => {
  const mockPermissions: Permission[] = permissions.map(
    (name) => ({ id: name, name }) as Permission,
  );

  const mockRole: Role = {
    id: "role-1",
    name: "Mock Role",
    permissions: mockPermissions,
  } as Role;

  return {
    id: "user-123",
    email: "test@example.com",
    roles: [mockRole],
  } as User;
};

const createMockExecutionContext = (user: User | null): ExecutionContext => {
  const mockRequest = { user };

  const mockHttpHost: HttpArgumentsHost = {
    getRequest: <T>(): T => mockRequest as unknown as T,
    getResponse: <T>(): T => ({}) as unknown as T,
    getNext: vi.fn(),
  };

  const mockExecutionContext: Partial<ExecutionContext> = {
    switchToHttp: () => mockHttpHost,
    getClass: vi.fn(),
    getHandler: vi.fn(),
  };

  return mockExecutionContext as ExecutionContext;
};

describe("PermissionsGuard", () => {
  let guard: PermissionsGuard;

  beforeEach(() => {
    vi.clearAllMocks();
    guard = new PermissionsGuard(mockReflector as unknown as Reflector);
  });

  it("should be defined", () => {
    expect(guard).toBeDefined();
  });

  describe("canActivate", () => {
    it("should return true if no permissions are required for the route", () => {
      mockReflector.getAllAndOverride.mockReturnValue(undefined);
      const mockContext = createMockExecutionContext(null as never);

      const result = guard.canActivate(mockContext);

      expect(result).toBe(true);
      expect(mockReflector.getAllAndOverride).toHaveBeenCalledWith(
        PERMISSIONS_KEY,
        [mockContext.getHandler(), mockContext.getClass()],
      );
    });

    it("should return true if the user has all the required permissions", () => {
      const requiredPermissions = ["user:read", "user:write"];
      const mockUser = createMockUser(["user:read", "user:write"]);
      const mockContext = createMockExecutionContext(mockUser);
      mockReflector.getAllAndOverride.mockReturnValue(requiredPermissions);

      const result = guard.canActivate(mockContext);

      expect(result).toBe(true);
    });

    it("should return true if the user has more permissions than required", () => {
      const requiredPermissions = ["user:read"];
      const mockUser = createMockUser([
        "user:read",
        "user:write",
        "post:delete",
      ]);
      const mockContext = createMockExecutionContext(mockUser);
      mockReflector.getAllAndOverride.mockReturnValue(requiredPermissions);

      const result = guard.canActivate(mockContext);

      expect(result).toBe(true);
    });

    it("should return true if required permissions are spread across multiple user roles", () => {
      const requiredPermissions = ["user:read", "post:write"];
      const userRole: Role = { permissions: [{ name: "user:read" }] } as Role;
      const postRole: Role = { permissions: [{ name: "post:write" }] } as Role;
      const mockUser: User = { roles: [userRole, postRole] } as User;
      const mockContext = createMockExecutionContext(mockUser);
      mockReflector.getAllAndOverride.mockReturnValue(requiredPermissions);

      const result = guard.canActivate(mockContext);

      expect(result).toBe(true);
    });

    it("should throw ForbiddenException if the user is missing one of the required permissions", () => {
      const requiredPermissions = ["user:read", "user:write"];
      const mockUser = createMockUser(["user:read"]);
      const mockContext = createMockExecutionContext(mockUser);
      mockReflector.getAllAndOverride.mockReturnValue(requiredPermissions);

      expect(() => guard.canActivate(mockContext)).toThrow(ForbiddenException);
      expect(() => guard.canActivate(mockContext)).toThrow(
        "Insufficient permissions",
      );
    });

    it("should throw ForbiddenException if the user has none of the required permissions", () => {
      const requiredPermissions = ["user:read", "user:write"];
      const mockUser = createMockUser(["post:read", "post:write"]);
      const mockContext = createMockExecutionContext(mockUser);
      mockReflector.getAllAndOverride.mockReturnValue(requiredPermissions);

      expect(() => guard.canActivate(mockContext)).toThrow(ForbiddenException);
    });

    it("should throw ForbiddenException if the user has no roles or permissions", () => {
      const requiredPermissions = ["user:read"];
      const mockUser = { roles: [] } as unknown as User;
      const mockContext = createMockExecutionContext(mockUser);
      mockReflector.getAllAndOverride.mockReturnValue(requiredPermissions);

      expect(() => guard.canActivate(mockContext)).toThrow(ForbiddenException);
    });
  });
});
