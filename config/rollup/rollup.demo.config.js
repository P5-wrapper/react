import resolve from "@rollup/plugin-node-resolve";
import typescript from "rollup-plugin-typescript2";
import { join } from "path";
import { terser } from "rollup-plugin-terser";
import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import replace from "@rollup/plugin-replace";
import postcss from "rollup-plugin-postcss";
import htmlTemplate from "rollup-plugin-generate-html-template";
import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";

const extensions = [".js", ".jsx", ".ts", ".tsx"];
const NODE_ENV = process.env.NODE_ENV;
const isServe = process.env.ROLLUP_WATCH || false;

const plugins = [
  resolve({ extensions }),
  commonjs(),
  typescript({
    typescript: require("typescript"),
    tsconfig: join(__dirname, "..", "typescript", "tsconfig.json"),
    tsconfigOverride: {
      compilerOptions: {
        declaration: false
      }
    }
  }),
  babel({
    babelrc: false,
    babelHelpers: "bundled",
    exclude: "../../node_modules/**",
    include: ["src/**/*", "example/**/*"],
    presets: [
      "@babel/preset-react",
      "@babel/preset-typescript",
      "@babel/preset-env"
    ]
  }),
  terser({
    format: {
      comments: false
    }
  }),
  replace({
    "process.env.NODE_ENV": JSON.stringify(NODE_ENV),
    preventAssignment: true
  }),
  postcss({
    inject: true,
    minimize: true
  }),
  htmlTemplate({
    template: "example/index.html",
    target: "index.html",
    attrs: ["defer"]
  }),
  ...(isServe
    ? [
        serve({
          open: true,
          port: 3001,
          historyApiFallback: true,
          contentBase: "dist/demo"
        }),
        livereload({
          watch: "dist/demo"
        })
      ]
    : [])
];

export default {
  input: "example/app.jsx",
  plugins,
  output: {
    format: "esm",
    chunkFileNames: "[name].[hash].js",
    entryFileNames: "[name].[hash].js",
    dir: "dist/demo"
  },
  watch: {
    exclude: ["node_modules/**"]
  },
  onwarn: warning => {
    throw new Error(warning.message);
  }
};
