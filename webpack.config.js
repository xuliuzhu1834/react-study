/**
 * Created by brook on 16/8/11.
 */
const webpack = require('webpack');
module.exports = {
  entry: {
    app: ['./src/entry.jsx'],
    common: ['react', 'react-dom', 'redux', 'redux-saga', 'classnames',
      'react-redux', 'react-tap-event-plugin', 'tea-ui'],
    polyfill: ['whatwg-fetch', 'babel-polyfill'],
  },
  output: {
    path: 'dist',
    filename: '[name].bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['babel'],
      },
      {
        test: /\.css/,
        loaders: ['style', 'css'],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      process: {
        env: {
          BASE_URI: JSON.stringify('/'),
          NODE_ENV: JSON.stringify('production'),
        },
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['common', 'polyfill', 'manifest'],
      filename: '[name].chunk.js',
      minChunks: Infinity,
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false,
      },
    }),
  ],
};
