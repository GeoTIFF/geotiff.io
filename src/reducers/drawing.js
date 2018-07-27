import Map from '../Map';

const drawing = (state = false, action) => {
  switch (action.type) {
    case 'MAP_DRAW_START':
      if (action.format === 'rectangle') {
        Map.startDrawRectangle();
      } else if (action.format === 'polygon') {
        Map.startDrawPolygon();
      } else if (action.format === 'point') {
        Map.startDrawPoint();
      } else {
        throw new Error('Invalid format specified. Please use "rectangle", "polygon", or "point"');
      }
      return action.format;
    case 'MAP_DRAW_STOP':
      Map.stopDrawRectangle();
      Map.stopDrawPolygon();
      Map.stopDrawPoint();
      return false;
    default:
      return state;
  }
}

export default drawing;
