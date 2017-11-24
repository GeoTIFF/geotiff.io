import Map from '../Map';

const geometry = (state = null, action) => {
    switch (action.type) {
        case 'MAP_GEOMETRY_ADD':
            if (state) { // first remove the existing layer is present
                Map.remove_layer(state);
            }
            if (action.format === 'polygon') {
                Map.add_polygon(action.geometry);
                return action.geometry;
            } else if (action.format === 'point') {
                Map.add_point(action.geometry);
                return action.geometry;
            } else if (action.format === 'geojson') {
                let layer = Map.create_geojson_layer(action.geometry);
                Map.add_polygon(layer);
                return layer;
            } else {
                throw 'Invalid format for geometry was specified, please use either "polygon" or "point".'
            }
        case 'MAP_GEOMETRY_REMOVE':
            Map.remove_layer(state);
            return null;
        default:
            return state;
    }
}

export default geometry;