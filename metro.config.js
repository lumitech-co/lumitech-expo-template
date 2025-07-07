/* eslint-disable import/no-extraneous-dependencies */

const { getDefaultConfig } = require('expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

/**
 * Metro configuration
 * https://docs.expo.dev/guides/monorepos/
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  ...defaultConfig,
  resolver: {
    ...defaultConfig.resolver,
    alias: {
      assets: './assets',
      api: './src/shared/api',
      hooks: './src/shared/hooks',
      lib: './src/shared/lib',
      providers: './src/shared/providers',
      services: './src/shared/services',
      stores: './src/shared/stores',
      modals: './src/shared/widgets/modals',
      themes: './src/shared/themes',
      translations: './src/shared/translations',
      types: './src/shared/types',
      ui: './src/shared/ui',
      shared: './src/shared',
      model: './src/model',
      'view-models': './src/view-models',
      widgets: './src/shared/widgets',
    },
  },
};

module.exports = config;