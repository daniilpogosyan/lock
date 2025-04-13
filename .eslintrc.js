module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended', 'prettier'],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js', 'dist'],
  rules: {
    'prettier/prettier': ['error', {}, { usePrettierrc: true }],
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'newline-before-return': 'error',
    'no-unreachable': 'warn',
    'no-unused-vars': 'warn',
    'no-plusplus': 'off',
    'consistent-return': 'off',
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: '*', next: 'if' },
      { blankLine: 'always', prev: '*', next: 'switch' },
      { blankLine: 'always', prev: '*', next: 'case' },
      { blankLine: 'always', prev: '*', next: 'try' },
    ],
    curly: 'error',
    'no-return-await': 'error',
    'object-shorthand': 'error',
    'no-fallthrough': ['error', { allowEmptyCase: true }],
    '@typescript-eslint/explicit-member-accessibility': 'error',
    '@typescript-eslint/member-ordering': [
      'error',
      {
        default: [
          'signature',

          'public-static-field',
          'protected-static-field',
          'private-static-field',

          'public-instance-field',
          'protected-instance-field',
          'private-instance-field',

          'public-get',
          'protected-get',

          'public-set',
          'protected-set',

          'public-abstract-method',
          'protected-abstract-method',

          'public-instance-method',
          'protected-instance-method',
          'private-instance-method',
        ],
      },
    ],
  },
};
