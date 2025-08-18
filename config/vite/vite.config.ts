import { resolve } from "node:path";
import { UserConfig } from "vite";
import { defineConfig } from "vitest/config";

import { common } from "./common";
import { demo } from "./demo";
import { library } from "./library";

const root = resolve(__dirname, "..", "..");

export default defineConfig(({ mode }): UserConfig => {
  const isVitest = process.env.VITEST === "true";
  const config = isVitest || mode === "lib" ? library : demo;

  return {
    ...common(root),
    ...config(root)
  } satisfies UserConfig;
});
