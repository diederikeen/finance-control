const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const common = {
  entry: './client/index.js',
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader',
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: './client/img',
        to: path.join(__dirname, 'dist/assets/img'),
      },
    ]),
  ],
};

module.exports = common;
