require('dotenv/config');
const progressBar = require('./.webpack/progressBar');
const appInfo = require('./.webpack/appInfo');
const bundleAnalyzer = require('./.webpack/bundleAnalyze');
const devServerSetupProxy = require('./.webpack/devServerSetupProxy');
const sentry = require('./.webpack/sentry');

const productionPlugins = process.env.NODE_ENV === 'production' ? [sentry] : [];

module.exports = {
  reactScriptsVersion: 'react-scripts',
  webpack: {
    plugins: {
      add: [appInfo, progressBar, ...productionPlugins]
    },
    configure: (webpackConfig, _env_paths) => {
      return {
        ...webpackConfig,
        plugins: [...webpackConfig.plugins, ...bundleAnalyzer(process.argv)]
      };
    }
  },
  devServer: devServerSetupProxy(process.env)
};
