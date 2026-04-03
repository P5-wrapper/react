import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
import { UserConfig } from "vite";

export function demo(root: string): UserConfig {
  return {
    root: resolve(root, "demo"),
    base: "./",
    plugins: [react()],
    preview: { open: true },
    build: {
      chunkSizeWarningLimit: 1200,
      emptyOutDir: false,
      rollupOptions: {
        output: {
          dir: resolve(root, "dist", "demo"),
          manualChunks: moduleId => {
            if (moduleId.includes("node_modules/p5")) {
              return "p5";
            }
          }
        }
      }
    }
  };
}
