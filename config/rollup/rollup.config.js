// noinspection JSUnusedGlobalSymbols
import replace from "@rollup/plugin-replace";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
import { dirname, join } from "path";
import typescriptEngine from "typescript";
import { fileURLToPath } from "url";

import packageJSON from "../../package.json" assert { type: "json" };

const filePath = fileURLToPath(import.meta.url);
const fileDirectory = dirname(filePath);
const input = join(fileDirectory, "..", "..", "src", "index.tsx");
const external = [
  ...Object.keys(packageJSON.dependencies ?? {}),
  ...Object.keys(packageJSON.peerDependencies ?? {})
];
const plugins = [
  typescript({
    typescript: typescriptEngine,
    tsconfig: join(fileDirectory, "..", "typescript", "tsconfig.json")
  }),
  replace({
    preventAssignment: true,
    values: {
      "process.env.NODE_ENV": JSON.stringify("production")
    }
  }),
  terser({
    format: { comments: false }
  })
];

/**
 * Generate a valid rollup bundle configuration.
 *
 * @param {string} filename
 * @param {string} format
 *
 * @returns {import("rollup").RollupOptions}
 */
function createBundleConfiguration(filename, format) {
  const lowercaseFormat = format.toLowerCase();

  if (![packageJSON.module, packageJSON.browser].includes(filename)) {
    throw new Error(`Invalid filename provided. Received: ${filename}`);
  }

  if (!["esm", "cjs"].includes(lowercaseFormat)) {
    throw new Error(`Unrecognised output format provided. Received: ${format}`);
  }

  if (lowercaseFormat === "cjs" && filename !== packageJSON.browser) {
    throw new Error("A CJS bundle can only be created for the main bundle.");
  }

  if (lowercaseFormat === "esm" && filename !== packageJSON.module) {
    throw new Error("An ESM bundle can only be created for the module bundle.");
  }

  return {
    external,
    input,
    onwarn(warning) {
      throw new Error(warning.message);
    },
    output: {
      file: filename,
      format,
      sourcemap: true
    },
    plugins
  };
}

const ESM = createBundleConfiguration(packageJSON.module, "esm");
const CJS = createBundleConfiguration(packageJSON.browser, "cjs");

export default [ESM, CJS];
