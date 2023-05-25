module.exports = {
  root: true,
  env: {
    browser: true,
    'jest/globals': true,
    node: true
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  plugins: [
    'jest'
  ],
  // add your custom rules here
  rules: {
    indent: 'off',
    semi: 0,
    'vue/component-name-in-template-casing': ['error', 'PascalCase'],
    'no-console': 'off',
    'no-debugger': process.env.NODE_ENV === 'development' ? 'error' : 'off',
    'vue/multi-word-component-names': 'off'
  }
}
