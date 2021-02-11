module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.tsx', '.json', '.ts'],
        paths: ['services'],
      },
    },
    'import/no-extraneous-dependencies': [
      'error', { packageDir: './' },
    ],
  },
  plugins: ['react', '@typescript-eslint/eslint-plugin'],
  rules: {
    'no-use-before-define': 'off',
    'react/prop-types': 'off',
    'no-redeclare': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
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
    'react/jsx-filename-extension': [
      1,
      { extensions: ['.js', '.jsx', '.tsx'] },
    ],
  },
};
