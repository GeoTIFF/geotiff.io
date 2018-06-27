import ToolListService from '../services/ToolListService';

export const loadTools = () => {
  return dispatch => {
    return ToolListService.getToolList()
      .then(tools => dispatch({ type: 'TOOL_LIST_LOAD', tools }));
  }
}

export const searchTools = value => {
  return dispatch => {
    return ToolListService.searchToolList(value)
      .then(tools => dispatch({ type: 'TOOL_LIST_SEARCH', tools }));
  }
}
