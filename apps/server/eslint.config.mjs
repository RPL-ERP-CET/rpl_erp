import tseslint from "typescript-eslint";
import globals from "globals";
import jestPlugin from "eslint-plugin-jest";

export default tseslint.config(
  {
    files: ["**/*.ts", "**/*.cts", "**/*.mts"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: import.meta.dirname,
      },
      globals: { ...globals.node },
    },
  },
  {
    files: ["**/*.spec.ts", "**/*.test.ts"],
    ...jestPlugin.configs["flat/recommended"],
    rules: {
      ...jestPlugin.configs["flat/recommended"].rules,
    },
  },
);
