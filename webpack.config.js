'use strict'

const { ProvidePlugin } = require('webpack')
const path = require('path')

const SOURCE_DIR = path.join(__dirname, 'src')
const BUILD_DIR = path.resolve(__dirname, 'dist/')

const config = {
  context: SOURCE_DIR,
  entry: './main.js',
  output: {
    path: BUILD_DIR,
    publicPath: '/dist/',
    filename: 'bundle.js'
  },
  resolve: {
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [{
      test: /\.js(x)?$/,
      exclude: /(node_modules)/,
      loader: 'babel'
    }, {
      test: /\.css$/,
      loader: 'style!css'
    }, {
      test: /\.json$/,
      loader: 'json'
    }, {
      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'file'
    }, {
      test: /\.otf$/,
      loader: 'file'
    }, {
      test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url?prefix=font/&limit=5000'
    }, {
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url?limit=10000&mimetype=application/octet-stream'
    }, {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url?limit=10000&mimetype=image/svg+xml'
    }, {
      test: /\.(png|jp(e?)g|gif)$/,
      loader: 'file?name=images/[name].[ext]!image-webpack'
    }]
  },
  devServer: {
    historyApiFallback: true
  }
}

module.exports = config
