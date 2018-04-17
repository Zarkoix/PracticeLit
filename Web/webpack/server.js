const merge = require('webpack-merge')
const webpack = require('webpack')
const common = require('./common')
const join = require('path').join
const nodeExternals = require('../scripts/node-externals')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = merge(common, {
  name: 'server',
  target: 'node',
  externals: nodeExternals,
  entry: [
    join(__dirname, '../src/server/index')
  ],
  devtool: 'inline-source-map',
  output: {
    filename: 'app.server.js',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [{
      test: /\.styl/,
      exclude: /node_modules/,
      use: [{
        loader: 'css-loader/locals',
        options: {
          modules: true,
          localIdentName: '[name]__[local]--[hash:base64:5]'
        }
      }, {
        loader: 'stylus-loader'
      }]
    }]
  },
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1
    }),
    //  new BundleAnalyzerPlugin({ analyzerPort: 8889 })
  ]
})
