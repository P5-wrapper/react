// @ts-expect-error The react team don't expose types for the eslint plugin currently
import * as reactCompiler from "eslint-plugin-react-compiler";
import * as tseslint from "typescript-eslint";
import eslint from "@eslint/js";
import { dirname } from "path";
import { type ConfigArray } from "typescript-eslint";

const configDirectory: string = dirname(import.meta.dirname);
const rootDirectory: string = dirname(configDirectory);
const config: ConfigArray = tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.strict,
  tseslint.configs.stylistic,
  {
    ...reactCompiler.configs.recommended,
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: rootDirectory
      }
    },
    ignores: ["**/dist/**"]
  }
);

export default config;
