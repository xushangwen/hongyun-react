import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://127.0.0.1:3001',
      '/sitemap.xml': 'http://127.0.0.1:3001',
    },
  },
  build: {
    rollupOptions: {
      output: {
        // 把重型第三方库拆成独立 chunk，按页面需要加载、便于长缓存
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (id.includes('mapbox-gl')) return 'mapbox'
          if (id.includes('d3-geo') || id.includes('topojson') || id.includes('world-atlas')) return 'geo'
          if (id.includes('gsap') || id.includes('lenis')) return 'motion'
          if (/[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom|scheduler)[\\/]/.test(id)) return 'react-vendor'
        },
      },
    },
  },
})
