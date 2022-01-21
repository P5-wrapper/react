module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    "eslint:recommended",
    "plugin:prettier/recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: "module"
  },
  plugins: ["prettier", "react", "@typescript-eslint", "simple-import-sort"],
  overrides: [
    {
      files: [".js", ".jsx", ".ts", ".tsx"]
    }
  ],
  rules: {
    indent: ["error", 2],
    "linebreak-style": ["error", "unix"],
    "simple-import-sort/exports": "error",
    "simple-import-sort/imports": "error",
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "@typescript-eslint/no-explicit-any": "off"
  },
  settings: {
    react: {
      version: "detect"
    }
  }
};
