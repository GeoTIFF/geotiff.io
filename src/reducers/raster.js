import Map from '../Map';

const raster = (state = null, action) => {
    switch (action.type) {
        case 'MAP_RASTER_ADD':
            Map.add_raster(action.raster);
            return action.raster.georaster;
        case 'MAP_RASTER_REMOVE':
            Map.remove_raster();
            return null;
        default:
            return state;
    }
}

export default raster;