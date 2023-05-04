import { MAP_RASTER_ADD, MAP_RASTER_REMOVE } from 'constants/actions';
import Map from '../Map';

const raster = (state = null, action) => {
  switch (action.type) {
    case MAP_RASTER_ADD:
      Map.addRaster(action.raster);
      return action.raster.georasters[0];
    case MAP_RASTER_REMOVE:
      Map.removeRaster();
      return null;
    default:
      return state;
  }
}

export default raster;
