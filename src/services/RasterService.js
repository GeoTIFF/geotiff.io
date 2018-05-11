import geoblaze from 'geoblaze';
import GeoRasterLayer from 'georaster-layer-for-leaflet';

const RasterService = {

  create_raster(input) {
    return new Promise((resolve, reject) => {
      geoblaze.load(input)
        .then(georaster => {
          const options = {
            georaster,
            opacity: 0.7
          };
          const raster = new GeoRasterLayer(options);
          resolve(raster);
        }, error => {
          reject(error);
        });
    });
  },

  create_raster_from_georaster(georaster) {
    const options = {
      georaster,
      opacity: 0.7,
    }
    return new GeoRasterLayer(options);
  }
}

export default RasterService;
