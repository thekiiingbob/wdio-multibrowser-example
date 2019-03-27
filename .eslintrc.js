module.exports = {
  plugins: ['prettier', 'jest', 'sonarjs', 'eslint-config-mattermost'],
  extends: ['prettier', 'plugin:sonarjs/recommended', 'eslint:recommended'],
  parserOptions: {
    ecmaVersion: 8,
    sourceType: 'module',
    ecmaFeatures: {},
  },
  env: {
    node: true,
    es6: true,
    // commonjs: true,
  },
  globals: {
    keepAlive: true,
    browser: true,
    before: true,
    app: true,
    apps: true,
    appA: true,
    appB: true,
    appC: true,
    testrail: true,
  },
}
