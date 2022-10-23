import { join } from "path";
import { terser } from "rollup-plugin-terser";
import typescript from "rollup-plugin-typescript2";

import {
  main as cjs,
  dependencies,
  module as esm,
  peerDependencies
} from "../../package.json";

const input = join(__dirname, "..", "..", "src", "index.tsx");
const external = [
  ...Object.keys(dependencies ?? {}),
  ...Object.keys(peerDependencies ?? {})
];
const plugins = [
  typescript({
    typescript: require("typescript"),
    tsconfig: join(__dirname, "..", "typescript", "tsconfig.json")
  }),
  terser({
    format: {
      comments: false
    }
  })
];

function createBundleConfiguration(filename, format) {
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

const ESM = createBundleConfiguration(esm, "esm");
const CJS = createBundleConfiguration(cjs, "cjs");

export default [ESM, CJS];
