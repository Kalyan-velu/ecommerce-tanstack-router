/// <reference types="vitest/config" />
import {defineConfig, mergeConfig} from "vitest/config"
import viteConfig from "./vite.config.ts";

export default mergeConfig(viteConfig,defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/setupTests.ts"],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'json'],
      exclude: [
        'node_modules/',
        'src/setupTests.ts',
        'src/test-utils.tsx',
        'src/vitest.d.ts',
        '**/*.test.{ts,tsx}',
        '**/*.spec.{ts,tsx}',
        'e2e/**',
        'src/routeTree.gen.ts',
        'src/main.tsx',
        'vite.config.ts',
        'vitest.config.ts',
        'vitest.config.browser.ts',
      ],
    },
  },
}))