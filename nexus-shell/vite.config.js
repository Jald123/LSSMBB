import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'serve-sibling-static',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const folders = ['/04-STATISTICS-TOOLS', '/02-TEMPLATES'];
          const matched = folders.find(f => req.url.startsWith(f));

          if (matched) {
            const urlPath = req.url.split('?')[0];
            const fsPath = path.resolve(__dirname, '..', urlPath.slice(1));

            if (fs.existsSync(fsPath) && fs.statSync(fsPath).isFile()) {
              const mimeTypes = {
                '.html': 'text/html',
                '.js': 'text/javascript',
                '.css': 'text/css',
                '.png': 'image/png',
                '.jpg': 'image/jpeg',
                '.svg': 'image/svg+xml',
                '.json': 'application/json'
              };
              const ext = path.extname(fsPath).toLowerCase();
              res.setHeader('Content-Type', mimeTypes[ext] || 'application/octet-stream');
              res.end(fs.readFileSync(fsPath));
              return;
            }
          }
          next();
        });
      }
    }
  ],
  server: {
    port: 8080,
    fs: {
      // Allow serving files from one level up to access 04-STATISTICS-TOOLS and 02-TEMPLATES
      allow: ['..'],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@root': path.resolve(__dirname, '..'),
    },
  },
});
