/**
 * Created by brook on 16/8/11.
 */
const webpack = require('webpack');
module.exports = {
  entry: {
    app: ['./src/entry.jsx', 'whatwg-fetch'],
  },
  output: {
    path: 'dist',
    filename: '[name].bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.js(x$|$)/,
        exclude: /node_modules/,
        loaders: ['babel'],
      },
      {
        test: /\.css/,
        loaders: ['style', 'css'],
      },
    ],
  },
  // plugins: [
  //     new webpack.optimize.UglifyJsPlugin({
  //         minimize: true,
  //         compress: {
  //             warnings: false,
  //         }
  //     })
  // ]
};
