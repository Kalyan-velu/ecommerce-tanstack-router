import {defineConfig} from 'vite'
import {devtools} from '@tanstack/devtools-vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import {tanstackRouter} from '@tanstack/router-plugin/vite'

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    __MSW_ENABLED__: JSON.stringify(process.env.VITE_MSW === 'true'),
  },
  plugins: [
    devtools(),
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
      routeFileIgnorePattern: '(__tests__|__mocks__|.*\\.test\\.tsx?|.*\\.spec\\.tsx?)$',
    }),
    viteReact(),
    tailwindcss(),
    tsconfigPaths(),
  ]
})
