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
    proxy: {
      "/api": "http://localhost:8000"
    }
  }
});

