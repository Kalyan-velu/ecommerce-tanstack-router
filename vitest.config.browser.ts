/// <reference types="vitest/config" />
import {defineConfig} from 'vitest/config'
import {playwright} from "@vitest/browser-playwright";

export default defineConfig({
  test: {
    browser: {
      enabled: true,
      provider: playwright(),
      instances:[
        { browser: 'firefox' }
      ],
      headless: true,
      viewport: { width: 1280, height: 720 },
    },
    include: ['e2e/**/*.spec.ts'],
    globals: true,
  },
})
