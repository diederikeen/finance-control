const merge = require('webpack-merge');
const common = require('./webpack.common.config');

const dev = merge(common, {
  mode: 'development',
  watch: true,
  devtool: 'inline-source-map',
});

module.exports = dev;
