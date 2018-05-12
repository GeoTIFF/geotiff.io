import geoblaze from 'geoblaze';
import GeoRasterLayer from 'georaster-layer-for-leaflet';
import chroma from 'chroma-js';

const getResolution = () => {
  const width = document.documentElement.clientWidth;
  if (width < 900) {
    return Math.pow(2, 5);
  } else if (width < 1200) {
    return Math.pow(2, 6);
  } else {
    return Math.pow(2, 7);
  }
}

const RasterService = {

  create_raster(input) {
    return new Promise((resolve, reject) => {
      geoblaze.load(input)
        .then(georaster => {
          let options = {
            georaster: georaster,
            opacity: 0.7,
            resolution: getResolution(),
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
