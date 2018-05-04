const merge = require('webpack-merge');
const webpack = require('webpack');
const common = require('./common');
const join = require('path').join;
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(common, {
    mode: 'development',
    name: 'client',
    target: 'web',
    entry: [
        'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=false&quiet=false&noInfo=false',
        join(__dirname, '../src/client/index')
    ],
    devtool: 'inline-source-map',
    output: {
        filename: '[name].client.js',
        chunkFilename: '[name].js'
    },
    optimization: {
    },
    plugins: [
        new webpack.HashedModuleIdsPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new BundleAnalyzerPlugin({ analyzerPort: 8888 })
    ]
});
