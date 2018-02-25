import geoblaze from 'geoblaze';
import GeoRasterLayer from 'georaster-layer-for-leaflet';
import chroma from 'chroma-js';

const RasterService = {

  create_raster(input) {
    return new Promise((resolve, reject) => {
      geoblaze.load(input)
        .then(georaster => {
          let options = {
            georaster: georaster,
            opacity: 0.7
          };
          let raster = new GeoRasterLayer(options);
          resolve(raster);
        }, error => {
          reject(error);
        });
    });
  }
}

export default RasterService;
