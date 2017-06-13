# webpack-if

[![Build Status](https://travis-ci.org/mzgoddard/webpack-if.svg?branch=master)](https://travis-ci.org/mzgoddard/webpack-if)

`webpack-if` provides some helper methods to create webpack configurations with tests inside of an object literal so that your configuration can mutate due to the state of the execution environment without needing to split up construction that can leading to config builders or files with hard to follow files.

## Install

Use it as a dev dependency with

```
npm install --save-dev webpack-if
```

or

```
yarn install -D webpack-if
```

## Usage

`webpack-if`'s two main helpers are its `ifElse` member and its exported function.

`ifElse` called with a condition or test returns a function that can be called with two arguments. If the condition is true the first argument is returned. Otherwise the second argument is returned.

```js
const webpackIf = require('webpack-if');

const ifProd = webpackIf.ifElse(process.env.NODE_ENV === 'production');

module.exports = {
  entry: ifProd('./src/main.prod.js', './src/main.js'),
  // ...
  plugins: [
    ifProd(() => new UglifyJsPlugin()),
  ],
};
```

`ifElse` simplest use is for testing some environment variable to determine the intent of the build. Is it for development or production where you may want to use different entry points, or plugins and other configuration.

In the above case if not part of a production build `ifProd(() => new UglifyJsPlugin())` will return `null`. Normally webpack will have an issue with `null` in the plugins array or other parts of the configuration. To help clean up those `null` values the exported value for `webpack-if` itself is a function to do that job.

```js
module.exports = webpackIf({
  // ...
});
```

Calling the `webpackIf` with the configuration as an argument will let the function recursively go through the configuraiton and remove object keys and array indices with `null` or `undefined` values. After that empty objects and arrays are also cleaned up.

Here's a possible full webpack configuration using this library.

```js
const webpackIf = require('webpack-if');

const {join} = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const wepback = require('webpack');

const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
const DefinePlugin = webpack.DefinePlugin;
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV === 'development';
}

const nodeEnv = process.env.NODE_ENV;

const ifDev = webpackIf.ifElse(nodeEnv === 'development');
const ifProd = webpackIf.ifElse(nodeEnv === 'production');

module.exports = webpackIf({
  context: __dirname,
  entry: {
    main: './src/main.js',
    vendor: ifProd(['react', 'react-dom']),
  },
  output: {
    path: join(__dirname, 'dist'),
    filename: ifProd('[name].[hash].js', '[name].js'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          presets: ['react', 'env'],
        },
      },
      {
        test: /\.css$/,
        use: ifProd(
          () => ExtractTextPlugin.extract({
            use: [{
              loader: 'css-loader',
              options: {
                modules: true,
              },
            }],
            fallback: 'style-loader',
          }),
          () => ['style-loader', {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[path][name]__[local]--[hash:base64:5]',
            },
          }],
        ),
      },
    ],
  },
  plugins: [
    ifProd(() => new UglifyJsPlugin()),
    ifProd(() => new CommonsChunkPlugin('vendor')),
    ifProd(() => new ExtractTextPlugin('[contenthash].css')),
    ifProd(() => new DefinePlugin({
      'process.env.NODE_ENV': '"production"',
    })),
    ifDev(() => new HardSourceWebpackPlugin()),
  ],
});
```
