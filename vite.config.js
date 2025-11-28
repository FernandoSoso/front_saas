import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Add this esbuild configuration to explicitly tell esbuild to treat .jsx files as tsx
  // This is crucial if esbuild is trying to parse TypeScript syntax in .jsx files
  esbuild: {
    loader: 'tsx', // Treat all .js and .jsx files as tsx
    include: /src\/.*\.(js|jsx|ts|tsx)$/, // Apply this loader to these file types
  },
})
