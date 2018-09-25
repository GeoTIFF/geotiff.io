import { buildRaster, loadRaster } from 'services/raster';
import { MAP_RASTER_ADD, MAP_RASTER_REMOVE } from 'constants/actions';
import { startLoading, stopLoading } from './loading-actions';
import { showAlert } from './alert-actions';

export const addRaster = input => {
  return async dispatch => {
    dispatch(startLoading('Loading Raster'));
    try {
      const raster = await loadRaster(input);
      dispatch(stopLoading());
      dispatch({ type: MAP_RASTER_ADD, raster });
    } catch (e) {
      dispatch(stopLoading());
      dispatch(showAlert('Geotiff.io was unable to load the tiff. Please make sure your url or file is accurate and try again.'));
    }
  }
};

window.addRaster = addRaster; // made this global temporarily so it can work with main.js

export const addRasterFromGeoraster = georaster => {
  return dispatch => {
    const raster = buildRaster(georaster);
    return dispatch({ type: MAP_RASTER_ADD, raster });
  }
}

export const removeRaster = () => ({
  type: MAP_RASTER_REMOVE
});
