import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
import { splitVendorChunkPlugin } from "vite";
import dts from "vite-plugin-dts";
import { defineConfig } from "vitest/config";

// noinspection JSUnusedGlobalSymbols
export default defineConfig({
  plugins: [dts(), splitVendorChunkPlugin(), react()],
  build: {
    lib: {
      entry: resolve(__dirname, "src", "main.tsx"),
      name: "ReactP5Wrapper"
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
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
    setupFiles: resolve(__dirname, "tests", "setup.ts")
  }
});
