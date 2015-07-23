var webpack = require('webpack');
var path = require('path');
var nodeModulesDir = path.join(__dirname, 'node_modules');
var pkg = require('./package.json');
var meta = require('./meta.json');
var publicPath = '/assets/@' + meta.vendor + '.' + pkg.name + '/';
var production = process.env.NODE_ENV === 'production';
var hot = process.env.NODE_ENV === 'hot';

module.exports = {
  devtool: 'sourcemap',

  watch: production ? false : true,

  entry: hot ? {
    '.': ['webpack-dev-server/client?http://0.0.0.0:3000',
          'webpack/hot/only-dev-server',
          './src/index.js']
  } : {
    '.': './src/index.js'
  },

  externals: {
    'react': 'React',
    'react-router': 'ReactRouter',
    'storefront': 'storefront',
    'jQuery': 'jQuery'
  },

  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      'modules': path.join(__dirname, '/src/modules/'),
      'dispatcher': path.join(__dirname, '/src/dispatcher/'),
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
    devtoolModuleFilenameTemplate: 'webpack:///' + pkg.name + '/[resource]?[hash][id]'
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
        exclude: [nodeModulesDir],
        loaders: hot ? ['react-hot', 'babel-loader?stage=0'] : ['babel-loader?stage=0']
      }
    ]
  },

  plugins: production ? [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin()
  ] : [],

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
