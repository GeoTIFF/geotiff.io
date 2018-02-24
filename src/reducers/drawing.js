import Map from '../Map';

const drawing = (state = false, action) => {
  switch (action.type) {
    case 'MAP_DRAW_START':
      if (action.format === 'rectangle') {
        Map.start_draw_rectangle();
      } else if (action.format === 'polygon') {
        Map.start_draw_polygon();
      } else if (action.format === 'point') {
        Map.start_draw_point();
      } else {
        throw 'Invalid format specified. Please use "rectangle", "polygon", or "point"';
      }
      return action.format;
    case 'MAP_DRAW_STOP':
      Map.stop_draw_rectangle();
      Map.stop_draw_polygon();
      Map.stop_draw_point();
      return false;
    default:
      return state;
  }
}

export default drawing;
