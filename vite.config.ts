import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { viteStaticCopy } from 'vite-plugin-static-copy';
import { VitePWA } from 'vite-plugin-pwa';
import { visualizer } from 'rollup-plugin-visualizer';
import viteCompression from 'vite-plugin-compression';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  build: {
    target: 'esnext',
    minify: 'terser',
    cssMinify: 'esbuild',
    sourcemap: true,
    reportCompressedSize: false,
    terserOptions: {
      compress: {
        drop_console: mode === 'production',
        drop_debugger: mode === 'production',
        pure: ['console.log'],
      },
      format: {
        comments: false,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
              return 'vendor-react';
            }
            if (id.includes('@emotion')) {
              return 'vendor-emotion';
            }
            if (id.includes('date-fns') || id.includes('lucide-react')) {
              return 'vendor-utils';
            }
            return 'vendor-other';
          }
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const name = assetInfo.name || 'asset';
          if (/(png|jpe?g|gif|svg|webp|avif)$/i.test(name)) {
            return `assets/images/[name]-[hash][extname]`;
          }
          if (/\.css$/i.test(name)) {
            return `assets/css/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
      // Configuração do Babel removida pois não é suportada diretamente pelo plugin SWC
    }),
    mode === 'development' && componentTagger(),
    
    // Geração de relatório de bundle
    mode === 'analyze' && visualizer({
      open: true,
      filename: 'bundle-analyzer.html',
      gzipSize: true,
      brotliSize: true,
    }),
    
    // Compactação de ativos Brotli
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 1024, // 1KB
      deleteOriginFile: false,
      filter: (file: string) => !file.includes('public/') // Não compactar arquivos estáticos já otimizados
    }),
    // Compactação de ativos Gzip
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 1024, // 1KB
      deleteOriginFile: false,
      filter: (file: string) => !file.includes('public/') // Não compactar arquivos estáticos já otimizados
    }),
    
    // Cópia de arquivos estáticos
    viteStaticCopy({
      targets: [
        {
          src: 'public/sitemap.xml',
          dest: '.'
        },
        {
          src: 'public/sitemap-style.xsl',
          dest: '.'
        },
        {
          src: 'public/robots.txt',
          dest: '.'
        },
        {
          src: 'public/_headers',
          dest: '.'
        },
        {
          src: 'public/_redirects',
          dest: '.'
        },
        {
          src: 'public/manifest.json',
          dest: '.'
        },
        {
          src: 'public/service-worker.js',
          dest: '.'
        },
        {
          src: 'public/register-sw.js',
          dest: '.'
        }
      ]
    }),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'favicon.ico',
        'apple-touch-icon.png',
        'masked-icon.svg',
        'robots.txt',
        'sitemap.xml',
        'sitemap-style.xsl',
        '_headers'
      ],
      manifest: {
        name: 'Blog Nexsyn',
        short_name: 'Nexsyn',
        description: 'Blog sobre tecnologia e inovação da Nexsyn',
        theme_color: '#1a365d',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/?source=pwa',
        orientation: 'portrait',
        prefer_related_applications: false,
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
          {
            src: 'pwa-maskable-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'maskable',
          },
          {
            src: 'pwa-maskable-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
        screenshots: [
          {
            src: 'screenshot-desktop.png',
            sizes: '1280x720',
            type: 'image/png',
            form_factor: 'wide',
            label: 'Homescreen do Blog Nexsyn',
          },
          {
            src: 'screenshot-mobile.png',
            sizes: '375x667',
            type: 'image/png',
            form_factor: 'narrow',
            label: 'Homescreen do Blog Nexsyn (Mobile)',
          },
        ],
        categories: ['technology', 'blog', 'education'],
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'gstatic-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 ano
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      }
    })
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
