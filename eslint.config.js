import tseslint from "typescript-eslint";
import boundaries from "eslint-plugin-boundaries";
import oxlint from "eslint-plugin-oxlint";

export default tseslint.config(
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
  },
  {
    plugins: {
      boundaries,
    },
    settings: {
      "boundaries/elements": [
        { type: "core", pattern: "src/core/**/*" },
        { type: "ui", pattern: "src/ui/**/*" },
        { type: "pattern", pattern: "src/pattern/**/*" },
        { type: "layouts", pattern: "src/layouts/**/*" },
        { type: "features", pattern: "src/features/**/*" },
        { type: "routes", pattern: "src/routes/**/*" },
        { type: "mocks", pattern: "src/mocks/**/*" },
      ],
    },
    rules: {
      "boundaries/element-types": [
        "error",
        {
          default: "disallow",
          rules: [
            { from: ["core"], allow: ["core", "mocks"] },
            { from: ["ui"], allow: ["ui"] },
            { from: ["pattern"], allow: ["core", "ui", "pattern"] },
            { from: ["layouts"], allow: ["core", "ui", "layouts"] },
            { from: ["features"], allow: ["core", "ui", "pattern", "features"] },
            { from: ["routes"], allow: ["core", "ui", "pattern", "layouts", "features"] },
            { from: ["mocks"], allow: ["core", "mocks", "features"] },
          ],
        },
      ],
    },
  },
  ...oxlint.configs["flat/recommended"],
  {
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
    },
  }
);