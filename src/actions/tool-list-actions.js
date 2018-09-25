import { TOOL_LIST_LOAD, TOOL_LIST_SEARCH } from 'constants/actions';
import { getTools, tools } from 'services/tools';

export const loadTools = () => ({
  tools,
  type: TOOL_LIST_LOAD
});

export const searchTools = value => ({
  tools: getTools(value),
  type: TOOL_LIST_SEARCH
});
