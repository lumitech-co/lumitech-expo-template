/* eslint-disable import/no-extraneous-dependencies */

const { getDefaultConfig } = require("expo/metro-config");

const defaultConfig = getDefaultConfig(__dirname);

// Add SVG to asset extensions and remove from source extensions
defaultConfig.resolver.assetExts = defaultConfig.resolver.assetExts.filter(
  ext => ext !== "svg",
);
defaultConfig.resolver.sourceExts.push("svg");

/**
 * Metro configuration
 * https://docs.expo.dev/guides/monorepos/
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  ...defaultConfig,
  transformer: {
    ...defaultConfig.transformer,
    babelTransformerPath: require.resolve("react-native-svg-transformer"),
  },
  resolver: {
    ...defaultConfig.resolver,
    alias: {
      assets: "./assets",
      api: "./src/shared/api",
      hooks: "./src/shared/hooks",
      lib: "./src/shared/lib",
      providers: "./src/shared/providers",
      services: "./src/shared/services",
      themes: "./src/shared/themes",
      ui: "./src/shared/ui",
      shared: "./src/shared",
      model: "./src/model",
      "view-model": "./src/view-model",
      widgets: "./src/shared/widgets",
    },
  },
};

module.exports = config;