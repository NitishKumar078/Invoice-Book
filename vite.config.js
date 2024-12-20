import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      __root: "/src", // '@' will be an alias for '/src'
    },
  },
  server: {
    port: 8000,
  },
});
