/* eslint-disable */

var autoprefixer = require('autoprefixer')
var htmlPlugin   = require('html-webpack-plugin')
var path         = require('path')



module.exports = {
  context: path.resolve('./src'),
  entry: './main.js',
  module: {
    loaders: [
      {
        test: /\.js?$/,
        loader: 'babel',
      },
      {
        test: /\.(jpg|png|svg|woff)$/,
        loader: 'file',
      },
      {
        test: /\.json$/,
        loader: 'json',
      },
    ],
  },
  output: {
    filename: '[hash].js',
    path: path.resolve('./build'),
  },
  plugins: [
    new htmlPlugin({
      minify: {
        collapseWhitespace: true,
        removeTagWhitespace: true,
      },
      template: 'index.html',
    }),
  ],
  postcss: function() {
    return [
      autoprefixer,
    ]
  },
  resolve: {
    alias: {
      assets: path.resolve('./src/assets'),
      styles: path.resolve('./src/styles'),
    },
    extensions: [
      '',
      '.js',
      '.jsx',
      '.json',
      '.sass',
      '.scss',
    ],
  },
}