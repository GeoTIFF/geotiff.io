import Map from '../Map';

const drawing = (state = false, action) => {
    switch (action.type) {
        case 'MAP_DRAW_START':
            if (action.format === 'rectangle') {
                Map.start_draw_rectangle();
            } else if (action.format === 'polygon') {
                Map.start_draw_polygon();
            } else {
                throw 'Invalid format specified. Please use either "rectangle" or "polygon"';
            }
            return action.format;
        case 'MAP_DRAW_STOP':
            Map.stop_draw_rectangle();
            Map.stop_draw_polygon();
            return false;
        default:
            return state;
    }
}

export default drawing;