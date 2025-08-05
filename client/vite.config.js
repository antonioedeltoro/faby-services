// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/",
  build: {
    emptyOutDir: true, // ✅ ensure no stale files
  },
  server: {
    proxy: {
      "/api": "http://localhost:5000",
    },
  },
});
