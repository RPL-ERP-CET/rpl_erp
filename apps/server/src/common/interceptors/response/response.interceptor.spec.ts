import type { Mock } from "vitest";
import { ResponseInterceptor } from "./response.interceptor";
import { ExecutionContext, CallHandler } from "@nestjs/common";
import { of } from "rxjs";
import { firstValueFrom } from "rxjs";

describe("ResponseInterceptor", () => {
  let interceptor: ResponseInterceptor<unknown>;
  let mockContext: ExecutionContext;
  let mockNext: CallHandler;

  const mockDate = new Date("2023-01-01T12:00:00.000Z");
  const mockTimestamp = mockDate.toISOString();

  beforeAll(() => {
    vi.useFakeTimers();
    vi.setSystemTime(mockDate);
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  beforeEach(() => {
    interceptor = new ResponseInterceptor<unknown>();

    mockContext = {} as ExecutionContext;

    mockNext = {
      handle: vi.fn(),
    };
  });

  it("should be defined", () => {
    expect(interceptor).toBeDefined();
  });

  it("should wrap an object payload", async () => {
    const data = { id: 1, name: "Test" };

    (mockNext.handle as Mock).mockReturnValue(of(data));

    const result$ = interceptor.intercept(mockContext, mockNext);

    const result = await firstValueFrom(result$);

    expect(result).toEqual({
      success: true,
      data: data,
      meta: {
        timestamp: mockTimestamp,
      },
    });
  });

  it("should wrap a primitive string payload", async () => {
    const data = "Operation successful";
    (mockNext.handle as Mock).mockReturnValue(of(data));

    const result$ = interceptor.intercept(mockContext, mockNext);
    const result = await firstValueFrom(result$);

    expect(result).toEqual({
      success: true,
      data: data,
      meta: {
        timestamp: mockTimestamp,
      },
    });
  });

  it("should wrap an array payload", async () => {
    const data = [{ id: 1 }, { id: 2 }];
    (mockNext.handle as Mock).mockReturnValue(of(data));

    const result$ = interceptor.intercept(mockContext, mockNext);
    const result = await firstValueFrom(result$);

    expect(result).toEqual({
      success: true,
      data: data,
      meta: {
        timestamp: mockTimestamp,
      },
    });
  });

  it("should wrap a null payload", async () => {
    const data = null;
    (mockNext.handle as Mock).mockReturnValue(of(data));

    const result$ = interceptor.intercept(mockContext, mockNext);
    const result = await firstValueFrom(result$);

    expect(result).toEqual({
      success: true,
      data: null,
      meta: {
        timestamp: mockTimestamp,
      },
    });
  });
});
