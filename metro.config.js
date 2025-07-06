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
      api: './shared/api',
      hooks: './shared/hooks',
      lib: './shared/lib',
      providers: './shared/providers',
      services: './shared/services',
      stores: './shared/stores',
      modals: './shared/modals',
      themes: './shared/themes',
      translations: './shared/translations',
      types: './shared/types',
      ui: './shared/ui',
      shared: './shared',
    },
  },
};

module.exports = config;