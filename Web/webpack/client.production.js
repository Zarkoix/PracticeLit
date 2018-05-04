const merge = require('webpack-merge');
const webpack = require('webpack');
const common = require('./common');
const join = require('path').join;
const StatsWebpackPlugin = require('stats-webpack-plugin');

module.exports = merge(common, {
    mode: 'production',
    name: 'client',
    target: 'web',
    entry: [
        join(__dirname, '../src/client/index')
    ],
    devtool: 'hidden-source-map',
    output: {
        filename: 'app.client.js',
        chunkFilename: '[name].js'
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    plugins: [
        new StatsWebpackPlugin('stats.json'),
    ]
});
