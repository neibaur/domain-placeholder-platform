import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  test: {
    coverage: {
      exclude: [
        "coverage/**",
        "dist/**",
        "docs/**",
        "infra/**",
        "node_modules/**",
        "scripts/**",
        "src/**/*.d.ts",
        "src/**/*.test.ts",
      ],
      include: ["src/**/*.ts"],
      reporter: ["text", "lcov"],
    },
    include: ["src/**/*.test.ts"],
  },
});
