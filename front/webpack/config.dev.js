/* eslint-disable */

var merge   = require('webpack-merge');
var path    = require('path')
var webpack = require('webpack')

var common = require('./common')



module.exports = merge(common, {
  module: {
    loaders: [
      {
        test: /\.sass$/,
        include: /styles/,
        loaders: [
          'style',
          'css?minimize',
          'postcss',
          'resolve-url',
          'sass?sourceMap,indentedSyntax',
        ],
      },
      {
        test: /\.scss$/,
        include: /styles/,
        loaders: [
          'style',
          'css?minimize',
          'postcss',
          'resolve-url',
          'sass?sourceMap',
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"development"',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],



  devServer: {
    contentBase: 'build',
    hot: true,
    inline: true,
    port: process.env.npm_package_config_port,
  }
})