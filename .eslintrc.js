module.exports = {
  env: {
    node: true,
    commonjs: true,
    'jest/globals': true,
  },
  extends: ['eslint:recommended', 'airbnb'],
  plugins: ['jest'],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    'no-console': 'off',
    'operator-linebreak': [2, 'after'],
    'max-len': ['error', { code: 120 }],
    'jest/no-disabled-tests': 'warn',
    'jest/no-focused-tests': 'error',
    'jest/no-identical-title': 'error',
    'jest/prefer-to-have-length': 'warn',
    'jest/valid-expect': 'error',
  },
  overrides: [
    {
      files: ['**/*.test.js'],
      env: {
        jest: true,
      },
    },
  ],
};
