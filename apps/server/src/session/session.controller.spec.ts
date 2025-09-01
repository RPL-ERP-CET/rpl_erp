import { SessionController } from "./session.controller";
import { SessionService } from "./session.service";
import { UnauthorizedException } from "@nestjs/common";
import type { Response } from "express";
import { SignUpAuthDto } from "./dto/signup-session.dto";
import { User } from "src/users/users.entity";

describe("SessionController", () => {
  let controller: SessionController;
  let mockSessionService: SessionService;
  let mockResponse: Partial<Response>;

  const mockUser: User = {
    id: "user-id",
    email: "test@email.com",
    password: "hashedPassword",
    hashPassword: vi.fn(),
    createdAt: new Date(),
    updatedAt: new Date(),
  } as User;

  beforeEach(() => {
    mockSessionService = {
      signUp: vi.fn(() => ({
        accessToken: "access.token",
        refreshToken: "refresh.token",
      })),
      signIn: vi.fn(() => ({
        accessToken: "access.token",
        refreshToken: "refresh.token",
      })),
      verifyRefreshToken: vi.fn(() => ({ valid: true })),
      verifyAccessToken: vi.fn(() => ({ valid: true })),
      refreshTokens: vi.fn(() => ({
        accessToken: "new.access.token",
        refreshToken: "new.refresh.token",
      })),
      logout: vi.fn(() => undefined),
    } as unknown as SessionService;
    mockResponse = {
      status: vi.fn().mockImplementation(() => mockResponse as Response),
      json: vi.fn().mockImplementation(() => mockResponse as Response),
      cookie: vi.fn().mockImplementation(() => mockResponse as Response),
      clearCookie: vi.fn().mockImplementation(() => mockResponse as Response),
    } as unknown as Response;

    controller = new SessionController(mockSessionService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("signUp()", () => {
    it("should call sessionService.signUp and set cookie", async () => {
      const dto: SignUpAuthDto = {
        email: "test@gmail.com",
        password: "password",
      };

      const result = await controller.signUp(dto, mockResponse as Response);

      expect(mockSessionService.signUp).toHaveBeenCalledWith(dto);
      expect(mockResponse.cookie).toHaveBeenCalledWith(
        "refresh_token",
        "refresh.token",
        {
          httpOnly: true,
          secure: true,
        },
      );
      expect(result).toEqual({ accessToken: "access.token" });
    });
  });

  describe("signIn()", () => {
    it("should call sessionService.signIn and set cookie", async () => {
      const dto: SignUpAuthDto = {
        email: "test@gmail.com",
        password: "password",
      };

      const result = await controller.signIn(dto, mockResponse as Response);

      expect(mockSessionService.signIn).toHaveBeenCalledWith(dto);
      expect(mockResponse.cookie).toHaveBeenCalledWith(
        "refresh_token",
        "refresh.token",
        {
          httpOnly: true,
          secure: true,
        },
      );
      expect(result).toEqual({ accessToken: "access.token" });
    });
  });

  describe("verifyRefreshToken()", () => {
    it("should verify refresh token successfully", async () => {
      const token = "valid.refresh.token";

      const result = await controller.verifyRefreshToken(token, mockUser);

      expect(mockSessionService.verifyRefreshToken).toHaveBeenCalledWith(
        token,
        mockUser,
      );
      expect(result).toEqual({ valid: true });
    });

    it("should throw UnauthorizedException when token is missing", async () => {
      await expect(() =>
        controller.verifyRefreshToken("", mockUser),
      ).rejects.toThrow(UnauthorizedException);
    });

    it("should throw UnauthorizedException when user is missing", async () => {
      const token = "valid.refresh.token";

      await expect(() =>
        controller.verifyRefreshToken(token, null as unknown as User),
      ).rejects.toThrow(UnauthorizedException);
    });
  });

  describe("verifyAccessToken()", () => {
    it("should verify access token successfully", async () => {
      const token = "valid.access.token";

      const result = await controller.verifyAccessToken(token);

      expect(mockSessionService.verifyAccessToken).toHaveBeenCalledWith(token);
      expect(result).toEqual({ valid: true });
    });

    it("should throw UnauthorizedException when token is missing", async () => {
      await expect(() => controller.verifyAccessToken("")).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });

  describe("refreshTokens()", () => {
    it("should refresh tokens and set new cookie", async () => {
      const token = "valid.refresh.token";

      const result = await controller.refreshTokens(
        token,
        mockUser,
        mockResponse as Response,
      );

      expect(mockSessionService.refreshTokens).toHaveBeenCalledWith(
        mockUser,
        token,
      );
      expect(mockResponse.cookie).toHaveBeenCalledWith(
        "refresh_token",
        "new.refresh.token",
        {
          httpOnly: true,
          secure: true,
        },
      );
      expect(result).toEqual({ accessToken: "new.access.token" });
    });

    it("should throw UnauthorizedException when token is missing", async () => {
      await expect(() =>
        controller.refreshTokens("", mockUser, mockResponse as Response),
      ).rejects.toThrow(UnauthorizedException);
    });
  });

  describe("logout()", () => {
    it("should logout user successfully", async () => {
      const token = "valid.refresh.token";

      const result = await controller.logout(mockUser, token);

      expect(mockSessionService.logout).toHaveBeenCalledWith(mockUser, token);
      expect(result).toEqual({ message: "Logged out successfully" });
    });

    it("should throw UnauthorizedException when token is missing", async () => {
      await expect(() => controller.logout(mockUser, "")).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });
});
