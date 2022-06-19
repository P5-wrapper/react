import typescript from "rollup-plugin-typescript2";
import { terser } from "rollup-plugin-terser";
import {
  dependencies,
  peerDependencies,
  module,
  main
} from "../../package.json";
import { join } from "path";

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

const ESM = createBundleConfiguration(module, "esm");
const CJS = createBundleConfiguration(main, "cjs");

export default [ESM, CJS];
