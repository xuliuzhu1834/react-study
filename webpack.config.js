/**
 * Created by brook on 16/8/11.
 */
const webpack = require('webpack');
module.exports = {
    entry: {
        app: './src/entry.jsx',
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
