module.exports = {
  env: {
    node: true,
    commonjs: true,
  },
  extends: ['eslint:recommended', 'airbnb'],
  plugins: [],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    'no-console': 'off',
    'operator-linebreak': [2, 'after'],
    'max-len': ['error', { code: 120 }],

  },
};
