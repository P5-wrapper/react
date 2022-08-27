module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:react/recommended"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: "module"
  },
  plugins: ["@typescript-eslint", "react", "simple-import-sort"],
  overrides: [
    {
      files: [".js", ".jsx", ".ts", ".tsx"]
    }
  ],
  rules: {
    "@typescript-eslint/no-explicit-any": "off",
    "linebreak-style": ["error", "unix"],
    "simple-import-sort/exports": "error",
    "simple-import-sort/imports": "error"
  },
  settings: {
    react: {
      version: "detect"
    }
  }
};
