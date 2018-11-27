/* global URLSearchParams */
import geoblaze from 'geoblaze';
import GeoRasterLayer from 'georaster-layer-for-leaflet';

const getResolution = () => {
  const resolution = Number(new URLSearchParams(window.location.search).get('resolution'))
  if (resolution) {
    return resolution
  }

  const width = document.documentElement.clientWidth;
  const userAgent = window.navigator.userAgent;
  const isAndroid = userAgent.includes("Android");
  const isChromebook = userAgent.includes("CrOS");
  if (width < 900 || isAndroid || isChromebook) {
    return 32;
  } else if (width < 1200) {
    return 48;
  } else {
    return 64;
  }
}

const RasterService = {

  createRaster(input) {
    return new Promise((resolve, reject) => {
      geoblaze.load(input)
        .then(georaster => {
          let options = {
            georaster: georaster,
            opacity: 0.7,
            resolution: getResolution()
          };
          const raster = new GeoRasterLayer(options);
          resolve(raster);
        }, error => {
          reject(error);
        });
    });
  },

  createRasterFromGeoraster(georaster) {
    const options = {
      georaster,
      opacity: 0.7,
      resolution: getResolution()
    }
    return new GeoRasterLayer(options);
  }
}

export default RasterService;
