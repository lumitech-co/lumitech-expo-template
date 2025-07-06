module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin',
      [
        'babel-plugin-module-resolver',
        {
          root: ['.'],
          alias: {
            assets: './assets',
            modules: './src/modules',
            api: './src/shared/api',
            hooks: './src/shared/hooks',
            lib: './src/shared/lib',
            modals: './src/shared/widgets/modals',
            providers: './src/shared/providers',
            services: './src/shared/services',
            stores: './src/shared/stores',
            themes: './src/shared/themes',
            translations: './src/shared/translations',
            types: './src/shared/types',
            ui: './src/shared/ui',
            shared: './src/shared',
            models: './src/model',
            'view-models': './src/view-models',
            widgets: './src/shared/widgets',
          },
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      ],
    ],
  };
};