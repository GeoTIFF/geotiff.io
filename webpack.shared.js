const webpack = require('webpack');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
    rules: [
      {
        test: /\.less$/,
        use: [
          "style-loader",
          "css-loader",
          "less-loader"
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
    new CleanWebpackPlugin(['dist']),
    new CopyWebpackPlugin([
      {
        from: './assets/images',
        to: 'images',
      }
    ]),
    new FaviconsWebpackPlugin('./assets/favicon.png'),
    new HtmlWebpackPlugin({
      template: 'index.html',
      title: 'GeoTIFF.io',
    })
  ],
}
