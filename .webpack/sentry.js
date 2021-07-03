const packageJson = require('../package.json');
const SentryWebpackPlugin = require('@sentry/webpack-plugin');

const sentry = new SentryWebpackPlugin({
  release: packageJson.version,

  // webpack specific configuration
  // include: '.',
  include: './build',
  // urlPrefix: '~/static/js',
  ignore: [
    'node_modules',
    '.husky',
    '.storybook',
    '.webpack',
    'craco.config.js'
  ]
});
module.exports = sentry;
