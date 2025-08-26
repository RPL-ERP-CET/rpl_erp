import { describe, it, expect, beforeEach } from "vitest";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

describe("AppController", () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(() => {
    appService = new AppService();
    appController = new AppController(appService);
  });

  it('should return "Hello World!"', () => {
    console.log(appController.getHello());
    expect(appController.getHello()).toBe("Hello World!");
  });
});
