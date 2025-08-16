import react from "@vitejs/plugin-react";
import { posix, resolve } from "node:path";
import { UserConfig } from "vite";
import dts from "vite-plugin-dts";

export function library(root: string): UserConfig {
  const dist = resolve(root, "dist", "component");

  return {
    plugins: [
      dts({
        rollupTypes: true,
        tsconfigPath: resolve(root, "tsconfig.json"),
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
