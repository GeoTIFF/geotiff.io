import { combineReducers } from 'redux';
import active_tool from './active-tool';
import alert from './alert';
import drawing from './drawing';
import geometry from './geometry';
import layout from './layout';
import loading from './loading';
import menu_focus from './menu-focus';
import raster from './raster';
import results from './results';
import tool_list from './tool-list';

const root_reducer = combineReducers({
  active_tool,
  alert,
  drawing,
  geometry,
  layout,
  loading,
  menu_focus,
  raster,
  results,
  tool_list
});

export default root_reducer;
