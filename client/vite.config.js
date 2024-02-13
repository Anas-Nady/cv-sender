import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

//  http://localhost:5110/api
//  https://cv-sender-afaq.onrender.com/api

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://cv-sender-afaq.onrender.com/api",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
