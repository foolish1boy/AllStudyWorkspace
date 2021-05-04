module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    "@typescript-eslint/no-this-alias": ["off"],
    "vue/no-unused-vars":["off"],
    "@typescript-eslint/no-unused-vars":['off'],
    "@typescript-eslint/no-empty-function":['off'],
    "@typescript-eslint/no-explicit-any":['off'],
    "@typescript-eslint/no-inferrable-types":['off'],
    "@typescript-eslint/ban-types":['off'],
    "no-irregular-whitespace":['off'],
    'vue/no-unused-components':['off'],
    '@typescript-eslint/no-empty-interface':['off'],
    "no-empty":['off'],
    "prefer-const":['off'],

  }
}
