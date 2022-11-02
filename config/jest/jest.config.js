import { dirname, join } from "path";
import { fileURLToPath } from "url";

const filePath = fileURLToPath(import.meta.url);
const fileDirectory = dirname(filePath);

export default {
  rootDir: join(fileDirectory, "..", ".."),
  silent: true,
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        tsconfig: join(fileDirectory, "..", "typescript", "tsconfig.json")
      }
    ]
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  testEnvironment: join(fileDirectory, "jest.environment.js")
};
