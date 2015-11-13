var webpack = require('webpack');
var path = require('path');
var pkg = require('./package.json');
var meta = require('./meta.json');
var publicPath = '/assets/@' + meta.vendor + '.' + pkg.name + '/';
var production = process.env.NODE_ENV === 'production';

var commonsConfig = {
  name: ['sdk-libs'],
  filename: 'storefront-[name].js',
  minChunks: Infinity,
};

module.exports = {
  entry: {
    '.': './src/index.js',
    'sdk-libs': [
      'react',
      'react-dom',
      'react-tap-event-plugin',
      'react-router',
      'react-intl',
      'react-helmet'
    ]
  },

  module: {
    preLoaders: [
      {
        test: /\.js$/,
        include: path.join(__dirname, 'src'),
        exclude: /node_modules/,
        loader: 'eslint-loader'
      }
    ],

    loaders: [
      {
        test: /\.js$/,
        include: path.join(__dirname, 'src'),
        exclude: /node_modules/,
        loader: 'babel'
      }
    ]
  },

  plugins: production ? [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.PrefetchPlugin('lodash-compat'),
    new webpack.optimize.CommonsChunkPlugin(commonsConfig),
    new webpack.SourceMapDevToolPlugin({
      filename: '[file].map',
      exclude: ['storefront-sdk-libs.js']
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({compressor: {warnings: false}})
  ] : [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.CommonsChunkPlugin(commonsConfig),
    new webpack.SourceMapDevToolPlugin({
      filename: '[file].map',
      exclude: ['storefront-sdk-libs.js']
    })
  ],

  externals: {
    'alt': 'Alt',
    'axios': 'axios',
    'immutable': 'Immutable',
    'intl': 'Intl',
    'history': 'History'
  },

  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      'constants': path.join(__dirname, '/src/constants/'),
      'services': path.join(__dirname, '/src/services/'),
      'utils': path.join(__dirname, '/src/utils/')
    }
  },

  output: {
    path: path.resolve(__dirname, './storefront/assets/'),
    publicPath: publicPath,
    filename: '[name]/' + pkg.name + '.js',
    chunkFilename: pkg.name + '-[name].js',
    jsonpFunction: 'webpackJsonp_' + meta.vendor.replace('-', '') + '_' + meta.name.replace('-', ''),
    devtoolModuleFilenameTemplate: 'webpack:///' + pkg.name + '/[resource]?[id]-[hash]'
  },

  eslint: {
    configFile: '.eslintrc'
  },

  watch: production ? false : true,

  quiet: false,

  noInfo: false
};
