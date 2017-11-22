export const mount_tool = tool => (
    { type: 'ACTIVE_TOOL_MOUNT', tool }
);

export const unmount_tool = () => (
    { type: 'ACTIVE_TOOL_UNMOUNT' }
);