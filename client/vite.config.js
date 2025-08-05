// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/", // ✅ This is what fixes blank page issues in production
  server: {
    proxy: {
      "/api": "http://localhost:5000",
    },
  },
});
