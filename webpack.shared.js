const webpack = require('webpack');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const SITE_CONFIG = require(process.env.GEOTIFF_IO_CONFIG || './config.json');
console.log("SITE_CONFIG:", SITE_CONFIG);

const globalVars = SITE_CONFIG.colors;
globalVars['logo-dark'] = SITE_CONFIG.logo.dark;
globalVars['logo-light'] = SITE_CONFIG.logo.light;

module.exports = {
  entry: [
    'babel-polyfill',
    './src/index.js'
  ],
  resolve: {
    modules: ['node_modules', 'src'],
    extensions: ['.js', '.json']
  },
  module: {
    rules: [{
        test: /\.less$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "less-loader",
            options: {
              globalVars
            }
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader",
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['docs']),
    new CopyWebpackPlugin([{
        from: './assets/images',
        to: 'images'
      },
      {
        from: './assets/favicon.png',
        to: 'favicon.png'
      },
      {
        from: './404.html',
        to: '404.html'
      },
      {
        from: './sitemap.xml',
        to: 'sitemap.xml'
      }
    ]),
    new DefinePlugin({
      'SITE_CONFIG': JSON.stringify(SITE_CONFIG)
    }),
    new FaviconsWebpackPlugin('./assets/favicon.png'),
    new HtmlWebpackPlugin({
      template: 'index.html',
      templateParameters: {
        SITE_CONFIG
      },
      title: SITE_CONFIG.title
    })
  ],
}
