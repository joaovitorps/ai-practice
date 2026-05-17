import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@core": path.resolve(__dirname, "./src/core"),
      "@ui": path.resolve(__dirname, "./src/ui"),
      "@pattern": path.resolve(__dirname, "./src/pattern"),
      "@features": path.resolve(__dirname, "./src/features"),
      "@layouts": path.resolve(__dirname, "./src/layouts"),
      "@routes": path.resolve(__dirname, "./src/routes"),
      "@mocks": path.resolve(__dirname, "./src/mocks"),
    },
  },
  projects: [
    {
      test: {
        name: "unit",
        environment: "jsdom",
        setupFiles: ["./vitest.setup.ts"],
        include: ["src/**/__specs__/**/*.spec.{ts,tsx}"],
        exclude: ["src/routes/**"],
      },
    },
    {
      test: {
        name: "browser",
        environment: "jsdom",
        setupFiles: ["./vitest.setup.ts"],
        include: ["src/ui/__specs__/**/*.spec.{ts,tsx}"],
      },
    },
    {
      test: {
        name: "integration",
        environment: "jsdom",
        setupFiles: ["./vitest.setup.ts", "./src/mocks/setup-specs.ts"],
        include: ["src/routes/__specs__/**/*.spec.{ts,tsx}"],
      },
    },
  ],
});