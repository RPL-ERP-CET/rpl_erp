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
  tseslint.configs.recommendedTypeChecked,
  {
    rules: {
      // Disable base rule to avoid conflicts
      "no-unused-vars": "off",
      // Configure TypeScript unused vars rule to ignore variables starting with _
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
        },
      ],
    },
  },
  {
    files: ["**/*.spec.ts", "**/*.test.ts"],
    rules: {
      "@typescript-eslint/unbound-method": "off",
    },
  },
]);
