import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
import { splitVendorChunkPlugin } from "vite";
import { defineConfig } from "vitest/config";

// noinspection JSUnusedGlobalSymbols
export default defineConfig({
  plugins: [splitVendorChunkPlugin(), react()],
  build: {
    emptyOutDir: false,
    lib: {
      entry: resolve(__dirname, "..", "..", "src", "main.tsx"),
      name: "ReactP5Wrapper"
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        dir: resolve(__dirname, "..", "..", "dist", "component"),
        globals: {
          react: "React",
          "react-dom": "ReactDom"
        }
      }
    }
  },
  test: {
    globals: true,
    threads: false,
    environment: "jsdom",
    setupFiles: resolve(__dirname, "..", "..", "tests", "setup.ts")
  }
});
