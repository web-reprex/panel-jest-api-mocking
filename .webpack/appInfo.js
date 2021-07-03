const webpack = require('webpack');
const packageJson = require('../package.json');
const projectName = packageJson.name || 0;
const version = packageJson.version || 0;

// show app info
console.log(`Running Mode:${process.env.NODE_ENV}`);
console.log(`App: ${projectName} v${version}`);

const appInfo = new webpack.DefinePlugin({
  'process.env': {
    PACKAGE_VERSION: '"' + version + '"',
    PACKAGE_NAME: '"' + projectName + '"'
  }
});
module.exports = appInfo;
