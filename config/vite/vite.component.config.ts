import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
import dts from "vite-plugin-dts";
import { defineConfig } from "vitest/config";

const outputDirectory = resolve(__dirname, "..", "..", "dist", "component");

// noinspection JSUnusedGlobalSymbols
export default defineConfig({
  plugins: [
    dts({
      rollupTypes: true,
      outDir: outputDirectory
    }),
    react()
  ],
  build: {
    emptyOutDir: false,
    lib: {
      entry: resolve(__dirname, "..", "..", "src", "main.tsx"),
      name: "ReactP5Wrapper",
      fileName: "ReactP5Wrapper",
      formats: ["es", "cjs"]
    },
    rollupOptions: {
      external: ["react", "react/jsx-runtime", "react-dom", "p5"],
      output: {
        assetFileNames: "assets/[name][extname]",
        entryFileNames: "[name].[format].js",
        dir: outputDirectory,
        globals: {
          p5: "p5",
          react: "React",
          "react/jsx-runtime": "jsxRuntime",
          "react-dom": "ReactDom"
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
