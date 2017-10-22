let chroma = require("chroma-js");

let L = window.L;

module.exports = L.GridLayer.extend({

    initialize: function(options) {
        try {
            console.log("starting GeoTIFFLayer.initialize with", options);

            if (!options.keepBuffer) options.keepBuffer = 25;

            if (!options.resolution) options.resolution = Math.pow(2, 5);

            if (options.updateWhenZooming === undefined) options.updateWhenZooming = false;

            let geotiff = options.geotiff;


            this.scale = chroma.scale();

            let image = geotiff.getImage();
            this._image = image;

            let no_data_value = parseInt(image.fileDirectory.GDAL_NODATA);
            this.no_data_value = no_data_value;

            console.log("starting readRaster");
            let rasters = image.readRasters();
            console.log("finished readRasters");
            this.rasters = rasters;

            let number_of_rasters = rasters.length;

            this.maxs = [];
            this.mins = [];
            this.ranges = [];

            let max; let min;
            console.log("starting to get min, max and ranges");
            for (let r = 0; r < number_of_rasters; r++) {

                let values = rasters[r];
                let number_of_values = values.length;

                for (let v = 1; v < number_of_values; v++) {
                    let value = values[v];
                    if (value != no_data_value) {
                        if (min === undefined || value < min) min = value;
                        else if (max === undefined || value > max) max = value;
                    }
                }
                this.maxs.push(max);
                this.mins.push(min);
                this.ranges.push(max - min);
            }
            console.log("maxs:", this.maxs);
            console.log("mins:", this.mins);
            console.log("ranges:", this.ranges);
            
            let fileDirectory = image.fileDirectory;

            // https://www.awaresystems.be/imaging/tiff/tifftags/modeltiepointtag.html
            let [i, j, k, x, y, z] = fileDirectory.ModelTiepoint;

            // https://www.awaresystems.be/imaging/tiff/tifftags/modelpixelscaletag.html
            let [ScaleX, ScaleY, ScaleZ] = fileDirectory.ModelPixelScale;

            // caching for use in createTile
            this._ScaleX = ScaleX;
            this._ScaleY = ScaleY;

            let xmin = x;
            this._xmin = xmin; //caching for later, used by createTile
            let ymax = y;
            this._ymax = ymax;

            let w = image.getWidth();
            this.tiff_width = w;

            let h = image.getHeight();
            this.tiff_height = h;

            let xmax = xmin + w * ScaleX;
            this._xmax = xmax;
            let ymin = ymax - h * ScaleY;
            this._ymin = ymin;

            let southWest = L.latLng(ymin, xmin);
            let northEast = L.latLng(ymax, xmax);

            let bounds = L.latLngBounds(southWest, northEast);

            this._bounds = bounds;
            options.bounds = bounds;

            L.setOptions(this, options);

        } catch (error) {
            console.error("ERROR initializing GeoTIFFLayer", error);
        }
    },

    createTile: function(coords) {

        let debug_level = 0;

        if (debug_level >= 1) {
            var start_time = performance.now();
            var duration_reading_rasters = 0;
            var time_started_reading_rasters;
            var time_started_filling_rect;
            var duration_filling_rects = 0;
        }

        //if (debug_level >= 1) console.group();

        //if (debug_level >= 1) console.log("starting createTile with coords:", coords);

        let no_data_value = this.no_data_value;
        let scale = this.scale;
        let mins = this.mins;
        let ranges = this.ranges;
        let rasters = this.rasters;


        // create a <canvas> element for drawing
        let tile = L.DomUtil.create('canvas', 'leaflet-tile');

        tile.style.border = "5px solid pink";

        // get a canvas context and draw something on it using coords.x, coords.y and coords.z
        let context = tile.getContext('2d');

        let tileSize = this.getTileSize();
        let tile_height = tile.height = tileSize.y;
        let tile_width = tile.width = tileSize.x;

        let bounds = this._tileCoordsToBounds(coords);
        //if (debug_level >= 1) console.log("bounds:", bounds);

        let xmin_of_tile = bounds.getWest();
        let xmax_of_tile = bounds.getEast();
        let ymin_of_tile = bounds.getSouth();
        let ymax_of_tile = bounds.getNorth();
        //if (debug_level >= 1) console.log("ymax_of_tile:", ymax_of_tile);

        let resolution = this.options.resolution;

        let number_of_rectangles_across = resolution;
        let number_of_rectangles_down = resolution;       

        let height_of_rectangle_in_pixels = tile_height / number_of_rectangles_down;
        //if (debug_level >= 1) console.log("height_of_rectangle_in_pixels:", height_of_rectangle_in_pixels);
        let width_of_rectangle_in_pixels = tile_width / number_of_rectangles_across;
        //if (debug_level >= 1) console.log("width_of_rectangle:", width_of_rectangle_in_pixels);

        let height_of_rectangle_in_degrees = ( ymax_of_tile - ymin_of_tile ) / number_of_rectangles_down;
        //if (debug_level >= 1) console.log("height_of_rectangle_in_degrees:", height_of_rectangle_in_degrees);
        let width_of_rectangle_in_degrees = ( xmax_of_tile - xmin_of_tile ) / number_of_rectangles_across;
        //if (debug_level >= 1) console.log("width_of_rectangle_in_degrees:", width_of_rectangle_in_degrees);

        let xmin = this._xmin;
        let xmax = this._xmax;
        let ymin = this._ymin;
        let ymax = this._ymax;
        //if (debug_level >= 1) console.log("ymax of raster:", ymax);

        let ScaleX = this._ScaleX;
        let ScaleY = this._ScaleY;

        let tiff_height = this.tiff_height;
        let tiff_width = this.tiff_width;

        let number_of_pixels_per_rectangle = tile_width / 8;

        for (let h = 0; h < number_of_rectangles_down; h++) {
            let lat = ymax_of_tile - (h + 0.5) * height_of_rectangle_in_degrees;
            //if (debug_level >= 2) console.log("lat:", lat);
            for (let w = 0; w < number_of_rectangles_across; w++) {
                let lng = xmin_of_tile + (w + 0.5) * width_of_rectangle_in_degrees;
                //if (debug_level >= 2) console.log("lng:", lng);
                if (lat > ymin && lat < ymax && lng > xmin && lng < xmax) {
                    //if (debug_level >= 2) L.circleMarker([lat, lng], {color: "#00FF00"}).bindTooltip(h+","+w).addTo(this._map).openTooltip();
                    let x_in_raster_pixels = Math.floor( (lng - xmin) / ScaleX );
                    let y_in_raster_pixels = Math.floor( (ymax - lat) / ScaleY );
                    let rasterWindow = [ x_in_raster_pixels, y_in_raster_pixels, x_in_raster_pixels + 1, y_in_raster_pixels + 1 ];
                   
                    if (debug_level >= 1) time_started_reading_rasters = performance.now(); 
                    //let values = this._image.readRasters({ window: rasterWindow });
                    let values = this.rasters.map(raster => raster[ y_in_raster_pixels * tiff_width + x_in_raster_pixels]);
                    if (debug_level >= 1) duration_reading_rasters += performance.now() - time_started_reading_rasters;
                    let number_of_values = values.length;
                    let color = null;
                    if (number_of_values == 1) {
                        let value = values[0];
                        if (value != no_data_value) {
                            color = scale( (values[0] - mins[0]) / ranges[0] ).hex();
                        }
                    } else if (number_of_values == 2) {
                    } else if (number_of_values == 3) {
                        if (values[0] != no_data_value) {
                            color = "rgb(" + values[0] + "," + values[1] + "," + values[2] + ")";
                        }
                    }
                    //let colors = ["red", "green", "blue", "pink", "purple", "orange"];
                    //let color = colors[Math.round(colors.length * Math.random())];
                    //context.fillStyle = this.getColor(color);
                    if (color) {
                        context.fillStyle = color;
                        if (debug_level >= 1) time_started_filling_rect = performance.now();
                        context.fillRect(w * width_of_rectangle_in_pixels, h * height_of_rectangle_in_pixels, width_of_rectangle_in_pixels, height_of_rectangle_in_pixels);
                        if (debug_level >= 1) duration_filling_rects += performance.now() - time_started_filling_rect;
                    }
                    //if (debug_level >= 2) console.log("filling:", [w * width_of_rectangle_in_pixels, h * height_of_rectangle_in_pixels, width_of_rectangle_in_pixels, height_of_rectangle_in_pixels]);
                    //if (debug_level >= 2) console.log("with color:", color);
                    //if (debug_level >= 2) console.log("with context:", context);
                } else {
                    //if (debug_level >= 2) L.circleMarker([lat, lng], {color: "#FF0000"}).bindTooltip(h+","+w).addTo(this._map).openTooltip();
                }
            }
        }


        if (debug_level >= 1) {
            let duration = performance.now() - start_time;
            console.log("creating tile took ", duration, "milliseconds");
            console.log("took", duration_reading_rasters, "milliseconds to read rasters, which is ", Math.round(duration_reading_rasters / duration * 100), "percentage of the total time");
            console.log("took", duration_filling_rects, "milliseconds to fill rects, which is ", Math.round(duration_filling_rects / duration * 100), "percentage of the total time");
        }
        //if (debug_level >= 1) console.groupEnd();
        // return the tile so it can be rendered on screen
        return tile;
    },

    // method from https://github.com/Leaflet/Leaflet/blob/bb1d94ac7f2716852213dd11563d89855f8d6bb1/src/layer/ImageOverlay.js
    getBounds: function () {
        return this._bounds;
    },

    getColor(name) {
        let d = document.createElement("div");
        d.style.color = name;
        document.body.appendChild(d)
        return window.getComputedStyle(d).color
    }

});
