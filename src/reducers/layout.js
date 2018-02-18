import { set_layout_default, set_layout_hide_tools } from '../actions/layout-actions';

const layout = (state = 'default', action) => {
  switch (action.type) {
    case 'LAYOUT_DEFAULT':
      return 'default';
    case 'LAYOUT_HIDE_MENU':
      return 'hide-menu';
    default:
      return state;
  }
}

export default layout;
