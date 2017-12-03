import { start_loading, stop_loading } from '../actions/loading-actions';

const loading = (state = null, action) => {
    switch (action.type) {
        case 'LOADING_START':
            return action.message;
        case 'LOADING_STOP':
            return null;
        default:
            return state;
    }
}

export default loading;