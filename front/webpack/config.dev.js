/* eslint-disable */

var merge   = require('webpack-merge');
var path    = require('path')
var webpack = require('webpack')

var common = require('./common')



module.exports = merge(common, {
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loaders: [
          'style',
          'css?sourceMap&-minimize&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
          'postcss',
          'sass?sourceMap'
        ],
      },
      {
        test: /\.css$/,
        loaders: [
          'style',
          'css?sourceMap&-minimize&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
          'postcss'
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