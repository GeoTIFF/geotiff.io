const searchParams = new URLSearchParams(window.location.search);
const TRUTHY_INPUTS = ["", "true", "True", "y", "Y", "yes", "Yes"]

export const autoStart = searchParams.get('auto_start');
export const hideMenu = TRUTHY_INPUTS.includes(searchParams.get("hide_menu"));
export const toolName = searchParams.get('tool');
export const url = searchParams.get('url');
