import geoblaze from 'geoblaze';
import GeoRasterLayer from 'georaster-layer-for-leaflet';

const OPACITY = 0.7;
const LOW_RESOLUTION = 32;
const MEDIUM_RESOLUTION = 48;
const HIGH_RESOLUTION = 64;

const getResolution = () => {
  const width = document.documentElement.clientWidth;
  const userAgent = window.navigator.userAgent;
  const isAndroid = userAgent.includes("Android");
  const isChromebook = userAgent.includes("CrOS");
  if (width < 900 || isAndroid || isChromebook) {
    return SMALL_RESOLUTION;
  } else if (width < 1200) {
    return MEDIUM_RESOLUTION;
  } else {
    return HIGH_RESOLUTION;
  }
}

export const loadRaster = async input => {
  const georaster = await geoblaze.load(input);
  const options = {
    georaster,
    opacity: OPACITY,
    resolution: getResolution(),
  };
  return new GeoRasterLayer(options);
}

export const buildRaster = georaster => {
  const options = { georaster, resolution: OPACITY };
  return new GeoRasterLayer(options);
};
