module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    `@vue/eslint-config-typescript/recommended`,
    `eslint:recommended`,
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    '@typescript-eslint/ban-ts-comment': 1,
    semi: [`error`, `never`],
    indent: [`error`, 2, { SwitchCase: 1 }],
    curly: [`error`, `all`],
    quotes: [
      `error`,
      `backtick`,
      {
        avoidEscape: true,
        allowTemplateLiterals: true,
      },
    ],
  },
  settings: {
    "import/resolver": {
      alias: {
        map: [
          [`@`, `./src`],
        ],
        extensions: [`.js`, `.ts`, `.vue`],
      }
    },
  },
}