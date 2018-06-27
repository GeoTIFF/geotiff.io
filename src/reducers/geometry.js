import Map from '../Map';

const geometry = (state = null, action) => {
  switch (action.type) {
    case 'MAP_GEOMETRY_ADD':
      if (state) { // first remove the existing layer is present
        Map.removeLayer(state);
      }
      if (action.format === 'polygon') {
        Map.addPolygon(action.geometry);
        return action.geometry;
      } else if (action.format === 'point') {
        let point = Map.addPoint(action.geometry);
        return point;
      } else if (action.format === 'geojson') {
        let layer = Map.createGeojsonLayer(action.geometry);
        Map.addPolygon(layer);
        return layer;
      } else {
        throw new Error('Invalid format for geometry was specified, please use either "polygon" or "point".');
      }
    case 'MAP_GEOMETRY_REMOVE':
      if (state) Map.removeLayer(state);
      return null;
    default:
      return state;
  }
}

export default geometry;
