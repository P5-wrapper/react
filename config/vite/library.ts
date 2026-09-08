import react from "@vitejs/plugin-react";
import { posix, resolve } from "node:path";
import { UserConfig } from "vite";
import dts from "vite-plugin-dts";

export function library(root: string): UserConfig {
  const dist = resolve(root, "dist", "component");

  return {
    plugins: [
      dts({
        bundleTypes: true,
        tsconfigPath: resolve(root, "tsconfig.json")
      }),
      react()
    ],
    build: {
      emptyOutDir: true,
      lib: {
        entry: resolve(root, "src", "main.tsx"),
        name: "P5Canvas",
        fileName: format => (format === "es" ? "main.mjs" : "main.cjs"),
        formats: ["es", "cjs"]
      },
      rollupOptions: {
        external: [
          "react",
          "react/jsx-runtime",
          "react-dom",
          "p5",
          "@p5-wrapper/common"
        ],
        output: {
          assetFileNames: "assets/[name][extname]",
          dir: dist,
          globals: {
            p5: "p5",
            react: "React",
            "react/jsx-runtime": "jsxRuntime",
            "react-dom": "ReactDom",
            "@p5-wrapper/common": "P5WrapperCommon"
          }
        }
      }
    },
    test: {
      globals: true,
      silent: true,
      environment: "happy-dom",
      coverage: {
        include: [posix.join("src", "**/*.{ts,tsx,js,jsx}")],
        reporter: ["text-summary", "html", "clover"]
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
  };
}
