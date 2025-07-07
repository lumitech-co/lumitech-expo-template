const js = require('@eslint/js');
const { FlatCompat } = require('@eslint/eslintrc');
const globals = require('globals');

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

module.exports = [
  {
    ignores: ['node_modules/**', 'dist/**', 'build/**', '.expo/**', '*.config.js'],
  },
  ...compat.extends(
    'plugin:react/recommended',
    'airbnb',
    'plugin:prettier/recommended',
  ),
  {
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      parser: require('@typescript-eslint/parser'),
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.es2021,
      },
    },
    plugins: {
      react: require('eslint-plugin-react'),
      'react-hooks': require('eslint-plugin-react-hooks'),
      '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
      boundaries: require('eslint-plugin-boundaries'),
    },
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
          moduleDirectory: ['node_modules', 'src/'],
        },
        typescript: {},
      },
      'boundaries/elements': [
        {
          type: 'app',
          pattern: './src/app/**',
        },
        {
          type: 'models',
          pattern: './src/model/**',
        },
        {
          type: 'view-model',
          pattern: './src/view-model/**',
        },
        {
          type: 'services',
          pattern: './src/services/**',
        },
        {
          type: 'shared',
          pattern: './src/shared/**',
        },
        {
          type: 'widgets',
          pattern: './src/shared/widgets/**',
        },
        {
          type: 'ui',
          pattern: './src/shared/ui/**',
        },
        {
          type: 'api',
          pattern: './src/shared/api/**',
        },
        {
          type: 'stores',
          pattern: './src/shared/stores/**',
        },
      ],
    },
    rules: {
      'no-console': 'warn',
      'no-param-reassign': 'off',
      'global-require': 'off',
      'no-shadow': 'off',
      'no-unused-vars': 'off',
      'default-case': 'off',
      'consistent-return': 'off',
      curly: ['error', 'all'],
      'no-negated-condition': 'error',
      'no-unneeded-ternary': 'error',
      'require-await': 'error',
      'func-style': ['error', 'expression'],
      'id-denylist': ['error', 'e', 'cb', 'i', 'err', 'el'],
      'padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: '*', next: 'return' },
        { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
        {
          blankLine: 'any',
          prev: ['const', 'let', 'var'],
          next: ['const', 'let', 'var'],
        },
        { blankLine: 'always', prev: ['case', 'default'], next: '*' },
      ],
      'linebreak-style': 0,
      'import/prefer-default-export': 0,
      'react/function-component-definition': 0,
      'react/jsx-props-no-spreading': 0,
      'react/require-default-props': 0,
      'import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: false,
          optionalDependencies: false,
          peerDependencies: false,
        },
      ],
      'no-underscore-dangle': 0,
      'no-use-before-define': 'off',
      'react/jsx-filename-extension': [
        2,
        { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
      ],
      'react/no-unstable-nested-components': ['error', { allowAsProps: true }],
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-shadow': ['off'],
      'import/extensions': [
        'error',
        'ignorePackages',
        {
          js: 'never',
          jsx: 'never',
          ts: 'never',
          tsx: 'never',
        },
      ],
      // MVVM Architecture Rules
      'boundaries/element-types': [
        2,
        {
          default: 'disallow',
          rules: [
            // App (Views) Layer Rules
            {
              from: ['app'],
              allow: ['view-model', 'widgets', 'ui', 'shared'],
              message: 'Views can only import from view-model, widgets, ui, and shared layers',
            },
            
            // View-Model Layer Rules
            {
              from: ['view-model'],
              allow: ['models', 'shared'],
              disallow: ['app', 'view-model'],
              message: 'View-model can only import from models and shared layers, not from views or other view-model',
            },
            
            // Models Layer Rules
            {
              from: ['models'],
              allow: ['shared', 'api'],
              disallow: ['app', 'view-model', 'widgets', 'ui'],
              message: 'Models can only import from shared and api layers, not from presentation layers',
            },
            
            // Services Layer Rules
            {
              from: ['services'],
              allow: ['shared', 'models'],
              disallow: ['app', 'view-model', 'widgets', 'ui'],
              message: 'Services can only import from shared and models layers',
            },
            
            // Widgets Layer Rules
            {
              from: ['widgets'],
              allow: ['ui', 'shared'],
              disallow: ['app', 'view-model', 'models', 'services'],
              message: 'Widgets can only import from ui and shared layers, not from business logic layers',
            },
            
            // UI Layer Rules
            {
              from: ['ui'],
              allow: ['shared'],
              disallow: ['app', 'view-model', 'models', 'services', 'widgets'],
              message: 'UI components can only import from shared layer',
            },
            
            // API Layer Rules
            {
              from: ['api'],
              allow: ['shared'],
              disallow: ['app', 'view-model', 'models', 'services', 'widgets', 'ui'],
              message: 'API layer can only import from shared utilities',
            },
            
            // Shared Layer Rules
            {
              from: ['shared'],
              allow: ['shared'],
              message: 'Shared modules can only import from other shared modules',
            },
            
            // Stores Layer Rules
            {
              from: ['stores'],
              allow: ['shared'],
              disallow: ['app', 'view-model', 'models', 'services', 'widgets', 'ui', 'api'],
              message: 'Stores can only import from shared utilities',
            },
          ],
        },
      ],
      // MVVM Import Restrictions
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['../app/*', '../../app/*', '**/app/*'],
              message: 'Direct imports from app layer are not allowed outside of app layer',
            },
            {
              group: ['../model/*', '../../model/*', '**/model/*'],
              message: 'Use "models/*" alias instead of relative imports to model layer',
            },
            {
              group: ['../view-model/*', '../../view-model/*', '**/view-model/*'],
              message: 'Use "view-model/*" alias instead of relative imports to view-model layer',
            },
            {
              group: ['../shared/widgets/*', '../../shared/widgets/*', '**/shared/widgets/*'],
              message: 'Use "widgets/*" alias instead of relative imports to widgets',
            },
            {
              group: ['../shared/ui/*', '../../shared/ui/*', '**/shared/ui/*'],
              message: 'Use "ui/*" alias instead of relative imports to ui components',
            },
            {
              group: ['../shared/api/*', '../../shared/api/*', '**/shared/api/*'],
              message: 'Use "api/*" alias instead of relative imports to api layer',
            },
            {
              group: ['../shared/services/*', '../../shared/services/*', '**/shared/services/*'],
              message: 'Use "services/*" alias instead of relative imports to services',
            },
          ],
        },
      ],
    },
  },
  // Allow view-model to import from each other in specific cases
  {
    files: ['**/view-model/**/index.ts'],
    rules: {
      'boundaries/element-types': [
        2,
        {
          default: 'disallow',
          rules: [
            {
              from: ['view-model'],
              allow: ['view-model', 'models', 'shared'],
              message: 'View-model index files can re-export other view-model',
            },
          ],
        },
      ],
    },
  },
  // Allow models to have internal imports
  {
    files: ['**/model/**/index.ts'],
    rules: {
      'boundaries/element-types': [
        2,
        {
          default: 'disallow',
          rules: [
            {
              from: ['models'],
              allow: ['models', 'shared', 'api'],
              message: 'Model index files can re-export other models',
            },
          ],
        },
      ],
    },
  },
  // Relax rules for shared layer index files
  {
    files: ['**/shared/**/index.ts'],
    rules: {
      'no-restricted-imports': 'off',
    },
  },
];