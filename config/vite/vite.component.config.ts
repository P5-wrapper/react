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
      external: ["react", "react-dom", "p5"],
      output: {
        dir: resolve(__dirname, "..", "..", "dist", "component"),
        globals: {
          react: "React",
          "react-dom": "ReactDom",
          p5: "p5"
        }
      }
    }
  },
  test: {
    globals: true,
    environment: "jsdom",
    coverage: {
      include: ["src"]
    },
    setupFiles: resolve(__dirname, "..", "..", "tests", "setup.ts"),
    deps: {
      optimizer: {
        web: {
          include: ["vitest-canvas-mock"]
        }
      }
    },
    onConsoleLog() {
      return false;
    }
  }
});
