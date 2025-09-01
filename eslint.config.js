import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores([
    "**/*.next",
    "**/dist/**",
    "**/*.config.mjs",
    "**/*.js",
    "**/node_modules/**",
    "**/tsconfig.json",
    "**/tsconfig.*.json",
  ]),
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  ...tseslint.configs.recommendedTypeChecked,
  {
    files: ["**/*.spec.ts", "**/*.test.ts"],
    rules: {
      "@typescript-eslint/unbound-method": "off",
    },
  },
]);
