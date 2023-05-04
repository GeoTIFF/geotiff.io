const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const shared = require('./webpack.shared');
const OfflinePlugin = require('offline-plugin');
const CnameWebpackPlugin = require('cname-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");

const SITE_CONFIG = require(process.env.GEOTIFF_IO_CONFIG || './config.json');

const prod = {
  mode: 'production',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'docs'),
    publicPath: '/'
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  plugins: [
    new OfflinePlugin({
      externals: [
        'https://unpkg.com/leaflet@1.0.3/dist/leaflet.css',
        'https://cdnjs.cloudflare.com/ajax/libs/leaflet.draw/0.4.12/leaflet.draw.css',
        'https://fonts.googleapis.com/css?family=Lalezar|Open+Sans:400,600,700',
        'https://d3js.org/d3.v4.min.js',
        'https://unpkg.com/leaflet@1.0.3/dist/leaflet.js',
        'https://unpkg.com/geotiff@0.4.1/dist/geotiff.browserify.min.js',
        'https://unpkg.com/leaflet-providers@1.1.17/leaflet-providers.js',
        'https://ihcantabria.github.io/Leaflet.CanvasLayer.Field/dist/leaflet.canvaslayer.field.js',
        'https://fonts.googleapis.com/icon?family=Material+Icons',
        'https://cdnjs.cloudflare.com/ajax/libs/chroma-js/1.3.0/chroma.min.js',
        'https://unpkg.com/leaflet-geosearch@2.4.0/dist/style.css',
        'https://unpkg.com/leaflet-geosearch@2.4.0/assets/css/leaflet.css',
        'https://unpkg.com/sweetalert@1.1.3/dist/sweetalert.min.js',
        'https://unpkg.com/sweetalert@1.1.3/dist/sweetalert.css',
        'https://fonts.gstatic.com/s/lalezar/v4/zrfl0HLVx-HwTP82Yaf4Iw.woff2',
        'https://fonts.gstatic.com/s/materialicons/v41/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2',
        'https://fonts.gstatic.com/s/opensans/v15/mem8YaGs126MiZpBA-UFVZ0b.woff2',
        'https://fonts.gstatic.com/s/opensans/v15/mem5YaGs126MiZpBA-UN7rgOUuhp.woff2',
        'https://fonts.gstatic.com/s/opensans/v15/mem5YaGs126MiZpBA-UNirkOUuhp.woff2',
        'https://unpkg.com/leaflet@1.0.3/dist/images/marker-icon.png',
        'https://unpkg.com/leaflet@1.0.3/dist/images/marker-shadow.png',
        'https://unpkg.com/leaflet@1.0.3/dist/images/marker-icon.png',
        'https://a.tile.openstreetmap.org/2/0/0.png',
        'https://b.tile.openstreetmap.org/2/0/1.png',
        'https://c.tile.openstreetmap.org/2/0/2.png',
        'https://a.tile.openstreetmap.org/2/0/3.png',
        'https://b.tile.openstreetmap.org/2/1/0.png',
        'https://c.tile.openstreetmap.org/2/1/1.png',
        'https://a.tile.openstreetmap.org/2/1/2.png',
        'https://b.tile.openstreetmap.org/2/1/3.png',
        'https://c.tile.openstreetmap.org/2/2/0.png',
        'https://a.tile.openstreetmap.org/2/2/1.png',
        'https://b.tile.openstreetmap.org/2/2/2.png',
        'https://c.tile.openstreetmap.org/2/2/3.png',
        'https://a.tile.openstreetmap.org/2/3/0.png',
        'https://b.tile.openstreetmap.org/2/3/1.png',
        'https://c.tile.openstreetmap.org/2/3/2.png',
        'https://a.tile.openstreetmap.org/2/3/3.png'
      ]
   })
  ]
};

if (SITE_CONFIG.domain) {
  prod.plugins.push(new CnameWebpackPlugin({ domain: SITE_CONFIG.domain }));
}

module.exports = merge(shared, prod);
