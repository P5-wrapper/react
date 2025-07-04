import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
import dts from "vite-plugin-dts";
import { defineConfig } from "vitest/config";

const root = resolve(__dirname, "..", "..");
const dist = resolve(root, "dist", "component");
const tsConfig = resolve(root, "tsconfig.json");

export default defineConfig({
  plugins: [
    dts({
      rollupTypes: true,
      tsconfigPath: tsConfig,
      outDir: dist
    }),
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler", {}]]
      }
    })
  ],
  esbuild: {
    legalComments: "external"
  },
  build: {
    emptyOutDir: true,
    lib: {
      entry: resolve(root, "src", "main.tsx"),
      name: "ReactP5Wrapper",
      fileName: "ReactP5Wrapper",
      formats: ["es", "cjs"]
    },
    rollupOptions: {
      external: ["react", "react/jsx-runtime", "react-dom", "p5"],
      output: {
        assetFileNames: "assets/[name][extname]",
        entryFileNames: "[name].[format].js",
        dir: dist,
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
    setupFiles: resolve(root, "tests", "setup.ts"),
    deps: {
      optimizer: {
        web: {
          include: ["vitest-canvas-mock"]
        }
      }
    }
  }
});
