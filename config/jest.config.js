const { join } = require("path");

module.exports = {
  rootDir: "..",
  testEnvironment: "jsdom",
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  globals: {
    "ts-jest": {
      tsconfig: join(__dirname, "tsconfig.json")
    }
  }
};
