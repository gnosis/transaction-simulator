import { reactRouter } from '@react-router/dev/vite'
import { cloudflareDevProxy } from '@react-router/dev/vite/cloudflare'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import openGraph from 'vite-plugin-open-graph'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vite.dev/config/
export default defineConfig(({ isSsrBuild }) => ({
  plugins: [
    cloudflareDevProxy({
      getLoadContext({ context }) {
        return { cloudflare: context.cloudflare }
      },
    }),
    tailwindcss(),
    reactRouter(),
    tsconfigPaths(),
    openGraph({
      basic: {
        type: 'website',
        title: 'Gnosis Guild',
        description: 'Zodiac Pilot — Batch and simulate transactions',
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Gnosis Guild',
        description: 'Zodiac Pilot — Batch and simulate transactions',
      },
    }),
  ],
  server: {
    port: 3050,
  },
  build: {
    manifest: true,
    rollupOptions: isSsrBuild
      ? {
          input: './workers/app.ts',
        }
      : undefined,
  },
  define: {
    'process.env': {},
  },
}))
