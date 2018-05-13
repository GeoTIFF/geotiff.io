import RasterService from '../services/RasterService';
import { start_loading, stop_loading } from './loading-actions';
import { show_alert } from './alert-actions';

export const add_raster = input => {
  return dispatch => {
    dispatch(start_loading('Loading Raster'));
    return RasterService.create_raster(input).then(raster => {
      dispatch(stop_loading());
      dispatch({ type: 'MAP_RASTER_ADD', raster });
    }, error => {
      dispatch(stop_loading());
      dispatch(show_alert('Geotiff.io was unable to load the tiff. Please make sure your url or file is accurate and try again.'));
    });
  }
};
window.add_raster = add_raster; // made this global temporarily so it can work with main.js

export const add_raster_from_georaster = georaster => {
  return dispatch => {
    const raster = RasterService.create_raster_from_georaster(georaster)
    return dispatch({ type: 'MAP_RASTER_ADD', raster });
  }
}

export const remove_raster = () => (
  { type: 'MAP_RASTER_REMOVE' }
);
