const chalk = require('chalk');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const green = text => {
  return chalk.green.bold(text);
};

const progressBar = new ProgressBarPlugin({
  format: `${green('Progress...')} ${green('[:bar]')}${green(
    '[:percent]'
  )}${green('[:elapsed seconds]')} - :msg`
});

module.exports = progressBar;
