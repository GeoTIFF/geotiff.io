const active_tool = (state = null, action) => {
    console.error(action)
    switch (action.type) {
        case 'ACTIVE_TOOL_MOUNT':
            console.error('tool: ', action.tool)
            return action.tool;
        case 'ACTIVE_TOOL_UNMOUNT':
            return null;
        default:
            return null;
    }
}

export default active_tool;