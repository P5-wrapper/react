import * as reactCompiler from "eslint-plugin-react-compiler";
import * as tseslint from "typescript-eslint";
import { includeIgnoreFile } from "@eslint/compat";
import eslint from "@eslint/js";
import { resolve } from "node:path";
import { dirname } from "path";
import { type ConfigArray } from "typescript-eslint";

const configDirectory: string = dirname(import.meta.dirname);
const rootDirectory: string = dirname(configDirectory);
const gitignore: string = resolve(rootDirectory, ".gitignore");

const config: ConfigArray = tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.strict,
  tseslint.configs.stylistic,
  includeIgnoreFile(gitignore),
  {
    ...reactCompiler.configs.recommended,
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: rootDirectory
      }
    }
  }
);

export default config;
