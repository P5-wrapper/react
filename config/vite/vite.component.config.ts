import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
import dts from "vite-plugin-dts";
import { defineConfig } from "vitest/config";

const rootDir = resolve(__dirname, "..", "..");
const outputDirectory = resolve(rootDir, "dist", "component");
const tsConfigPath = resolve(rootDir, "tsconfig.json");
const config = defineConfig({
  plugins: [
    dts({
      rollupTypes: true,
      tsconfigPath: tsConfigPath,
      outDir: outputDirectory
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
      entry: resolve(rootDir, "src", "main.tsx"),
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
    setupFiles: resolve(rootDir, "tests", "setup.ts"),
    deps: {
      optimizer: {
        web: {
          include: ["vitest-canvas-mock"]
        }
      }
    }
  }
});

export default config;
