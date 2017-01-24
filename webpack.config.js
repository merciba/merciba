'use strict'

const path = require('path'),
  webpack = require('webpack')

module.exports = {
  entry: './client.js',
  output: { path: __dirname + '/public', filename: 'index.js' },
  devtool: 'source-map',
  debug: process.env.NODE_ENV === 'development' ? true : false,
  module: {
    loaders: [
      {
        test: [/.jsx?$/, /node_modules[\\\/](?:os-locale)[\\\/]lib[\\\/](?:.+).js/],
        loader: 'babel-loader',
        exclude: /node_modules\/react-google-recaptcha/,
        query: {
          presets: ['es2015', 'stage-2', 'react'],
          plugins: ['transform-object-assign']
        }
      },
      {
        test: /.json$/,
        loader: 'json-loader'
      },
      {
        test: /.js$/,
        loader: 'string-replace',
        query: {
          search: 'for (const',     // Needed due to a Firefox bug; see:
          replace: 'for (var'       // https://bugzilla.mozilla.org/show_bug.cgi?id=1101653
        }
      }
    ]
  },
  resolveLoader: {
    root: path.join(__dirname, 'node_modules')
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({minimize: true})
  ]
};
