const active_tool = (state = null, action) => {
  switch (action.type) {
    case 'ACTIVE_TOOL_MOUNT':
      return action.tool;
    case 'ACTIVE_TOOL_UNMOUNT':
      return null;
    default:
      return state;
  }
}

export default active_tool;
