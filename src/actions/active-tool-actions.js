import { clear_results } from './results-actions';

export const mount_tool = tool => (
    { type: 'ACTIVE_TOOL_MOUNT', tool }
);

export const unmount_tool = () => {
    return dispatch => {
        dispatch(clear_results());
        return dispatch({ type: 'ACTIVE_TOOL_UNMOUNT' });
    }
};
