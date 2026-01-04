/// <reference types="vitest/config" />
import {defineConfig, mergeConfig} from 'vitest/config'
import {playwright} from "@vitest/browser-playwright";
import viteConfig from "./vite.config.ts";

export default mergeConfig(viteConfig,defineConfig({

  test: {
    setupFiles: ["./e2e/setup.browser.ts"],
    browser: {
      enabled: true,
      provider: playwright(),
      instances:[
        { browser: 'firefox' }
      ],
      viewport: { width: 1280, height: 720 },
    },
    include: ['e2e/**/*.spec.ts','e2e/**/*.spec.tsx'],
    globals: true,
  },
}))
