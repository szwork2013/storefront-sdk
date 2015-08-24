var webpack = require('webpack');
var path = require('path');
var pkg = require('./package.json');
var meta = require('./meta.json');
var publicPath = '/assets/@' + meta.vendor + '.' + pkg.name + '/';
var production = process.env.NODE_ENV === 'production';
var hot = process.env.NODE_ENV === 'hot';
var vendor = [
  'react',
  'intl',
  'react-intl',
  'axios',
  'lodash-compat'
];
var commonsConfig = {
  name: 'vendor',
  filename: 'storefront-libs.js',
  minChunks: Infinity
};

module.exports = {
  devtool: 'sourcemap',

  watch: production ? false : true,

  entry: hot ? {
    '.': ['webpack-dev-server/client?http://0.0.0.0:3000',
          'webpack/hot/only-dev-server',
          './src/index.js'],
    'vendor': vendor
  } : {
    '.': './src/index.js',
    'vendor': vendor
  },

  externals: {
    'lodash': 'lodash'
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
    devtoolModuleFilenameTemplate: 'webpack:///' + pkg.name + '/[resource]?[id]-[hash]'
  },

  eslint: {
    configFile: '.eslintrc'
  },

  module: {
    preLoaders: [
      {
        test: /\.js$|\.jsx$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      }
    ],

    loaders: [
      {
        test: /\.js$|\.jsx$/,
        exclude: /node_modules/,
        loaders: hot ? ['react-hot', 'babel-loader?stage=0'] : ['babel-loader?stage=0']
      }
    ]
  },

  plugins: production ? [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.CommonsChunkPlugin(commonsConfig)
  ] : hot ? [
    new webpack.HotModuleReplacementPlugin()
  ] : [
    new webpack.optimize.CommonsChunkPlugin(commonsConfig)
  ],

  quiet: false,

  noInfo: false,

  devServer: {
    publicPath: publicPath,
    port: 3000,
    hot: true,
    inline: true,
    stats: {
      assets: false,
      colors: true,
      version: true,
      hash: false,
      timings: true,
      chunks: true,
      chunkModules: false
    },
    historyApiFallback: true,
    proxy: {
      '*': 'http://janus-edge.vtex.com.br/'
    }
  }
};
