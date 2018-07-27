import { combineReducers } from 'redux';
import activeTool from './active-tool';
import alert from './alert';
import drawing from './drawing';
import geometry from './geometry';
import layout from './layout';
import loading from './loading';
import menuFocus from './menu-focus';
import raster from './raster';
import results from './results';
import toolList from './tool-list';

const rootReducer = combineReducers({
  activeTool,
  alert,
  drawing,
  geometry,
  layout,
  loading,
  menuFocus,
  raster,
  results,
  toolList
});

export default rootReducer;
