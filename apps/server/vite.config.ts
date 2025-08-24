import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [],
  test: {
    globals: true,
    deps: {
      interopDefault: true,
    },
    environment: "node",
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
    },
    reporters: "default",
    include: ["**/*.spec.ts"],
  },
  root: ".",
});
