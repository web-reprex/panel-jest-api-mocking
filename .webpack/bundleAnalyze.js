const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;
function bundleAnalyzer(args) {
  return args.includes('--bundle-analyze') ? [new BundleAnalyzerPlugin()] : [];
}
module.exports = bundleAnalyzer;
