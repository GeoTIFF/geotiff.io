const tool_list = (state = [], action) => {
    switch (action.type) {
        case 'TOOL_LIST_LOAD':
            return action.tools;
        case 'TOOL_LIST_SEARCH':
            console.error('search in reducer: ', action.tools);
            return action.tools;
        default:
            return [];
    }
}

export default tool_list;