import { TOOL_LIST_LOAD, TOOL_LIST_SEARCH } from 'constants/actions';
import ToolListService from '../services/ToolListService';

export const loadTools = () => ({
  tools: ToolListService.getToolList(),
  type: TOOL_LIST_LOAD
});

export const searchTools = value => ({
  tools: ToolListService.searchToolList(value),
  type: TOOL_LIST_SEARCH
});
