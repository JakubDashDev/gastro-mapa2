module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/src/tests"],
  globalSetup: "<rootDir>/src/tests/globalSetup.ts",
  globalTeardown: "<rootDir>/src/tests/globalTeardown.ts",
  setupFilesAfterEnv: ["<rootDir>/src/tests/setupFile.ts"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },

  testRegex: "(/test/.*|(\\.|/)(test|spec))\\.tsx?$",

  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};
