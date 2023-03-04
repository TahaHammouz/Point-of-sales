module.exports = {
  setupFilesAfterEnv: ["./src/setupTests.js"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
  transformIgnorePatterns: ["<rootDir>/node_modules/"],
  moduleFileExtensions: ["js", "jsx", "json", "node"],
  testEnvironment: "jest-environment-jsdom",
};
