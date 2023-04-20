import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
import { defineConfig } from "vitest/config";

// noinspection JSUnusedGlobalSymbols
export default defineConfig({
  root: resolve(__dirname, "..", "..", "demo"),
  base: "./",
  plugins: [react()],
  preview: {
    open: true
  },
  build: {
    emptyOutDir: false,
    rollupOptions: {
      output: {
        dir: resolve(__dirname, "..", "..", "dist", "demo")
      }
    }
  }
});
