let gio = require('@geotiff/gio');

let Map = require('../Map');

let chroma = require("chroma-js");

let GeoRasterLayer = require("georaster-layer-for-leaflet");
console.log("GeoRasterLayer:", GeoRasterLayer);

let Loader = require('../shared/Loader');
console.error("Loader:", Loader);

module.exports = (input) => {
    console.error("starting load_raster with input", input);
    return new Promise(resolve => {
        gio.load(input).then(georaster => {
            try {
                Map.georaster = georaster;
                let options = {
                    georaster: georaster,
                    opacity: 0.7
                };
                let layer = new GeoRasterLayer(options);
                Map.add_raster_layer(layer);
                resolve();
            } catch (error) {
                console.error("error:", error);
            }
        });
    });
};
