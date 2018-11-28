module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module'
  },
  plugins: [
    'ember',
    'mirego'
  ],
  extends: [
    'plugin:mirego/recommended',
    'prettier'
  ],
  env: {
    es6: true
  },
  rules: {
    'ember/closure-actions': 2,
    'ember/new-module-imports': 2,
    'ember/no-global-jquery': 2,
    'ember/no-on-calls-in-components': 2,
    'ember/no-duplicate-dependent-keys': 2,
    'ember/no-side-effects': 2,
    'ember/require-super-in-init': 2,
    'ember/avoid-leaking-state-in-ember-objects': 2,
    'ember/use-brace-expansion': 2
  },
  overrides: [
    // node files
    {
      files: [
        '.eslintrc.js',
        '.template-lintrc.js',
        'ember-cli-build.js',
        'testem.js',
        'blueprints/*/index.js',
        'config/**/*.js',
        'lib/*/index.js'
      ],
      parserOptions: {
        sourceType: 'script',
        ecmaVersion: 2015
      },
      env: {
        browser: false,
        node: true
      }
    }
  ]
};
