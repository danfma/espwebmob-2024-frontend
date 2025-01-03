import react from "@vitejs/plugin-react";
import {defineConfig} from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tsconfigPaths(),
    react({
      babel: {
        plugins: ["module:@preact/signals-react-transform"]
      }
    })
  ],
  server: {
    host: "0.0.0.0",
    port: 8080,
    proxy: {
      "/api": "http://backend:8000"
    }
  }
});
