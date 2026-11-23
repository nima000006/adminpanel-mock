import js from "@eslint/js";
import tsParser from "@typescript-eslint/parser";
import prettierConfig from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";
import prettier from "eslint-plugin-prettier";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: [
      "dist",
      "dist-ssr",
      "dev-dist",
      "node_modules/",
      "build/",
      "coverage/",
      ".cache/",
      "stats.html",
      "**/*.min.js",
      "public/sw.js",
    ],
  },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      prettierConfig,
    ],
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
      globals: {
        ...globals.browser,
        ...globals.es2022,
        React: "readonly",
      },
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      prettier,
      import: importPlugin,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "react/react-in-jsx-scope": "off",
      "prettier/prettier": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          args: "all",
          argsIgnorePattern: "^_",
          caughtErrors: "all",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
      "no-console": ["error", { allow: ["warn", "error"] }],
      // Import ordering
      "import/order": [
        "warn",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            ["parent", "sibling"],
            "index",
            "type",
          ],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
          pathGroups: [
            { pattern: "react", group: "external", position: "before" },
            { pattern: "@infra/**", group: "internal" },
            { pattern: "@components/**", group: "internal" },
            { pattern: "@pages/**", group: "internal" },
            { pattern: "@assets/**", group: "internal" },
          ],
          pathGroupsExcludedImportTypes: ["react"],
        },
      ],
      // Performance-related rules
      "react/jsx-no-constructed-context-values": "error",
      "react/jsx-no-useless-fragment": "warn",
      "react/no-array-index-key": "warn",
      // TypeScript specific - override defaults to be warnings only
      "@typescript-eslint/no-non-null-assertion": "off", // Allow ! for DOM elements
      "@typescript-eslint/no-empty-function": "off", // Allow empty functions (common in React for optional callbacks)
      "@typescript-eslint/no-inferrable-types": "warn", // Warn about redundant type annotations
      "@typescript-eslint/prefer-as-const": "warn",
      "@typescript-eslint/prefer-for-of": "warn", // Prefer for-of loops (not critical)
      // Disable stylistic rules that would require major refactoring
      "@typescript-eslint/array-type": "off", // Don't enforce array syntax (T[] vs Array<T>)
      "@typescript-eslint/consistent-type-definitions": "off", // Allow both type and interface
      "@typescript-eslint/consistent-indexed-object-style": "off", // Allow index signatures
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  }
);
