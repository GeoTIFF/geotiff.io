import RasterService from '../services/RasterService';
import { startLoading, stopLoading } from './loading-actions';
import { showAlert } from './alert-actions';

export const addRaster = input => {
  return dispatch => {
    dispatch(startLoading('Loading Raster'));
    return RasterService.createRaster(input).then(raster => {
      dispatch(stopLoading());
      dispatch({ type: 'MAP_RASTER_ADD', raster });
    }, error => {
      dispatch(stopLoading());
      dispatch(showAlert('Geotiff.io was unable to load the tiff. Please make sure your url or file is accurate and try again.'));
    });
  }
};
window.addRaster = addRaster; // made this global temporarily so it can work with main.js

export const addRasterFromGeoraster = georaster => {
  return dispatch => {
    const raster = RasterService.createRasterFromGeoraster(georaster)
    return dispatch({ type: 'MAP_RASTER_ADD', raster });
  }
}

export const removeRaster = () => (
  { type: 'MAP_RASTER_REMOVE' }
);
