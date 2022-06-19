const { join } = require("path");

module.exports = {
  rootDir: join(__dirname, "..", ".."),
  silent: true,
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  globals: {
    "ts-jest": {
      tsconfig: join(__dirname, "..", "typescript", "tsconfig.json")
    }
  },
  testEnvironment: join(__dirname, "jest.environment.js")
};
