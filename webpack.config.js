/**
 * Created by brook on 16/8/11.
 */
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
                loaders: ['babel'],
            },
        ],
    },
};
