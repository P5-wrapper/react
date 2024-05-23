import eslint from "@eslint/js";
import reactCompiler from "eslint-plugin-react-compiler";
import { dirname } from "path";
import tseslint from "typescript-eslint";

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: dirname(dirname(import.meta.dirname))
      }
    },
    ignores: [path => path.includes("dist")],
    plugins: {
      "react-compiler": reactCompiler
    },
    rules: {
      "react-compiler/react-compiler": "error"
    }
  }
);
