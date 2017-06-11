const {join} = require('path');

const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

const webpackIf = require('./src/index');

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development';
}

// operations
const startsWith = webpackIf.op((pred, value) => pred.startsWith(value));

// environment
const nodeEnv = process.env.NODE_ENV;
const webpackVersion = require('webpack/package.json').version;

// predicates
const isEnv = webpackIf.is(nodeEnv);
const isWebpackVersion = startsWith(webpackVersion);

// tests
const ifProd = webpackIf.ifElse(isEnv('production'));
const ifWebpack1 = webpackIf.ifElse(isWebpackVersion(1));

module.exports = webpackIf({
  context: __dirname,
  entry: './src/index',
  output: {
    path: join(__dirname, 'node-4'),
    filename: 'webpack-if.js',
    libraryTarget: 'commonjs2',
  },
  devtool: 'cheap-source-map',
  target: 'node',
  externals: (context, request, callback) => {
    if (request.indexOf('!') === -1 && /^\w/.test(request)) {
      callback(null, request, 'commonjs2');
    }
    callback(null);
  },
  module: {
    [ifWebpack1('loaders', 'rules')]: [
      {
        test: /\.js$/,
        exclude: join(__dirname, 'node_modules'),
        loader: 'babel-loader?{presets:[["env",{targets:{node:4}}]]}',
      },
    ],
  },
  plugins: [
    ifProd(null, () => new HardSourceWebpackPlugin({
      cacheDirectory: join(__dirname, 'node_modules/.cache/hard-source/[config-hash]'),
      recordsPath: join(__dirname, 'node_modules/.cache/hard-source/[config-hash]/records.json'),
      configHash: require('node-object-hash')().hash,
    })),
  ],
});
