import RasterService from '../services/RasterService';
import { start_loading, stop_loading } from './loading-actions';

export const add_raster = input => {
    return dispatch => {
        dispatch(start_loading('Loading Raster'));
        return RasterService.create_raster(input).then(raster => {
            dispatch(stop_loading());
            return dispatch({ type: 'MAP_RASTER_ADD', raster });
        });
    }
};
window.add_raster = add_raster; // made this global temporarily so it can work with main.js

export const remove_raster = () => (
    { type: 'MAP_RASTER_REMOVE' }
)