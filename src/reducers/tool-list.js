const tool_list = (state = [], action) => {
  switch (action.type) {
    case 'TOOL_LIST_LOAD':
      return action.tools;
    case 'TOOL_LIST_SEARCH':
      return action.tools;
    default:
      return state;
  }
}

export default tool_list;
