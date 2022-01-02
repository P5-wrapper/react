import typescript from "rollup-plugin-typescript2";
import { terser } from "rollup-plugin-terser";
import pkg from "../package.json";
import { join } from "path";

const input = "src/index.tsx";
const external = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {})
];
const plugins = [
  typescript({
    typescript: require("typescript"),
    tsconfig: join(__dirname, "tsconfig.json")
  }),
  terser({
    format: {
      comments: false
    }
  })
];

const config = {
  input,
  plugins,
  external
};

export default [
  {
    ...config,
    output: {
      file: pkg.module,
      format: "esm",
      sourcemap: true
    }
  },
  {
    ...config,
    output: {
      file: pkg.main,
      format: "cjs",
      sourcemap: true
    }
  }
];
