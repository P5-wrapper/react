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
      emptyOutDir: false,
      rollupOptions: {
        output: {
          dir: resolve(root, "dist", "demo")
        }
      }
    }
  };
}
