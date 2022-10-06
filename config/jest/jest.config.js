const { join } = require("path");

module.exports = {
  rootDir: join(__dirname, "..", ".."),
  silent: true,
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        tsconfig: join(__dirname, "..", "typescript", "tsconfig.json")
      }
    ]
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  testEnvironment: join(__dirname, "jest.environment.js")
};
