module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/essential',
    'plugin:@typescript-eslint/recommended',
    '@nuxtjs/eslint-config-typescript'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    quotes: ['warn', 'single'],
    'quote-props': 'off',
    indent: 'off',
    semi: 'off',
    'no-console': 'off',
    'no-multi-spaces': ['error'],
    'no-unused-vars': ['warn'],
    'space-before-function-paren': 'off',
    camelcase: 'off',
    '@typescript-eslint/no-unused-vars': ['warn'],
    'arrow-parens': 'off',
    '@typescript-eslint/no-empty-function': ['warn']
  }
};
