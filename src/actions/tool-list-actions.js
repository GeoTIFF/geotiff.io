import ToolListService from '../services/ToolListService';

export const load_tools = () => {
    return dispatch => {
        return ToolListService.get_tool_list()
            .then(tools => dispatch({ type: 'TOOL_LIST_LOAD', tools }));
    }
}

export const search_tools = value => {
    return dispatch => {
        return ToolListService.search_tool_list(value)
            .then(tools => dispatch({ type: 'TOOL_LIST_SEARCH', tools }));
    }
}