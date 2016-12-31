'use strict'

const path = require('path')

module.exports = {
  entry: './client.js',
  output: { path: __dirname + '/public', filename: 'index.js' },
  devtool: 'source-map',
  debug: process.env.NODE_ENV === 'development' ? true : false,
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'stage-2', 'react']
        }
      },
      {
        test: /.json$/,
        loader: 'json-loader'
      }
    ]
  },
  resolveLoader: {
    root: path.join(__dirname, 'node_modules')
  }
};
