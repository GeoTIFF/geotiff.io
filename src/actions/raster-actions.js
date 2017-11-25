import RasterService from '../services/RasterService';

export const add_raster = input => {
    return dispatch => {
        return RasterService.create_raster(input).then(raster => {
            return dispatch({ type: 'MAP_RASTER_ADD', raster });
        });
    }
};
window.add_raster = add_raster; // made this global temporarily so it can work with main.js

export const remove_raster = () => (
    { type: 'MAP_RASTER_REMOVE' }
)