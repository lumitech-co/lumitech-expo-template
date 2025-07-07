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
            providers: './src/shared/providers',
            services: './src/shared/services',
            stores: './src/shared/stores',
            themes: './src/shared/themes',
            ui: './src/shared/ui',
            shared: './src/shared',
            model: './src/model',
            'view-model': './src/view-model',
            widgets: './src/shared/widgets',
          },
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      ],
    ],
  };
};