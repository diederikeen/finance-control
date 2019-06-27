const merge = require('webpack-merge');
const common = require('./webpack.common.config');

const dev = merge(common, {
  mode: 'production',
});

module.exports = dev;
