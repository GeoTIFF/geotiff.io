const menu_focus = (state = false, action) => {
  switch (action.type) {
    case 'MENU_FOCUS_ON':
      return true;
    case 'MENU_FOCUS_OFF':
      return false;
    default:
      return state;
  }
}

export default menu_focus;
