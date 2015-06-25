var webpack = require('webpack');
var path = require('path');
var publicPath = '/assets/@vtex.storefront-flux/';

module.exports = {

  output: {
    publicPath: publicPath,
    path: path.resolve(__dirname, './storefront/assets/'),
    filename: 'storefront-flux.js'
  },

  debug: false,

  devtool: 'sourcemap',

  entry: [
    './src/storefront-flux'
  ],

  externals: {
    'storefront': 'storefront',
    'jQuery': 'jQuery'
  },

  stats: {
    colors: true,
    reasons: false
  },

  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin()
  ],

  resolve: {
    extensions: ['', '.js']
  },

  jshint: {
    esnext: true
  },

  module: {
    preLoaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'jsxhint'
    }],

    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }]
  }
};
