import { combineReducers } from 'redux';
import active_tool from './active-tool';
import tool_list from './tool-list';
import raster from './raster';
import geometry from './geometry';

const root_reducer = combineReducers({
    active_tool,
    tool_list,
    raster,
    geometry
});

export default root_reducer;