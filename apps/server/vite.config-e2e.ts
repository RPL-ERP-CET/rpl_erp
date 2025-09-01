import { defineConfig } from "vitest/config";

export default defineConfig(({}) => {
  return {
    plugins: [],
    test: {
      deps: {
        interopDefault: true,
      },
      environment: "node",
      coverage: {
        provider: "v8",
        reporter: ["text", "html"],
      },
      reporters: "default",
      include: ["**/*.e2e-spec.ts"],
    },
    root: ".",
  };
});
