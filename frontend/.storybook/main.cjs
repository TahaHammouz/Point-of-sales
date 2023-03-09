const path = require("path");
const cssModules = require("../config/cssModules.cjs");

module.exports = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-actions", "@storybook/addon-links"],
  webpackFinal: async (config) => {
    config.resolve.alias["src"] = path.resolve(__dirname, "../src");
    config = await cssModules()(config);
    return config;
  },
};
