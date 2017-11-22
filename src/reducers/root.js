import { combineReducers } from 'redux';
import active_tool from './active-tool';
import tool_list from './tool-list';

const root_reducer = combineReducers({
    active_tool,
    tool_list
});

export default root_reducer;