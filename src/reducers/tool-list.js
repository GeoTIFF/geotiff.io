import { TOOL_LIST_LOAD, TOOL_LIST_SEARCH } from 'constants/actions';

const toolList = (state = [], action) => {
  switch (action.type) {
    case TOOL_LIST_LOAD:
      return action.tools;
    case TOOL_LIST_SEARCH:
      return action.tools;
    default:
      return state;
  }
}

export default toolList;
