const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');

const commonConfig = require('./webpack-common');

const GLOBALS = {
  'process.env': {
    NODE_ENV: JSON.stringify('development'),
  },
  __DEV__: true,
};

const config = merge(commonConfig, {
  /**
   * See: http://webpack.github.io/docs/configuration.html#devtool
   */
  devtool: 'source-map',

  entry: [
    path.resolve(__dirname, '../src/client/index'),
    'webpack-hot-middleware/client?reload=true', // only load reload middleware if running in through express.
  ],

  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader', // creates style nodes from JS strings
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'resolve-url-loader',
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          }],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
    ],
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),

    new webpack.DefinePlugin(GLOBALS),
  ],
});

module.exports = config;
