# ESLint

ESLint is a static code analysis tool for identifying problematic patterns found in JavaScript code, including Typescript.

## Packages

We use the following packages:

- `eslint`: This is the core ESLint library.
- `eslint-plugin-react`: This contains some standard linting rules for React code.
- `@typescript-eslint/parser`: This allows TypeScript code to be linted.
- `@typescript-eslint/eslint-plugin`: This contains some standard linting rules for TypeScript code.
- `eslint-config-prettier`: This turns off all rules that are unnecessary or might conflict with Prettier.
- `eslint-plugin-prettier`: This runs Prettier as an ESLint rule and reports differences as individual ESLint issues.

## Configuration

ESLint is configured in a `.eslintrc` file in the project root.

The configuration file contains the following:

1. A parser that allows ESLint to understand TypeScript syntax.

```json
{
  "parser": "@typescript-eslint/parser"
}
```

2. Automatically select the React version you have installed.

```json
{
  "settings": {
    "react": {
      "version": "detect"
    }
  }
}
```

3. Register the installed plugin package for linting TypeScript.

```json
{
  "plugins": ["@typescript-eslint"]
}
```

4. Presets that extend the given ESLint configuration:

- `eslint:recommended`: This is the core eslint recommended rules.
- `plugin:react/recommended`: This plugin exports a recommended configuration that enforces React good practices.
- `plugin:@typescript-eslint/recommended`: This plugin exports all the recommended rules for TypeScript.
- `plugin:prettier/recommended`: This plugin disables all formatting-related ESLint rules, and only enables rules that detect potential bugs. Must be added as the last extension.

## Usage

Run the following script to validate the code:

```
npm run lint
```
