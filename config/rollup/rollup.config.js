import { dirname, join } from "path";
import { terser } from "rollup-plugin-terser";
import typescript from "rollup-plugin-typescript2";
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
  terser({
    format: {
      comments: false
    }
  })
];

function createBundleConfiguration(filename, format) {
  console.log(filename, format);
  /** @type {import("rollup").RollupOptions} */
  return {
    input,
    plugins,
    external,
    output: {
      file: filename,
      format,
      sourcemap: true
    },
    onwarn: warning => {
      throw new Error(warning.message);
    }
  };
}

const ESM = createBundleConfiguration(packageJSON.module, "esm");
const CJS = createBundleConfiguration(packageJSON.main, "cjs");

export default [ESM, CJS];
