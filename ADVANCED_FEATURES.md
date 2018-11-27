# Advanced Features
This document describes some advanced features.  Most users probably won't need these, but you may find them useful depending on your use case.

# Auto-Load Raster
You can auto-load a raster by setting `url` to the url of your raster in your url params.  For example, http://app.geotiff.io/sum?url=https://s3.amazonaws.com/geotiff.io/PuertoRicoTropicalFruit.tiff will start the app with the raster of Puerto Rico's tropical fruit loaded.

# Adjusting Resolution
:warning: increasing the resolution, can slow down performance

GeoTIFF.io decides how many pixels to sample across and down for each Leaflet grid cell based on [the getResolution function](https://github.com/GeoTIFF/geotiff.io/blob/master/src/services/RasterService.js#L5).
Currently, you can adjust this resolution by setting a URL param of resolution.  For example, loading https://app.geotiff.io?resolution=128 will load the site with twice the previously highest possible resolution.
