// Libraries
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// Files
const utils = require('./utils')
const plugins = require('../postcss.config');

// Configuration
module.exports = env => {

  return {
    context: path.resolve(__dirname, '../src'),
    entry: {
      app: './app.js'
    },
    output: {
      path: path.resolve(__dirname, '../dist'),
      publicPath: '/',
      filename: 'assets/js/[name].bundle.js'
    },
    devServer: {
      contentBase: path.resolve(__dirname, '../src'),
      // hot: true,
    },
    resolve: {
      extensions: ['.js'],
      alias: {
        source: path.resolve(__dirname, '../src'), // Relative path of src
        images: path.resolve(__dirname, '../src/assets/images'), // Relative path of images
      }
    },

    /*
      Loaders with their configurations
    */
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: [/node_modules/],
          use: [
            {
              loader: 'babel-loader'
              // options: { presets: ['es2015'] }
            }
          ]
        },
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: 'css-loader'
          })
        },
        {
          use: 'css-loader!sass-loader',
          test: /\.(sass|scss)$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                options: {
                  importLoaders: 1,
                  sourceMap: true,
                  minimize: true
                }
              },
              'postcss-loader',
              'sass-loader'
            ]
          })
        },
        {
          test: /\.pug$/,
          use: [
            {
              loader: 'pug-loader'
            }
          ]
        },
        {
          test: /\.(png|jpe?g|gif|svg|ico)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 3000,
            name: 'assets/images/[name].[ext]'
          }
        },
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 5000,
            name: 'assets/fonts/[name].[ext]'
          }
        },
        {
          test: /\.(mp4)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'assets/videos/[name].[ext]'
          }
        }
      ]
    },
    plugins: [
      new CopyWebpackPlugin([
        // { from: '../src/assets/images/favicons/manifest.json', to: 'assets/images/favicon/manifest.json' }
      ]),
      new ExtractTextPlugin({
        filename: 'assets/css/[name].bundle.css',
        allChunks: true
      }),
      /* new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor'
      }), */

      /*
        Pages
      */

      // // Desktop page
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'views/index.pug',
        inject: true
      }),

      ...utils.pages(env),

      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.$': 'jquery',
        'window.jQuery': 'jquery'
      }),
      new WebpackNotifierPlugin({
        title: 'Your project'
      })
    ]
  }
};
