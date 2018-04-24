const merge = require('webpack-merge');
const webpack = require('webpack');
const common = require('./common');
const join = require('path').join;
const nodeExternals = require('../scripts/node-externals');

module.exports = merge(common, {
    mode: 'production',
    name: 'server',
    target: 'node',
    externals: nodeExternals,
    entry: [
        'babel-polyfill',
        join(__dirname, '../src/server/index')
    ],
    devtool: 'inline-source-map',
    output: {
        filename: 'app.server.js',
        chunkFilename: '[name].js',
        libraryTarget: 'commonjs2'
    },
    plugins: [
        new webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 1
        })
    ]
});
