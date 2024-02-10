import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

//  http://localhost:5110/api
//  https://cv-sender-jobs.onrender.com/api

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5110/api",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
