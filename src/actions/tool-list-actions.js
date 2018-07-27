import ToolListService from '../services/ToolListService';

export const loadTools = () => (
  { type: 'TOOL_LIST_LOAD', tools: ToolListService.getToolList() }
);

export const searchTools = value => {
  return dispatch => {
    return ToolListService.searchToolList(value)
      .then(tools => dispatch({ type: 'TOOL_LIST_SEARCH', tools }));
  }
}
