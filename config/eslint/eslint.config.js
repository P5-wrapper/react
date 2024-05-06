import eslint from "@eslint/js";
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
    ignores: [path => path.includes("dist")]
  }
);
